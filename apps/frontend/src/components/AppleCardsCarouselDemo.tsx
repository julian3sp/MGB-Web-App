"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import gynecology from '../../assets/department/gynecology.jpg';
import gynecologySpecialist from '../../assets/gynecologySpecialist.jpg';
import lactation from '../../assets/department/lactation.jpg';
import allergy from '../../assets/department/allergy.jpg';
import blood from '../../assets/department/blood.webp';
import cardiac from '../../assets/department/cardiac.jpeg';
import community from '../../assets/department/community.png';
import dermatology from '../../assets/department/dermatology.jpg';
import endocrinology from '../../assets/department/endocrinology.jpg';
import gastroenterology from '../../assets/department/gastroenterology.jpg';
import kidney from '../../assets/department/kidney.jpeg';
import neurology from '../../assets/department/neurology.jpg';
import neurosurgery from '../../assets/department/neurosurgery.jpg';
import ophthalmology from '../../assets/department/ophthalmology.png';
import optometry from '../../assets/department/optometry.jpeg';
import primary from '../../assets/department/primary.jpeg';
import pulmonology from '../../assets/department/pulmonology.jpg';
import rheumatology from '../../assets/department/rheumatology.jpg';
import veinCare from '../../assets/department/veinCare.jpg';
import veinTreatment from '../../assets/department/veinTreatment.jpeg';
import women from '../../assets/department/women.webp'

const cardsData = [
  {
    category: "Department",
    title: "Gynecology",
    src: gynecology,
    // hoverSrc: gynecologySpecialist,
    content: (
      <p className="text-gray-600">
        Preventive care, diagnosis, and treatment of disorders of the female reproductive system.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Lactation",
    src: lactation,
    content: (
      <p className="text-gray-600">
        Expert breastfeeding support and education to optimize maternal and infant health.
      </p>
    ),
  },
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
    title: "Cardiac Arrhythmia",
    src: cardiac,
    content: (
      <p className="text-gray-600">
        Diagnosis and management of irregular heartbeats, including ablation therapies.
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
  {
    category: "Department",
    title: "Neurology",
    src: neurology,
    content: (
      <p className="text-gray-600">
        Diagnosis and treatment of brain and nerve disorders, including epilepsy and stroke.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Neurosurgery",
    src: neurosurgery,
    content: (
      <p className="text-gray-600">
        Surgical interventions for brain, spine, and peripheral nerve conditions.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Ophthalmology",
    src: ophthalmology,
    content: (
      <p className="text-gray-600">
        Comprehensive eye exams, cataract surgery, and glaucoma management.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Optometry",
    src: optometry,
    content: (
      <p className="text-gray-600">
        Vision testing, contact lens fittings, and treatment of refractive errors.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Pulmonology",
    src: pulmonology,
    content: (
      <p className="text-gray-600">
        Lung disease care: asthma, COPD, and sleep apnea evaluation.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Rheumatology",
    src: rheumatology,
    content: (
      <p className="text-gray-600">
        Treatment for arthritis, autoimmune conditions, and complex musculoskeletal disorders.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Vein Care Services",
    src: veinCare,
    content: (
      <p className="text-gray-600">
        In-office procedures and follow-up for vein health and sclerotherapy.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Women’s Health",
    src: women,
    content: (
      <p className="text-gray-600">
        Holistic care across all stages of a woman’s life, from preventive screenings to menopause management.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Blood Draw/Phlebotomy",
    src: blood,
    content: (
      <p className="text-gray-600">
        Fast, gentle blood collection services with pediatric and adult specialists.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Community Room",
    src: community,
    content: (
      <p className="text-gray-600">
        Flexible space for support groups, educational classes, and family gatherings.
      </p>
    ),
  },
  {
    category: "Department",
    title: "Primary Care",
    src: primary,
    content: (
      <p className="text-gray-600">
        Your first point of contact for preventive care, chronic disease management, and wellness visits.
      </p>
    ),
  },
];

export function AppleCardsCarouselDemo() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { amount: 0.5 });

  const cards = cardsData.map((card, i) => (
    <Card key={i} card={card} index={i} />
  ));

  return (
    <div ref={carouselRef} className="w-full py-20 bg-white">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#003a96] text-center">
        Explore Our Departments
      </h2>
      <Carousel items={cards} playAnimation={inView} />
    </div>
  );
}
