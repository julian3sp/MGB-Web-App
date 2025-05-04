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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const directories = trpc.getDirectories.useQuery();
    const requests = trpc.requestList.useQuery();  
    const employees = trpc.getEmployees.useQuery();

    const backendContext = `
You are an AI assistant for a hospital website. Refer to the following backend data when answering:

- Directories by location: ${JSON.stringify(directories.data || {})}
- Service Requests: ${JSON.stringify(requests.data || {})}
- Employees in the hospital: ${JSON.stringify(employees.data || {})}

Do NOT give medical advice. Always recommend users speak with a professional. Also in your response never use * or any kind of bolding cuz it ruins the style of the chat.
If they ask for navigation tell them to go to the top bar and click on navigation (navigation gives directions inside the hospital as well as direction to the locations using a map). 
If they want to make a service request, guide them in the UI to click on services to make a new request and view request to see/edit/delete requests (admin access required for modifications).
If you don't have info about any of the DB, remind the user to import a CSV or populate the database.
`;

    //close on clickaway
    const useClickOutside = (handler: () => void) => {
        const reference = useRef();

        useEffect(() => {
            const newHandler = (event: MouseEvent) => {
                if (!reference.current?.contains(event.target)) handler();
            };

            document.addEventListener('mousedown', newHandler);

            return () => {
                document.removeEventListener('mousedown', newHandler);
            };
        }, [handler]);
        return reference;
    };

    const chatBoxRef = useClickOutside(() => {
        setIsOpen(false);
    });

    // Auto-scroll effect
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
        <div ref={chatBoxRef} className="fixed bottom-4 right-4 z-[9999] font-poppins">

            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`${
                        isOpen
                            ? "bg-[#003a96] text-white"
                            : "bg-[#003a96] text-black"
                    } cursor-pointer w-[48px] h-[48px] rounded-full hover:bg-blue-950 transition-colors flex items-center justify-center text-2xl border-2 border-white`}
                >
                    <span>💬</span>
                </button>
            ) : (
                <button
                    onClick={() => setIsOpen(false)}
                    className={`${
                        isOpen
                            ? "bg-[#003a96] text-white"
                            : "bg-[#003a96] text-black"
                    } cursor-pointer w-[48px] h-[48px] rounded-full hover:bg-blue-950 transition-colors flex items-center justify-center text-2xl border-2 border-white`}
                >
                    <span className="transform translate-y-[-1px]">×</span>
                </button>

            )}


            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col h-[600px]">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-white text-3xl font-semibold cursor-pointer"
                        >
                            &times;
                        </button>

                        <div className="p-4 border-b-5 border-[#44a6a6] bg-[#003a96] text-white rounded-t-lg">
                            <h2 className="text-xl font-bold font-poppins">AI Assistant</h2>
                        </div>


                        <div className="flex-1 overflow-y-scroll px-4 py-3 space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className="space-y-1">
                                    {message.sender === "ai" && (
                                        <div className="text-sm font-semibold text-gray-600 ml-1 mr-1">AI chat bot:</div>
                                    )}
                                    <div
                                        className={`px-5 py-2 rounded-lg w-fit break-words ${
                                            message.sender === "user"
                                                ? "ml-auto bg-blue-200"
                                                : "mr-auto bg-gray-200"
                                        }`}
                                        style={{ maxWidth: "80%" }}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 bg-grey border-t-2 rounded-b-lg" style={{ borderTopColor: '#ECECEC' }}>
                            <div className="flex gap-1">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-4 border rounded-md shadow-md  duration-200"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#003a96] text-white p-4 rounded-md hover:bg-blue-950 shadow-md cursor-pointer"
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