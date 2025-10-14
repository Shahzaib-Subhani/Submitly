
const CardHolder = ({ grid = "sm:grid-cols-3", children }) => {
    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`}>
                {children}
            </div>
        </>
    );
}

export default CardHolder;
