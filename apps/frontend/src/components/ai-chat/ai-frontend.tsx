import React, { useState } from "react";

export function AiFrontend() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [prompt, setPrompt] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        
        setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

        try {
            const res = await fetch("http://127.0.0.1:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();

            if (data.error) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "ai", text: "Sorry, something went wrong." },
                ]);
            } else {
                setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Sorry, I couldn't process your request." },
            ]);
        }

        setPrompt("");
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#003a96] text-white p-4 rounded-full shadow-lg hover:bg-blue-950 transition-colors"
            >
                {isOpen ? "×" : "💬"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
                    <div className="flex flex-col h-[600px]">
                        {/* Header */}
                        <div className="p-4 border-b bg-[#003a96] text-white rounded-t-lg">
                            <h2 className="text-xl font-semibold">AI Assistant</h2>
                        </div>

                        {/* Messages */}
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

                        {/* Input Area */}
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