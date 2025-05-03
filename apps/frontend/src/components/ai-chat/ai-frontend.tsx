import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { trpc } from "@/lib/trpc.ts";

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
if (!api_key) {
    console.error("Missing API key. Please check your .env.local file");
}
//dont use ai backend

const genAI = new GoogleGenerativeAI(api_key, { apiVersion: 'v1' });

export function AiFrontend() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [prompt, setPrompt] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef<any>(null);

    const directories = trpc.getDirectories.useQuery();
    const requests = trpc.requestList.useQuery();  
    const employees = trpc.getEmployees.useQuery();

    const backendContext = `
You are an AI assistant for a hospital website. Refer to the following backend data when answering:

- Directories by location: ${JSON.stringify(directories.data || {})}
- Service Requests: ${JSON.stringify(requests.data || {})}
- Employees in the hospital: ${JSON.stringify(employees.data || {})}

Do NOT give medical advice. Always recommend users speak with a professional.
`;

    useEffect(() => {
        const setupChat = async () => {
            try {
                console.log("Initializing chat...");
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                });

                console.log("Starting chat...");
                const chat = model.startChat({
                    history: [],
                    generationConfig: {
                        maxOutputTokens: 2048,
                    },
                });

                console.log("Sending initial context...");
                await chat.sendMessage(backendContext);
                
                chatRef.current = chat;
                console.log("Chat initialized successfully");

                setMessages([{
                    sender: "ai",
                    text: "Hello! I'm your hospital AI assistant. How can I help you today?"
                }]);
            } catch (error) {
                console.error("Error initializing chat:", error);
                setMessages([{
                    sender: "ai",
                    text: "Sorry, I'm having trouble initializing. Please try again later."
                }]);
            }
        };
        setupChat();
    }, [backendContext]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
        setPrompt("");

        try {
            const chat = chatRef.current;
            if (!chat) {
                console.error("Chat not initialized");
                throw new Error("Chat not initialized");
            }

            console.log("Sending message:", prompt);
            const result = await chat.sendMessage(prompt);
            console.log("Received result:", result);

            const responseText = await result.response.text();
            console.log("Response text:", responseText);

            setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
        } catch (error) {
            console.error("Detailed error during chat:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Sorry, I couldn't process your request. Error: " + error.message },
            ]);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#003a96] text-white p-4 rounded-full shadow-lg hover:bg-blue-950 transition-colors"
            >
                {isOpen ? "×" : "💬"}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
                    <div className="flex flex-col h-[600px]">
                        <div className="p-4 border-b bg-[#003a96] text-white rounded-t-lg">
                            <h2 className="text-xl font-semibold">AI Assistant</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-lg max-w-[80%] ${
                                        message.sender === "user"
                                            ? "ml-auto bg-blue-200"
                                            : "mr-auto bg-gray-200"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border rounded-md"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#003a96] text-white px-4 py-2 rounded-md hover:bg-blue-950"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
