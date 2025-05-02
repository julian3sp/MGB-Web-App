import EditIcon from '../../../assets/EditIcon.png';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/serviceRequest/tooltip.tsx';

export default function ExitButton({
    size = 20,
    onClick,
    tooltip = 'Exit',
}: {
    size?: number;
    onClick: () => void;
    tooltip?: string;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className="flex items-center cursor-pointer select-none"
                        onClick={(e) => {
                            onClick();
                        }}
                    >
                        <p style={{ fontSize: size, color: "white" }}>&times;</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-[#003A96] border-2 border-[#003A96] w-auto">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
