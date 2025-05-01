import React, { useEffect, useState, useRef, useCallback } from "react";
import {trpc} from "../../lib/trpc.ts";
import Ai_backend from "../../../../backend/src/ai_backend.ts";

export function AiFrontend() {
    
    return(
        <div className="ai-frontend-container">
            <div className="ai-frontend-header">
                <h1>AI Chat</h1>
            </div>
            <div className="ai-frontend-content">
                <p>Welcome to the AI Chat interface!</p>
            </div>
        </div>
    )
}