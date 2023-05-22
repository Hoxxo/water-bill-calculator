# import serial
import openpyxl
import pandas as pd
from datetime import datetime
import re

path = R'/Users/hiroshi/PyCharmProjects/sandbox/py-data.xlsx'

# ser = serial.Serial('path-to-serial', 9600)
df = pd.read_excel(path, sheet_name='Sheet1')
df = df.dropna(how='all')
df = df.set_index(df.columns[0])
df.index = df.index.astype(str)
df.index.name = None
df.columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
df = df.iloc[0:, :]
now = datetime.now()
hour = str(now.hour) + ':00:00'
day = now.strftime('%A')[:3]

# Time column index
df.at['Total', 'Tue'] = df['Tue'][:-1].sum()
print(df.at['Total', 'Tue'])
print(df.at['Total', 'Mon'])
