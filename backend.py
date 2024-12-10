from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__, static_url_path='/static')
CORS(app)

client = MongoClient('mongodb://localhost:27017')

db = client['myWardrobeDB']
collection = db['users']

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/signUpPage')
def signUpPage():
    return render_template('register.html')

@app.route('/loginPage')
def loginPage():
    return render_template('login.html')

@app.route('/forgotPass')
def forgotPass():
    return render_template('forgot.html')

@app.route('/register', methods=['POST'])
def regsiter_user():
    data = request.json
    name = data.get('name')
    user = data.get('user')
    email = data.get('email')
    password = data.get('password')

    if not (name and user and email and password):
        return jsonify({'error': 'All fields are mandatory!!'}), 400

    if collection.find_one({'user': user}):
        return jsonify({'error': 'Username already exists!!'})

    if collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists!!'})

    user_data = {
        'name': name,
        'user': user,
        'email': email,
        'password': password
    }
    inserted_user = collection.insert_one(user_data)

    return jsonify({'user': user}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = data.get('user')
    password = data.get('password')

    if not(user and password):
        return jsonify({'error': 'Both Username and Password required!!'}), 400

    user_data = collection.find_one({'user': user, 'password': password})

    if user_data:
        return jsonify({'user': user}), 200
    else:
        return jsonify({'error': 'Invalid Username and Password!!'}), 400

@app.route('/updatePass', methods=['POST'])
def updatePass():
    data = request.json
    email = data.get('email')
    new_password = data.get('new_password')

    if not(email and new_password):
        return jsonify({'error': 'Email and new password are required!!'}), 400

    user_data = collection.find_one({'email': email})

    if user_data:
        collection.update_one({'email': email}, {'$set': {'password': new_password}})
        return jsonify({'message': 'Password updated successfully for email: {}!!'.format(email)}), 200
    else:
        return jsonify({'error': 'User with email {} not found!!'.format(email)})


if __name__ == '__main__':
    app.run(debug=True)