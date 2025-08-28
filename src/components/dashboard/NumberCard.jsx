

const NumberCard = ({ number, title, Icon, color }) => {
    const iconClassName = `flex items-center justify-center w-14 h-14 rounded-xl ${color}`;
    return (
        <>
            {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
                <div className={iconClassName}>
                    <Icon size={30} />
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {title}
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-3xl">
                            {number}
                        </h4>
                    </div>

                </div>
            </div> */}

            <article className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${color}`}>
                      <Icon size={30} />
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 ">{number}</h3>
                    <p className="flex items-center gap-3 text-gray-500 ">{title}</p>
                </div>
            </article>


        </>
    );
}

export default NumberCard;
