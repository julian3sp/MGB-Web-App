// WelcomePage.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {motion} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoSrc from "../../assets/Mass General Brigham in Your Community - Mass General Brigham (1080p, h264).mp4";
import { AppleCardsCarouselDemo } from "@/components/AppleCardsCarouselDemo";
import Popup from "../components/ui/Popup.tsx"
gsap.registerPlugin(ScrollTrigger);

export function WelcomePage() {
    const [tab, setTab] = React.useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sidePadding, setSidePadding] = useState(0);

  const updatePadding = () => {
    if (!wrapperRef.current) return;
    const leftPx = wrapperRef.current.getBoundingClientRect().left; // get the left position of the wrapper each frame
    setSidePadding(leftPx); // store that in react state and apply it vid inline style around the carousel 
  }

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
      .to(videoRef.current, { borderRadius: "20px", duration: 0.5 }, "<")
      // shrink the height
      .to(wrapperRef.current, { height: "60vh", duration: 1 }, "<+=0.2");

      updatePadding();

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="flex flex-col">
      {/* pinned section */}
      <div ref={containerRef} className="min-h-screen">
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

      {/* centered text */}
      <motion.div
        className="w-full flex flex-col items-center justify-center py-12 px-4 text-center"
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
        <p className="text-lg text-gray-700 max-w-2xl mt-4">
          Our intuitive pathfinding algorithm helps you find your destination within the hospital quickly and efficiently.
          No more getting lost in complex hospital corridors!
        </p>
      </motion.div>
      <AppleCardsCarouselDemo/>
    </div>
  );
}
