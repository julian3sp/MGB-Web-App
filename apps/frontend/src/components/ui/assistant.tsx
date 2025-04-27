import react from 'react'
import icon from '../../../assets/logo-icon-mass-general-brigham.png'

export default function Assistant() {
    return (
        <button className="bg-gray-500 w-20 h-20 rounded-full fixed bottom-5 right-5">
            <span >
                <img src={icon} className="relative inline-flex size-3 bg-[#003a96] animate-ping rounded-full"/>
            </span>
        </button>
    )
}