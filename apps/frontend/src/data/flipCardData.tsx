import radiologyImg from '../../assets/radiology-mgbh.png';
import bloodImg from '../../assets/department/blood.webp';
import urgentCareImg from '../../assets/department/urgent-care.png';
import pharmacyImg from '../../assets/department/pharmacy.png';
import cardiacImg from '../../assets/department/cardiac.jpeg';
import urologyImg from '../../assets/department/urology.png';
import gynecologyImg from '../../assets/department/gynecology.jpg';
import lactationImg from '../../assets/department/lactation.webp';
import veinTreatmentImg from '../../assets/department/veinTreatment.jpeg';
import audiologyImg from '../../assets/department/audiology.png';
import pulmonologyImg from '../../assets/department/pulmonology.jpg';
import mriCTImg from '../../assets/department/mriCT.png';
import endoImg from '../../assets/department/endocrinology.jpg';
import vascularImg from '../../assets/department/vascular.png';

import lebron1 from '../../assets/lebron-dunk.jpg';
import lebron2 from '../../assets/lebron-poster.jpg';
import testingImg from '../../assets/insideMGB.png';
import pathImage from "../../assets/insideMGB.png";
import editorImage from "../../assets/phoneMap.jpeg";
import serviceImage from "../../assets/service.jpeg";
import { CardContent } from "../components/department/CardContent.tsx";




export const flipCardsData = [
    {
        category: "Chestnut Hill",
        title: "Laboratory",
        src: serviceImage,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 100"}
                    specialties={["Blood Work", "Lab Services"]}
                    phoneNumber={"(617) 732-9841"}
                />
            </div>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Multi-Specialty Clinic",
        src: pathImage,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 130"}
                    specialties={["Orthopedic Surgery", "Vascular Services", "Contact Dermatitis", "Occupational Dermatology Program", "Pain Medicine", "Travel Medicine"]}
                    phoneNumber={"(617) 732-9500"}
                />
            </div>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Radiology, MRI/CT Scan",
        src: radiologyImg,
        content: (
            <div>
                <CardContent
                    location={"1st Floor, Suite 100"}
                    specialties={["CT Scan", "MRI", "X-Ray"]}
                    phoneNumber={"(617) 732-9821"}
                />
            </div>
        ),
    },
    {
        category: "Patriot Place",
        title: "Pharmacy",
        src: pharmacyImg,
        content: (
                <p className={"text-white"}>
                    Location: 20 Patriot Place
                </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Blood Draw / Phlebotomy",
        src: bloodImg,
        content: (
            <p className={"text-white"}>
                Location: 20 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Urgent Care Center",
        src: urgentCareImg,
        content: (
            <p className={"text-white"}>
                Location: 20 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Cardiovascular Services",
        src: cardiacImg,
        content: (
            <p className={"text-white"}>
                Location: 20 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Urology",
        src: urologyImg,
        content: (
            <p className={"text-white"}>
                Location: 20 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Gynecology",
        src: gynecologyImg,
        content: (
            <p className={"text-white"}>
                Location: 22 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Lactation",
        src: lactationImg,
        content: (
            <p className={"text-white"}>
                Location: 22 Patriot Place
            </p>
        ),
    },
    {
        category: "Patriot Place",
        title: "Vein Treatment",
        src: veinTreatmentImg,
        content: (
            <p className={"text-white"}>
                Location: 22 Patriot Place
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Admitting/Registration",
        src: pathImage,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Audiology",
        src: audiologyImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Blood Drawing Lab",
        src: bloodImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Cardiac Rehab",
        src: cardiacImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Emergency Department",
        src: urgentCareImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Endoscopy",
        src: endoImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "MRI/CT Scans",
        src: mriCTImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Pre-Admittance Screening",
        src: pathImage,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Pulmonary Lab",
        src: pulmonologyImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Radiology",
        src: radiologyImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Special Testing",
        src: bloodImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
    {
        category: "Faulkner",
        title: "Vascular Lab",
        src: vascularImg,
        content: (
            <p className={"text-white"}>
                Location: Floor 1
            </p>
        ),
    },
];