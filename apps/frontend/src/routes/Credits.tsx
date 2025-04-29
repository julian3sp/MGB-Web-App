import CreditCard from '../components/CreditCard.tsx'
import Ian from '../../assets/Ian.png';
import { Table } from 'react-bootstrap';
import PERN from '../../assets/PERN Stack.png';
import logo from '../../assets/Mass-General-Brigham-Logo.png';
import postgre from '../../assets/postgre.png';
import express from '../../assets/express.jfif';
import reactjs from '../../assets/react.png';
import nodejs from '../../assets/nodejs.png';
import tailwind from '../../assets/tailwind.png';

export function Credits() {
    return (
        <div className="flex flex-col font-[Poppins]">
            <p className="flex justify-center font-semibold pt-5 text-xl">Course Staff</p>
            <div className="flex justify-center">
                <CreditCard image="https://ca.slack-edge.com/T08F9CJ75QX-U08F9CJ76CX-6349088bda1b-512" title="Wilson Wong" description="Our CS3733 Software Engineering Professor" docs=""></CreditCard>
                <p className="p-2"></p>
                <CreditCard image={Ian} title="Ian Wright" description="Our CS3733 Software Engineering Student Assistant" docs=""></CreditCard>
            </div>
            <p className="flex justify-center font-semibold text-xl">Software Engineering Tools</p>
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
            </div>
            <p className="flex justify-center font-bold text-xl">Thank you to our sponsor!</p>
            <div className="flex justify-center">
                <img className="relative flex flex-col w-100" src={logo} alt="logo" />
            </div>
        </div>
    );
}
