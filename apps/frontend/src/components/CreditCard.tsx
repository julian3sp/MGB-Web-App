type CreditCardProps = {
    image: string,
    title: string,
    description: string,
    docs: string
}

function CreditCard({image, title, description, docs} : CreditCardProps) {
    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img
                    src={image}
                    alt={title}
                />
            </div>
            <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
                <p className="text-slate-600 leading-normal font-light">
                    {description}
                </p>
                { docs === "" ? null : <a href={docs} className="absolute bottom-4 left-4 text-sm text-[#003a96]">Docs</a>}
            </div>
        </div>
    )
}

export default CreditCard