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

if __name__ == "__main__":
    app.run(debug=True)