import EditIcon from '../../../assets/EditIconWhite.png';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/Tooltip.tsx';
import DeleteIcon from '../../../assets/DeleteIcon.png';

export default function EditRequest({
    size = 20,
    onClick,
    tooltip = 'Edit',
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
                            src={EditIcon}
                            alt="Edit"
                            className={`fill-red-500`}
                            style={{ maxWidth: size }}
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#003A96] border-2 border-blue-950 w-auto">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
