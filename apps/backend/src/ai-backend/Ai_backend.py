import google.generativeai as genai
import os
from dotenv import load_dotenv 
import requests
import json


load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")
chat_session = model.start_chat()


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
        f"This is the hospital website in which you will be operating and basing all your data from. "
        f"Here are the directories from each location: {directories}. "
        f"Here are all the current services requests with their respective types: {requests}."
        f"Here are all the employees in the hospital: {employees}. "
        f"Please answer the following questions based on this information. "
    )
    chat_session.send_message(context)
    return context

def fetch_new_data(old_data):
    old_context = old_data
    new_context = fetch_data_from_api("http://localhost:3000/trpc/getDirectories"), fetch_data_from_api("http://localhost:3000/trpc/requestList"), fetch_data_from_api("http://localhost:3000/trpc/getEmployees")
    if old_context != new_context:
        #print("New data fetched from API.")
        update = (f"the backend data has changed and here is the new data: {new_context}. "
                    f"Please answer based also in the new data aswell as what you had previously. ")
        chat_session.send_message(update)
        


if __name__ == "__main__":
    data = get_backend_context()
    get_backend_context()
    while True:
        fetch_new_data(data)
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit", "q", "bye"]:
            print("Exiting the chat. Goodbye!")
            break
        response = chat(user_input)
        print(f"AI: {response}")
