from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend JS to access backend

DB_FILE = 'tasks.json'

def load_tasks():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_tasks(tasks):
    with open(DB_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(load_tasks())

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    tasks = load_tasks()
    #check data security, valid
    tasks.append(data)  
    save_tasks(tasks)
    return jsonify({"status": "ok"})

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    tasks = load_tasks()
    if 0 <= index < len(tasks):
        tasks.pop(index)
        save_tasks(tasks)
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True)
