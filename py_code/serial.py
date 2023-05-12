import serial

ser = serial.Serial('dir-path', 9600)


while True:
    line = ser.readline()
    line = line.decode('utf-8').rsplit()

    print(line)

