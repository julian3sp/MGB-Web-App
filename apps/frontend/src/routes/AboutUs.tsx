import React from "react";
import { MacbookScroll } from "../components/ui/macbook-scroll";
import aboutus from "../../assets/aboutus.png";

export function AboutUs() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
          <span>
            Do you like our team products? <br /> Be honest.
          </span>
        }
        src={aboutus}
        showGradient={false}
      />
    </div>
  );
}