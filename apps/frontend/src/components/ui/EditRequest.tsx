import EditIcon from '../../../assets/EditIcon.png';

export default function EditRequest({
    size = 20,
    onClick,
}: {
    size?: number;
    onClick: () => void;
}) {
    return (
        <button
            onClick={(e) => {
                onClick()
            }}
        >
            <img
                src={EditIcon}
                alt="Edit"
                className={`max-w-[${size}px] fill-red-500`}
                title="Edit Service Request"
            />
        </button>
    );
}
