type CustomSwitchProps = {
    checked: boolean; // controlled value
    onCheckedChange: (value: boolean) => void;
};

export default function CustomSwitch({ checked, onCheckedChange }: CustomSwitchProps) {
    return (
        <div className="flex border-2 border-[#003a96] rounded-full overflow-hidden w-fit text-md font-medium cursor-pointer text-center">

            {/* true */}
            <button
                onClick={() => onCheckedChange(true)}
                className={`px-4 py-3 transition-colors duration-300 w-30 ${
                    checked
                        ? "bg-white text-[#003a96]"
                        : "bg-[#003a96] text-white"
                }`}
            >
                Table
            </button>

            {/* false */}
            <button
                onClick={() => onCheckedChange(false)}
                className={`px-4 py-2 transition-colors duration-300 w-30 ${
                    !checked
                        ? "bg-white text-[#003a96]"
                        : "bg-[#003a96] text-white"
                }`}
            >
                List
            </button>

        </div>
    );
}
