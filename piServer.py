from flask import Flask
from feeder import *

app = Flask(__name__);

@app.route("/")
def feed():
    run = motorRun()
    return {"How's it": run};
    
if __name__ == "__main__":
    app.run()