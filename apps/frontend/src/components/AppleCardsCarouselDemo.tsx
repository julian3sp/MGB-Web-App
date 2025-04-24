"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import navImage from "../../assets/lebron-dunk.jpg";
import pathImage from "../../assets/lebron-poster.jpg";
import editorImage from "../../assets/basketball.jpeg";
import serviceImage from "../../assets/wongagile.png";

const cardsData = [
  {
    category: "Navigation",
    title: "Step-by-Step Directions",
    src: navImage,
    content: (
      <p className="text-gray-600">
        Get crystal-clear directions to any department or facility in the hospital, floor by floor.
      </p>
    ),
  },
  {
    category: "Pathfinding",
    title: "Smart Pathfinding",
    src: pathImage,
    content: (
      <p className="text-gray-600">
        Our algorithm finds the fastest, wheelchair-accessible routes across buildings in real time.
      </p>
    ),
  },
  {
    category: "Map Editor",
    title: "Interactive Map Editor",
    src: editorImage,
    content: (
      <p className="text-gray-600">
        Edit floor plans on the fly—add new wings, close corridors, or annotate points of interest.
      </p>
    ),
  },
  {
    category: "Service Request",
    title: "On-Demand Assistance",
    src: serviceImage,
    content: (
      <p className="text-gray-600">
        Submit and track service requests—whether you need wheelchair help, staff escort, or equipment delivery.
      </p>
    ),
  },
];

export function AppleCardsCarouselDemo() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const inView = useInView(carouselRef, { amount: 0.5 }); // remove the trigger once to make it runs whenever came into sight

  const cards = cardsData.map((card, i) => (
    <Card key={i} card={card} index={i} />
  ));

  return (
    <div ref={carouselRef} className="w-full py-20 bg-white">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#003a96] mb-8">
        Explore Our Features
      </h2>

      {/*
        Pass the `inView` flag down so the Carousel
        only plays its internal animations when it scrolls into view.
      */}
      <Carousel items={cards} playAnimation={inView} />
    </div>
  );
}
