// WelcomePage.tsx
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoSrc from "../../assets/Mass General Brigham in Your Community - Mass General Brigham (1080p, h264).mp4";
import { AppleCardsCarouselDemo } from "@/components/AppleCardsCarouselDemo";

gsap.registerPlugin(ScrollTrigger);

export function WelcomePage() {
  const containerRef     = useRef<HTMLDivElement>(null);
  const wrapperRef       = useRef<HTMLDivElement>(null);
  const videoRef         = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300",
        pin: true,
        scrub: 0.5,
        pinSpacing: false,
      }
    });

    // shrink the wrapper
    tl.to(wrapperRef.current, { width: "85%", duration: 1 })
      // round the corners of the video
      .to(videoRef.current,    { borderRadius: "20px", duration: 0.5 }, "<")
      // shrink the height
      .to(wrapperRef.current, { height: "60vh", duration: 1 }, "<+=0.2");
    
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
      <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-[#003a96] mb-4">
          Never get lost at Mass General Brigham
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Our intuitive navigation system helps you find your destination within the hospital quickly and efficiently.
          No more getting lost in complex hospital corridors!
        </p>
      </div>

      {/* carousel */}
      <AppleCardsCarouselDemo />
    </div>
  );
}
