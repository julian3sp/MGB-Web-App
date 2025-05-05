"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import {motion} from "framer-motion";
import cardiology from '../../assets/department/cardiac.jpeg';
import audiology from '../../assets/department/neurology.jpg';
import community from '../../assets/department/community.png';
import dialysis from '../../assets/department/urgent-care.png';
import pharmacy from '../../assets/department/pharmacy.png';
import radiologymgbh from '../../assets/department/mriCT.png';

import { Link } from "react-router-dom";

const cardsData = [
  {
    category: "Department",
    title: "Radiology",
    src: radiologymgbh,
    content: (
      <></>
    ),
  },
  {
    category: "Department",
    title: "Cardiology",
    src: cardiology,
    content: (
      <></>
    ),
  },
  {
    category: "Department",
    title: "Audiology",
    src: audiology,
    content: (
        <></>
    ),
  },
  {
    category: "Department",
    title: "Orthopaedics",
    src: community,
    content: (
        <></>
    ),
  },
  {
    category: "Department",
    title: "Dialysis",
    src: dialysis,
    content: (
        <></>
    ),
  },
  {
    category: "Department",
    title: "Pharmacy",
    src: pharmacy,
    content: (
        <></>
    ),
  },

];

export function AppleCardsCarouselDemo({ offsetX = 0, offsetRight = 0 }: { offsetX?: number, offsetRight?: number }) { // update to accept offsetX and pass to carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { amount: 0.5 });

  // Create all your regular card items
  const cardItems = cardsData.map((card, i) => (
    <div key={i}>
      <Card card={card} index={i} />
    </div>
  ));
  
  // Create a "Show More" button item that looks like a card
  const showMoreItem = (
    <div key="show-more" className="flex items-center justify-center h-full">
      <Link to="/directory">
      <div className="w-20 h-20 bg-[#003a96] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center ml-10">
        <span className="text-3xl text-white  ">→</span>
      </div>
      </Link>
    </div>
  );
  
  // Combine regular cards with the show more button
  const allItems = [...cardItems, showMoreItem];

  return (
    <div ref={carouselRef} className="w-full py-20 bg-white">
      <motion.div
        className="w-full flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#003a96] text-center">
          Get to know our departments.
        </h2>
      </motion.div>
      <Carousel items={allItems} playAnimation={inView} offsetX={offsetX} offsetRight={offsetRight}/>
    </div>
  );
}