
const CardHolder = ({ children }) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
                {children}
            </div>
        </>
    );
}

export default CardHolder;
