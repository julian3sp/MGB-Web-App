import ViewIcon from '../../../assets/ViewIcon.png';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './tooltip.tsx';
import DeleteIcon from '../../../assets/DeleteIcon.png';

export default function ViewRequest({
                                        size = 20,
                                        onClick,
                                        tooltip = 'View',
                                    }: {
    size?: number;
    onClick: () => void;
    tooltip?: string;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button
                        className="select-none cursor-pointer"
                        onClick={(e) => {
                            onClick();
                        }}
                    >
                        <img
                            src={ViewIcon}
                            alt="View"
                            className={`fill-red-500`}
                            style={{ maxWidth: size }}
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-[#003A96] border-2 border-[#003A96] w-auto">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
