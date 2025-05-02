import {Link} from "react-router-dom";
import CreditCard from '../components/CreditPage/CreditCard.tsx'
import Ian from '../../assets/Ian.png';
import logo from '../../assets/Mass-General-Brigham-Logo.png';
import postgre from '../../assets/postgre.png';
import express from '../../assets/express.jfif';
import reactjs from '../../assets/react.png';
import nodejs from '../../assets/nodejs.png';
import tailwind from '../../assets/tailwind.png';
import docker from '../../assets/docker.png';
import typescript from '../../assets/typescript.png';
import prisma from '../../assets/prisma.png';
import gsap from '../../assets/gsap.jpg';
import framer from '../../assets/framer.png';
import motion from '../../assets/motion.jfif';
import aceternity from '../../assets/aceternity.png';

export function Credits() {
    return (
        <div className="flex flex-col font-[Poppins]">
            <p className="flex justify-center font-semibold pt-5 text-xl">Course Staff</p>
            <div className="flex justify-center">
                <CreditCard image="https://ca.slack-edge.com/T08F9CJ75QX-U08F9CJ76CX-6349088bda1b-512" title="Wilson Wong" description="Our CS3733 Software Engineering Professor" docs=""></CreditCard>
                <p className="p-2"></p>
                <CreditCard image={Ian} title="Ian Wright" description="Our CS3733 Software Engineering Student Assistant" docs=""></CreditCard>
            </div>
            <p className="flex justify-center font-semibold pt-5 text-xl">Software Engineering Tools</p>
            <div className="flex justify-center h-110">
                <CreditCard image={postgre} title="PostgreSQL" description="An open-source database management system" docs="https://www.postgresql.org/"></CreditCard>
                <p className="p-2"></p>
                <CreditCard image={express} title="Express" description="Back-End Web Application Framework" docs="https://www.expressjs.com" />
                <p className="p-2"></p>
                <CreditCard image={reactjs} title="React" description="Front-End JavaScript Library" docs="https://react.dev/"></CreditCard>
                <p className="p-2"></p>
                <CreditCard image={nodejs} title="Node.js" description="JavaScript runtime for server-side applications" docs="https://nodejs.org/en"/>
            </div>
            <div className="flex justify-center h-110">
                <CreditCard image={tailwind} title="Tailwind" description="In-line styling" docs="https://tailwindcss.com/" />
                <p className="p-2"></p>
                <CreditCard image={docker} title="Docker" description="Build, test, and deploy applications" docs="https://docker.com/" />
                <p className="p-2"></p>
                <CreditCard image={typescript} title="TypeScript" description="Programming language for web development" docs="https://www.typescriptlang.org/" />
                <p className="p-2"></p>
                <CreditCard image={prisma} title="Prisma" description="Intuitive database interactions" docs="https://www.prisma.io/docs" />
            </div>
            <p className="flex justify-center font-semibold pt-5 text-xl">Software Libraries</p>
            <div className="flex justify-center h-110">
                <CreditCard image={gsap} title="gsap" description="Animations" docs="https://gsap.com/docs/v3/" />
                <p className="p-2"></p>
                <CreditCard image={framer} title="Framer" description="Website builder" docs="https://www.framer.com/" />
                <p className="p-2"></p>
                <CreditCard image={motion} title="Motion" description="Animation Library" docs="https://motion.dev/" />
                <p className="p-2"></p>
                <CreditCard image={aceternity} title="Aceternity UI" description="UI Component Library" docs="https://ui.aceternity.com/components" />
            </div>
            <p className="flex justify-center font-bold pt-5 text-xl">Thank you to our sponsor!</p>
            <Link to="https://www.massgeneralbrigham.org/en">
            <div className="flex justify-center">
                <img className="relative flex flex-col w-3/4 pb-10" src={logo} alt="logo" />
            </div>
            </Link>
        </div>
    );
}
