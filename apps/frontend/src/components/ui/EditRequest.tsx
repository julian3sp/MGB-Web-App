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
                className={`fill-red-500`}
                style = {{maxWidth: size}}
                title="Edit Service Request"
            />
        </button>
    );
}
