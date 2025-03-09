from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import chatbot_response  # Import the chatbot_response function

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message')
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    response = chatbot_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)