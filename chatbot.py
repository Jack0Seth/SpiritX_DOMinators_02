import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai

# Load environment variables from a .env file
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Use the local serviceAccountKey.json file (ensure this file exists and is secured)
service_account_path = "./serviceAccountKey.json"  # Update this path if needed
cred = credentials.Certificate(service_account_path)

# Initialize Firebase Admin if not already initialized
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Create Firestore client
db = firestore.client()

# Configure Gemini AI with the API key
genai.configure(api_key=API_KEY)

def get_gemini_response(prompt):
    """
    Generates a response from Gemini AI using the provided prompt.
    """
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(prompt)
    return response.text

def fetch_firebase_data(collection_name):
    docs = db.collection(collection_name).stream()
    data = {doc.id: doc.to_dict() for doc in docs}
    return data

def fetch_player_data():
    try:
        docs = db.collection("players").stream()
        player_data = {doc.id: doc.to_dict() for doc in docs}
        return player_data
    except Exception as e:
        print(f"Error fetching player data: {e}")
        return {}

def chatbot_response(user_input):
    knowledge_base = fetch_firebase_data("chatbot_responses")
    player_data = fetch_player_data()  # Fetch all player data

    # Check for predefined responses
    for key, value in knowledge_base.items():
        if key.lower() in user_input.lower():
            return value.get("response", "")

    # Check for player-related queries
    if "player" in user_input.lower() or "players" in user_input.lower() or "other players" in user_input.lower():
        if "other players" in user_input.lower():
            # User wants to know about all players
            if player_data:
                gemini_prompt = (
                    "You are an AI assistant analyzing player data.\n"
                    "Here is the data for all players:\n"
                    f"{list(player_data.values())}\n"  # Convert to list for easier string representation
                    f"User Question: {user_input}\n"
                    "Please analyze the data and provide an answer to the user's question."
                )
                return get_gemini_response(gemini_prompt)
            else:
                return "I couldn't retrieve any player data."
        else:
            # Player search with specific terms
            found_players = []
            for player_id, player_info in player_data.items():
                if any(term.lower() in str(player_info).lower() for term in user_input.lower().split()):
                    found_players.append(player_info)

            if found_players:
                gemini_prompt = (
                    "You are an AI assistant analyzing player data.\n"
                    "Here is the data for the requested players:\n"
                    f"{found_players}\n"
                    f"User Question: {user_input}\n"
                    "Please analyze the data and provide an answer to the user's question."
                )
                return get_gemini_response(gemini_prompt)
            else:
                return "I couldn't find any players matching your query."

    # Generate a custom response with Gemini AI if no match is found
    custom_prompt = (
        "You are a custom AI chatbot developed by the DOMinators team. "
        "Always introduce yourself as DOMinators' AI if asked.\n"
        f"User: {user_input}\n"
        "AI:"
    )
    return get_gemini_response(custom_prompt)