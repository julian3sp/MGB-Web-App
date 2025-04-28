"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import allergy from '../../assets/department/allergy.jpg';
import dermatology from '../../assets/department/dermatology.jpg';
import endocrinology from '../../assets/department/endocrinology.jpg';
import gastroenterology from '../../assets/department/gastroenterology.jpg';
import kidney from '../../assets/department/kidney.jpeg';
import veinTreatment from '../../assets/department/veinTreatment.jpeg';

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

export function AppleCardsCarouselDemo() {
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
        <div className=" rounded-[300px] shadow-lg hover:shadow-xl transition-all bg-[#003a96] flex flex-col items-center justify-center p-6">
          <span className="text-3xl pb-1 text-white  ">→</span>
        </div>
      </Link>
    </div>
  );
  
  // Combine regular cards with the show more button
  const allItems = [...cardItems, showMoreItem];

  return (
    <div ref={carouselRef} className="w-full  py-20 ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#003a96] text-center">
        Explore Our Departments
      </h2>
      <Carousel items={allItems} playAnimation={inView} />
    </div>
  );
}