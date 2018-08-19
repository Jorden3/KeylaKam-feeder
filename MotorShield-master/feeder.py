import PiMotor
import time

m = PiMotor.Motor("MOTOR1",1)
m.forward(50)
time.sleep(5)
m.stop()