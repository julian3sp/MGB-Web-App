import google.generativeai as genai
import os
from dotenv import load_dotenv 
import requests
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

# If you wondering why doesnt it work try this
#pip install google-generativeai
#pip install python-dotenv
#pip install requests
#pip install flask
#pip install flask-cors

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")
chat_session = model.start_chat()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

@app.route('/api/chat', methods=['POST'])
def chat_api():
    data = request.json  
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Process the prompt with the AI model
    ai_response = chat(prompt)
    return jsonify({"response": ai_response})


def fetch_data_from_api(url: str):
    response = requests.get(url)
    if response.status_code == 200:
        #print(f"Data fetched successfully from {url}")
        return response.json()
    else:
        print(f"Error fetching data: {response.status_code}")
        return None

def chat(prompt: str):
    #print("Prompt:", prompt)
    response = chat_session.send_message(prompt)
    #print("Response:", response.text)
    return response.text

def get_backend_context():
    directories = fetch_data_from_api("http://localhost:3000/trpc/getDirectories")
    print("Directories:", directories)
    requests = fetch_data_from_api("http://localhost:3000/trpc/requestList")
    print("Requests:", requests)
    employees = fetch_data_from_api("http://localhost:3000/trpc/getEmployees")
    print("Employees:", employees)
    #not directories or not requests or not employees
    if not directories:
        print("Error fetching data from API.")
        return
    

    context = (
        f"This is the hospital website in which you will be operating and basing all your data from.Always refer to the data from the website and advice that you are not a doctor and you should get help from a professional. "
        f"Here are the directories from each location: {directories}. "
        f"Here are all the current services requests(there are 8 types of requests Language, Sanitation, Security, Transportation, Audio/Visual, Medical and Facilities) with their respective types: {requests}."
        f"Here are all the employees in the hospital: {employees}. "
        f"Please answer the following questions based on this information. "
    )
    chat_session.send_message(context)
    return context

global new_data
new_data = False
def fetch_new_data(old_data):
    global new_data  
    old_context = old_data
    new_context = (
        fetch_data_from_api("http://localhost:3000/trpc/getDirectories"),
        fetch_data_from_api("http://localhost:3000/trpc/requestList"),
        fetch_data_from_api("http://localhost:3000/trpc/getEmployees"),
    )

    if old_context != new_context:
        print("New data fetched from API.")
        new_data = True  
        update = (
            f"The backend data has changed and here is the new data: {new_context}. "
            f"Please answer based also in the new data as well as what you had previously."
        )
        chat_session.send_message(update)
        return new_context
    else:
        print("No new data fetched from API.")
        new_data = False  
        return old_context


if __name__ == "__main__":
    data = get_backend_context()
    get_backend_context()
    app.run(port=3001,debug=True)
    while True:
        data = fetch_new_data(data)
        if user_input.lower() in ["adios"]:
            print("Exiting the chat. Goodbye!")
            break
        response = chat(user_input)
        print(f"AI: {response}")
