// WelcomePage.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoSrc from "../../assets/Mass General Brigham in Your Community - Mass General Brigham (1080p, h264).mp4";
import { AppleCardsCarouselDemo } from "@/components/AppleCardsCarouselDemo";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WelcomePage() {
  const [tab, setTab] = React.useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sidePadding, setSidePadding] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null)

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  const calculatePadding = () => {
    const viewportWidth = window.innerWidth; // get the width of the viewport
    const wrapperWidth = viewportWidth * 0.85; // get the width of the wrapper
    const padding = (viewportWidth - wrapperWidth) / 2; // calculate the padding for each side
    return padding;
  };

  const updatePadding = () => {
    const padding = calculatePadding();
    setSidePadding(padding);
  };

  useEffect(() => {
    const tl = gsap.timeline({ // create a gsap timeline which is a sequence of animations
      scrollTrigger: { // animations will play as the user scroll
        trigger: containerRef.current, // the element that triggers the animation, when this element enters the viewport, the animation starts
        start: "top top", // when the top of the trigger element hits the top of the viewport, the animation starts
        end: "+=300", // ends 300 pixels after the start
        pin: true, // pin the trigger element in place while the animation is playing
        scrub: 0.5, // smooth scrubbing, takes 0.5 seconds to catch up to the scroll position
        pinSpacing: false, // prevents the pinning element from adding extra space to the page
        onUpdate: updatePadding,
        onRefresh: updatePadding, // update the padding when the page is resized
      }
    });

    // shrink the wrapper
    tl.to(wrapperRef.current, { width: "85%", duration: 1 })
      // round the corners of the video
      .to(videoRef.current, { borderRadius: "50px", duration: 0.5 }, "<")
      // shrink the height
      .to(wrapperRef.current, { height: "60vh", duration: 1 }, "<+=0.2");

    updatePadding();

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      setInactive(false);
    };

    // if scroll, call function handleScroll to set setScrolling to true
    window.addEventListener("scroll", handleScroll);

    const inactivityTimer = setTimeout(() => {
      setInactive(true);
    }, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* pinned section */}
      <div ref={containerRef}>
        <div
          ref={wrapperRef}
          className="relative w-full h-screen mx-auto overflow-hidden flex justify-center items-center"
        >
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            <button
              ref={buttonRef}
              onClick={togglePlayback}
              className="absolute bottom-10 right-5 bg-[#f2f2f7]/80 hover:bg-[#e5e5ea]/90 text-[#3c3c43] p-2 rounded-full transition shadow-md backdrop-blur z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                {isPlaying ? (
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>

      <motion.div
        className="w-full flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-[#003a96]">
          Never get lost at
          <span className="block mt-2 text-7xl md:text-8xl font-extrabold">
            Mass General Brigham
          </span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mt-4">
          Our intuitive pathfinding algorithm helps you find your destination within the hospital quickly and efficiently.
          No more getting lost in complex hospital corridors!
        </p>
        <Link to="/navigation" className="w-[10%] h-15 bg-[#003a96] hover:bg-blue-950 transition p-5 rounded-3xl mt-5 flex items-center justify-center cursor-pointer z-10">
          <span className="font-bold text-white text-xl">Try now!</span>
        </Link>

      </motion.div>
      <AppleCardsCarouselDemo offsetX={sidePadding} offsetRight={sidePadding} />
      {/* initial state: carousel is offset left side padding */}
    </div>
  );
}
