# import serial
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], "float32")
y = np.array([[0], [1], [1], [0]], "float32")

model = keras.models.Sequential()
model.add(keras.layers.Dense(8, input_dim=2, activation='relu'))  # Hidden layer with 8 units.
model.add(keras.layers.Dense(1, activation='sigmoid'))  # Output layer.

model.compile(loss='mean_squared_error', optimizer='adam', metrics=['binary_accuracy'])

model.fit(X, y, epochs=5000, verbose=0)

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict(np.array(data['input']))
    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(port=5000)