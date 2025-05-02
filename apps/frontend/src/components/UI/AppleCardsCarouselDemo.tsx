"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Carousel, Card } from "@/components/UI/apple-cards-carousel.tsx";
import {motion} from "framer-motion";
import allergy from '../../../assets/department/allergy.jpg';
import dermatology from '../../../assets/department/dermatology.jpg';
import endocrinology from '../../../assets/department/endocrinology.jpg';
import gastroenterology from '../../../assets/department/gastroenterology.jpg';
import kidney from '../../../assets/department/kidney.jpeg';
import veinTreatment from '../../../assets/department/veinTreatment.jpeg';

import { Link } from "react-router-dom";

const cardsData = [
  {
    category: "Department",
    title: "Vein Treatment",
    src: veinTreatment,
    content: (
      <p className="text-gray-600">
        Minimally invasive procedures for varicose and spider veins to improve circulation.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Allergy",
    src: allergy,
    content: (
      <p className="text-gray-600">
        Testing and treatment for seasonal, food, and environmental allergies.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Dermatology",
    src: dermatology,
    content: (
      <p className="text-gray-600">
        Skin health services: acne, eczema, skin cancer screenings, and cosmetic dermatology.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Endocrinology",
    src: endocrinology,
    content: (
      <p className="text-gray-600">
        Hormonal disorder management, including diabetes, thyroid, and adrenal conditions.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Gastroenterology",
    src: gastroenterology,
    content: (
      <p className="text-gray-600">
        Digestive system care: endoscopy, colonoscopy, and treatment of GI disorders.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Kidney (Renal) Medicine",
    src: kidney,
    content: (
      <p className="text-gray-600">
        Care for kidney disease, dialysis coordination, and transplant evaluation.
      </p>
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