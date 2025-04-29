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
          className="w-full h-screen mx-auto overflow-hidden flex justify-center items-center"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {!scrolling && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl text-white animate-pulse"
          >
            <div className="flex flex-col items-center space-y-0">
              <div className="flex flex-col items-center space-y-0">
                <ChevronDown className="animate-bounce -mb-20" size={100} strokeWidth={0.5}/>
                <ChevronDown className="animate-bounce delay-200 -mb-20" size={100} strokeWidth={0.5}/>
                <ChevronDown className="animate-bounce delay-400 -mb-19" size={100} strokeWidth={0.5}/>
              </div>
            </div>

          </motion.div>
        </div>
      )}

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
