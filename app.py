from flask import Flask, request, render_template


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')


@app.route('/velocity_simulation', methods=['GET'])
def velocity_simulation():
    return render_template('velocity_simulation.html')

@app.route('/gravity_simulation', methods=['GET'])
def gravity_simulation():
    return render_template('gravity_simulation.html')


@app.route('/twin_paradox', methods=['GET'])
def twin_paradox():
    return render_template('twin_paradox.html')

if __name__ == "__main__":
    app.run(debug=True)