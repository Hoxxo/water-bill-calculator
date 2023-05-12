# import serial
from flask import Flask, request, jsonify
from flask import Flask, jsonify
from oauth2client.service_account import ServiceAccountCredentials
import gspread
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from tensorflow import keras
import os
from dotenv import load_dotenv

load_dotenv()

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name(R'C:\Users\Chain\PycharmProjects\sandbox\website-model'
                                                         R'-visualization-bd2e4a4f9c4c.json', scope)
client = gspread.authorize(creds)

sheet = client.open('実験A結果').sheet1
data = sheet.get_all_values()

# Convert the data to a pandas DataFrame
df = pd.DataFrame(data)
df.columns = df.iloc[0]
df = df.iloc[1:]

# Convert the 'f [kHz]' and 'G(f) [dB]' columns to floats
df['f [kHz]'] = df['f [kHz]'].astype(float)
df['G(f) [dB]'] = df['G(f) [dB]'].astype(float)

# Calculate the regression line
x = df['f [kHz]'].values.reshape(-1, 1)
y = df['G(f) [dB]'].values
model = LinearRegression()
model.fit(x, y)
regression_line = model.predict(x)

app = Flask(__name__)


@app.route('/data', methods=['GET'])
def get_data():
    # Return the scatter plot data and the regression line data
    return jsonify({'scatter_plot': df[['f [kHz]', 'G(f) [dB]']].values.tolist(), 'regression_line': regression_line.tolist()})


if __name__ == '__main__':
    app.run(port=5000)
