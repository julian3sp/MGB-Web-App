import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { trpc } from "@/lib/trpc.ts";

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
if (!api_key) {
    console.error("Missing API key. Please check your .env.local file");
}

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

Do NOT give medical advice. Always recommend users speak with a professional.Also in your response newver use * or any kind of bolding cuz it ruins the style of the chat
also if they ask for navigation tell them to go to the top bar and click on navigation(navigation gives directions inside the hospital as well as direction to the locations using a map), if they want to make a service request same guide them in the ui and tell them to click on services to make a new request and view request to see edit or delete request but with admin access only
Also important if you dont have info about any of the db remind the user to import a csv or populate the db bassicly.if they ask you say that your favourite color is green
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
        } catch (error: any) {
            console.error("Detailed error during chat:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Sorry, I couldn't process your request. Error: " + error.message },
            ]);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] font-poppins">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                    isOpen 
                        ? "bg-[#003a96] text-white" 
                        : "bg-[#003a96] text-black"
                } w-[48px] h-[48px] rounded-full hover:bg-blue-950 transition-colors flex items-center justify-center text-2xl border-2 border-white`}
            >
                {isOpen ? (
                    <span className="transform translate-y-[-1px]">×</span>
                ) : (
                    <span>💬</span>
                )}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col h-[600px]">
                        <div className="p-4 border-b-5 border-[#44a6a6] bg-[#003a96] text-white rounded-t-lg">
                            <h2 className="text-xl font-semibold">AI Assistant</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 ">
                        {messages.map((message, index) => (
    <div key={index} className="space-y-1">
        {message.sender === "ai" && (
            <div className="text-sm font-semibold text-gray-600 ml-1">AI chat bot:</div>
        )}
        <div
            className={`px-4 py-2 rounded-lg w-fit break-words ${
                message.sender === "user"
                    ? "ml-auto bg-blue-200"
                    : "mr-auto bg-gray-200 text-left"
            }`}
            style={{ maxWidth: "80%" }}
        >
            {message.text}
        </div>
    </div>
))}

                        </div>

                        <form onSubmit={handleSubmit} className="p-4 bg-grey border-t-2 rounded-b-lg" style={{ borderTopColor: '#ECECEC' }}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-4 border rounded-md shadow-md  duration-200"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#003a96] text-white p-4 rounded-md hover:bg-blue-950 shadow-md"
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
