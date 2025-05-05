import EditIcon from '../../../assets/EditIcon.png';
import EditIconWhite from '../../../assets/EditIconWhite.png';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import DeleteIcon from '../../../assets/DeleteIcon.png';

export default function EditRequest({
    size = 20,
    onClick,
    tooltip = 'Edit',
    blue=true
}: {
    size?: number;
    onClick: () => void;
    tooltip?: string;
    blue? : boolean;
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
                            src={blue ? EditIcon : EditIconWhite}
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
