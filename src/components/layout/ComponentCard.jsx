
const ComponentCard = ({ title, children, className = "" }) => {
    return (
        <>
            <div className={`rounded-2xl border border-gray-200 bg-white  ${className}`}>
                <div className="px-6 py-5">
                    <h3 className="text-lg font-medium text-gray-800 ">
                        {title}
                    </h3>
                </div>


                <div className="p-4 border-t border-gray-100 sm:p-6">
                    <div className="space-y-6">{children}</div>
                </div>
            </div>
        </>
    );
}

export default ComponentCard;
