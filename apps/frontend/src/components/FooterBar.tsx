import React from 'react';
import { Link } from 'react-router-dom';
import HospitalIcon from "../../assets/logo-icon-mass-general-brigham.png";
import { SocialIcon } from 'react-social-icons';

function FooterBar() {
  return (
    <footer className="bg-[#003a96] text-white p-5 w-full">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img src={HospitalIcon} alt="Mass General Brigham Logo" className="h-8 w-8" />
          </Link>

          <Link to="/aboutus">About</Link>
          <a href="https://www.massgeneralbrigham.org/en" target="_blank" rel="noopener noreferrer">
            Official Website
          </a>
          <Link to="/directory">Directory</Link>
          <Link to="/navigation">Navigation</Link>
          <Link to="/Credits">Credits</Link>
          <Link to="/reviews">Review</Link>
        </div>

        <div className="flex space-x-3">
          <SocialIcon url="https://www.facebook.com/MassGeneralBrigham" bgColor="#003a96" />
          <SocialIcon url="https://x.com/MassGenBrigham" bgColor="#003a96" />
          <SocialIcon url="https://www.instagram.com/massgeneralbrigham/" bgColor="#003a96" />
          <SocialIcon url="https://www.youtube.com/massgeneralbrigham" bgColor="#003a96" />
          <SocialIcon url="https://www.linkedin.com/company/mass-general-brigham" bgColor="#003a96" />
        </div>
      </nav>

      <div className="mt-4 ml-1 font-[Poppins] text-sm">
        This page is not to be used for emergencies. For emergencies, please dial 911
      </div>
    </footer>
  );
}

export default FooterBar;
