import radiologyImg from '../../assets/radiology-mgbh.png';
import lebron1 from '../../assets/lebron-dunk.jpg';
import lebron2 from '../../assets/lebron-poster.jpg';
import testingImg from '../../assets/insideMGB.png';
import pathImage from "../../assets/insideMGB.png";
import editorImage from "../../assets/phoneMap.jpeg";
import serviceImage from "../../assets/service.jpeg";

export const flipCardsData = [
    {
        category: "Chestnut Hill",
        title: "Radiology",
        src: radiologyImg,
        content: (
            <p className="text-gray-600">
                Hello peter.
            </p>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Multi-Specialty Clinic",
        src: pathImage,
        content: (
            <p className="text-gray-600">
                Our algorithm finds the fastest, wheelchair-accessible routes across buildings in real time.
            </p>
        ),
    },
    {
        category: "Chestnut Hill",
        title: "Laboratory",
        src: serviceImage,
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
    {
        category: "Service Request",
        title: "On-Demand Assistance",
        src: lebron1,
        content: (
            <p className="text-gray-600">
                Submit and track service requests—whether you need wheelchair help, staff escort, or equipment delivery.
            </p>
        ),
    },
];