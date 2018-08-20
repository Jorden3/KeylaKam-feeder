import PiMotor
import time

def motorRun():
    m = PiMotor.Motor("MOTOR1",1)
    m.forward(50)
    time.sleep(5)
    m.stop()
    return 1;

