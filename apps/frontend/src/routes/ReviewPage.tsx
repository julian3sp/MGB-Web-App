import SubmitButton from "../components/SubmitButton.tsx";
import React, { useState } from "react";
import { trpc } from "@/lib/trpc.ts";

export function ReviewPage() {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);

    // Use the TRPC mutation for `makeReview`
    const makeReviewMutation = trpc.makeReview.useMutation();

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleRatingClick = (value: number) => {
        setRating(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Call the `makeReview` mutation
            const newReview = await makeReviewMutation.mutateAsync({
                review: text,
                rating: rating,
            });

            console.log("Review created:", newReview);
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-[20px] font-[Poppins] p-4">
            <p className="mb-4">Please fill out a review!</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
                <label>Please rate your experience:</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            className={`text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <label>Please explain your rating:</label>
                <textarea
                    className="w-full border border-black p-2 rounded resize-vertical"
                    value={text}
                    onChange={handleTextChange}
                    rows={10}
                    placeholder="Type here..."
                />
                <SubmitButton label="Submit" />
            </form>
        </div>
    );
}
