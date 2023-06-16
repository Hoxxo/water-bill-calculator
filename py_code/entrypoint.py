# import serial
import pandas as pd
from datetime import datetime
from flask import request, Flask

path = R'./py-data.xlsx'

# ser = serial.Serial('/dev/cu.usbmodem1401', 9600)

app = Flask(__name__)


class DataFrameInitializer:
    def __init__(self, path: str):
        self.path = path
        self.df = self.initialize_dataframe()
        self.now = datetime.now()

    def initialize_dataframe(self):
        df = pd.read_excel(self.path, sheet_name='Sheet1')
        df.dropna(how='all', inplace=True)
        df.set_index(df.columns[0], inplace=True)
        df.index = df.index.astype(str)
        df.index.name = None
        df.columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return df

    @property
    def hour(self):
        return str(self.now.hour) + ':00:00' if self.now.hour > 9 else '0' + str(self.now.hour) + ':00:00'

    @property
    def day(self):
        return self.now.strftime('%A')[:3]

    def update_totals(self):
        for day in self.df.columns:
            self.df.at['Total', day] = self.df[day][:-1].sum()

        return self

    def print_dataframe(self):
        print(self.df)

        return self

    def print_at(self, day=None, hour=None):
        if day is None:
            self_day = self.day
            day = self_day
        if hour is None:
            hour = self.hour

        print(hour)  # For debugging
        print(day)  # For debugging
        print(self.df.at[hour, day])

        return self

    def calc_total_at(self, day=None):
        if day is None:
            day = self.day

        print(day)  # For debugging
        self.df.at['Total', day] = 0  # Clear first so that the total is not added to itself.
        self.df.at['Total', day] = self.df[day][:-1].sum()

        return self

    def change_at(self, value, day=None, hour=None):
        if day is None:
            day = self.day
        if hour is None:
            hour = self.hour

        # print(hour)  # For debugging
        # print(day)  # For debugging
        self.df.at[hour, day] = value

        return self

    def update_time(self):
        print(self.now)  # For debugging
        self.now = datetime.now()

        return self

    def push_to_excel(self):
        self.df.to_excel(self.path, sheet_name='Sheet1')

        return self

    # def data_at(self, day=None, hour=None):
    #     if day is None:
    #         day = self.day
    #     if hour is None:
    #         hour = self.hour
    #
    #     return self.df.at[hour, day]


df = DataFrameInitializer(path)


def convert_litre_to_millilitre(value: float) -> float:
    return value * 1000


prev_val = 0

current_time = df.hour
counter = 0


@app.route('/data', methods=['POST'])
def process_data():
    global prev_val
    global current_time
    data = request.form['message']

    if current_time != df.hour:
        print('Time has changed')
        print('current_time: ' + current_time)
        print('df hour: ' + df.hour)

        current_time = df.hour
        data = 0

    print(data)
    if data != prev_val:
        prev_val = data
        print("New entry:", data, "Litres, ", "at", df.hour, "on", df.day)
        print(convert_litre_to_millilitre(float(data)), "milliLitres")
        df.update_time() \
            .change_at(convert_litre_to_millilitre(float(data))) \
            .calc_total_at() \
            .push_to_excel()

    return 'Success', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


#
# while True:
#     if current_time != df.hour:
#         print('Time has changed')
#         print('current_time: ' + current_time)
#         print('df hour: ' + df.hour)
#
#         current_time = df.hour
#         data = 0
#
#     data = ser.readline().decode('utf-8').strip()
#
#     print(data)
#     if data != prev_val:
#         prev_val = data
#         print("New entry:", data, "Litres, ", "at", df.hour, "on", df.day)
#         print(convert_litre_to_millilitre(float(data)), "milliLitres")
#         df.update_time() \
#             .change_at(convert_litre_to_millilitre(float(data))) \
#             .calc_total_at() \
#             .push_to_excel()
