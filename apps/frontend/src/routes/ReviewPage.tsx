import SubmitButton from "../components/SubmitButton.tsx";
import React, { useState } from "react";
import { trpc } from "@/lib/trpc.ts";

// Simple star display
const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`text-xl ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

export function ReviewPage() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const makeReviewMutation = trpc.makeReview.useMutation();
  const { data: reviews, isLoading, error } = trpc.getReviews.useQuery();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await makeReviewMutation.mutateAsync({ review: text, rating });
      alert("Review submitted successfully!");
      setText("");
      setRating(0);
    } catch {
      alert("Failed to submit review.");
    }
    window.location.reload()
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Form Section */}
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg mb-12">
        <div className="px-6 py-4 border-b border-black text-xl font-semibold">
          Please fill out a review!
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="uppercase text-sm font-medium">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="uppercase text-sm font-medium">Explain your rating</label>
            <textarea
              className="w-full h-32 border border-black p-3 resize-none focus:outline-none"
              value={text}
              onChange={handleTextChange}
              placeholder="Type here…"
            />
          </div>
          <SubmitButton
            label="Submit"
            className="w-full py-3 uppercase text-sm font-semibold tracking-wide"
            style={{ backgroundColor: "#FF5A00" }}
          />
        </form>
      </div>

      {/* Carousel Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">What people are saying</h2>
        {isLoading && <p>Loading reviews…</p>}
        {error && <p className="text-red-500">Error loading reviews.</p>}
        {reviews && reviews.length > 0 && (
          <div className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-2xl shadow-md p-6 snap-start"
              >
                <Stars rating={rev.rating} />
                <p className="mt-4 text-gray-800 text-sm">"{rev.review}"</p>
                <p className="mt-4 text-xs text-gray-500 italic">— {rev.author || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        )}
        {reviews && reviews.length === 0 && <p>No reviews yet.</p>}
      </div>
    </div>
  );
}
