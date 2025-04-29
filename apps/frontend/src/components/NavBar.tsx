import logo from "../../assets/Mass-General-Brigham-Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import '../styles/mainStyles.css';
import { LogInButton } from "./signIn/LogInButton.tsx";
import { LogOutButton } from "./signIn/LogOutButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
    userRole: string;
    setUserRole: (newRole: string) => void;
};


export default function NavBar({ userRole, setUserRole }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [voiceControls, setVoiceControls] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

    const [tab, setTab] = useState<string>(() => {
        const path = location.pathname;
        if (path.startsWith("/directory")) return "directory";
        if (path.startsWith("/navigation")) return "navigation";
        if (path.startsWith("/services")) return "services";
        if (path.startsWith("/requests")) return "requests";
        if (path.startsWith("/editor")) return "editor";
        if (path.startsWith("/admin/directory")) return "admin/directory";
        return "";
    });


    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsRecognitionSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleVoiceCommand = useCallback((transcript: string) => {
        const lowerTranscript = transcript.toLowerCase();

        if (lowerTranscript.includes("navigation")) {
            navigate("/navigation");
            setTab("navigation");
        } else if (lowerTranscript.includes("home")) {
            navigate("/");
            setTab("home");
        } else if (lowerTranscript.includes("directory") || lowerTranscript.includes("department")) {
            navigate("/directory");
            setTab("directory");
        } else if (lowerTranscript.includes("log out")) {
            logout({ logoutParams: { returnTo: window.location.origin } });
        } else if (lowerTranscript.includes("log in")) {
            loginWithRedirect({});
        } else if (lowerTranscript.includes("service")) {
            navigate("/services");
            setTab("services");
        }
    }, [navigate, logout, loginWithRedirect]);

    useEffect(() => {
        if (!recognitionRef.current) return;

        const recognition = recognitionRef.current;

        const handleResult = (e: SpeechRecognitionEvent) => {
            const current = e.resultIndex;
            const transcript = e.results[current][0].transcript.trim();
            handleVoiceCommand(transcript);
        };

        const handleError = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error", event.error);
            if (voiceControls) {
                setTimeout(() => recognition.start(), 500);
            }
        };

        const handleEnd = () => {
            if (voiceControls) {
                setTimeout(() => recognition.start(), 100);
            }
        };

        recognition.onresult = handleResult;
        recognition.onerror = handleError;
        recognition.onend = handleEnd;

        return () => {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
        };
    }, [voiceControls, handleVoiceCommand]);

    // Toggle voice recognition
    useEffect(() => {
        if (!recognitionRef.current) return;

        if (voiceControls) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.error("Failed to start recognition:", error);
            }
        } else {
            recognitionRef.current.stop();
        }
    }, [voiceControls]);


    const handleVCToggle = () => {
        if (!isRecognitionSupported) {
            alert("Speech recognition is not supported in your browser");
            return;
        }
        setVoiceControls(prev => !prev);
    };

    const getNavLinkClass = (tabName: string) =>
        tab === tabName
            ? "bg-[#003a96] font-[Poppins] text-white px-5 py-5"
            : "text-base text-black hover:bg-[#003a96] font-[Poppins] hover:text-white px-5 py-5 transition-all";

    return (
        <nav id="navbar" className="flex justify-between items-center bg-white text-white border-b-1 border-gray-300">
            <div className="flex items-center space-x-4">
                <Link to="/" className="ml-5" onClick={() => setTab("")}>
                    <img src={logo} alt="Mass General Brigham Logo" className="h-6" />
                </Link>
                <div className="flex">
                    <Link
                        to="/directory"
                        onClick={() => setTab("directory")}
                        className={getNavLinkClass("directory")}
                    >
                        Directory
                    </Link>
                    <Link
                        to="/navigation"
                        onClick={() => setTab("navigation")}
                        className={getNavLinkClass("navigation")}
                    >
                        Navigation
                    </Link>

                    {isAuthenticated && (userRole === "Staff" || userRole === "Admin") && (
                        <>
                            <Link
                                to="/services"
                                onClick={() => setTab("services")}
                                className={getNavLinkClass("services")}
                            >
                                Services
                            </Link>
                            <Link
                                to="/requests"
                                onClick={() => setTab("requests")}
                                className={getNavLinkClass("requests")}
                            >
                                View Requests
                            </Link>
                        </>
                    )}

                    {isAuthenticated && userRole === "Admin" && (
                        <>
                            <Link
                                to="/editor"
                                onClick={() => setTab("editor")}
                                className={getNavLinkClass("editor")}
                            >
                                Map Editor
                            </Link>
                            <Link
                                to="/admin/directory"
                                onClick={() => setTab("admin/directory")}
                                className={getNavLinkClass("admin/directory")}
                            >
                                Export
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-5">
                <LogInButton className="text-base text-black" rerender={setUserRole} />
                <LogOutButton className="text-base text-black" rerender={setUserRole} />
                {isRecognitionSupported && (
                    <button
                        className={`bg-[#003a96] font-[poppins] text-white hover:bg-blue-950 shadow-lg rounded p-3 ${
                            voiceControls ? "ring-2 ring-blue-400" : ""
                        }`}
                        onClick={handleVCToggle}
                    >
                        {voiceControls ? "Voice Control ON" : "Voice Control OFF"}
                    </button>
                )}
            </div>
        </nav>
    );
}