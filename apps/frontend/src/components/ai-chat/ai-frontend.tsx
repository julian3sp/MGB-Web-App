import React, { useState } from "react";

//Go to AI backend and also open a new terminal and cd to src/ai_backend and see tutorial on how to run

export function AiFrontend() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); 
    const [prompt, setPrompt] = useState<string>(""); // User's input

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) return; 

        
        setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

        try {
            console.log("Sending prompt to backend:", prompt); // Debug print
            const res = await fetch("http://127.0.0.1:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            console.log("Response status:", res.status); // Debug print
            const data = await res.json();
            console.log("Response from backend:", data); // Debug print

            if (data.error) {
                console.error("Error:", data.error);
                setMessages((prev) => [
                    ...prev,
                    { sender: "ai", text: "Sorry, something went wrong." },
                ]);
            } else {
                
                setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Sorry, I couldn't process your request." },
            ]);
        }

        setPrompt("");
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="w-full max-w-xl bg-white shadow-md rounded-xl flex flex-col p-4 h-[90vh]">
                <h1 className="text-2xl font-bold mb-4" style={{ color: "#003a96" }}>
                    Ai Assistant
                </h1>

                {/* Chat messages */}
                <div
                    id="chat-box"
                    className="flex-1 overflow-y-auto p-4 space-y-3 border rounded-md bg-gray-50"
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md max-w-[80%] ${
                                message.sender === "user"
                                    ? "ml-auto text-right bg-blue-200"
                                    : "mr-auto text-left bg-gray-200"
                            }`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Type your message..."
                        className="flex-1 border p-2 rounded-md"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        id="send-button"
                        className="text-white px-4 py-2 rounded-md hover:opacity-90"
                        style={{ backgroundColor: "#003a96" }}
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}