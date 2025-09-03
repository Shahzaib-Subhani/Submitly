import { Trash2} from 'lucide-react';
import  { useEffect} from 'react';

const Modal = ({
    title,
    message,
    isOpen,
    onClose,
    onConfirm,
    showCloseButton = true,
}) => {

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">

            <div
                className="fixed inset-0 h-full w-full bg-gray-500/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full rounded-3xl bg-white  max-w-[600px] p-5 lg:p-10">
                <button  onClick={onClose} className="cursor-pointer absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-800 sm:right-6 sm:top-6 sm:h-11 sm:w-11">
                    ✕
                </button>
                <div>
                    <div className="text-center">
                        <div className="relative flex items-center justify-center z-1 mb-7 text-red-600 animate-bounce">
                            <Trash2 size={55} />
                        </div>
                        <h4 className="mb-2 text-3xl font-semibold text-gray-800  sm:text-title-sm">{title}</h4>
                        <p className="text-md leading-6 text-gray-500 dark:text-gray-400">{message}</p>
                        <div className="flex items-center justify-center w-full gap-3 mt-7">
                            <button onClick={onConfirm} className="flex shadow-md justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 sm:w-auto cursor-pointer">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
