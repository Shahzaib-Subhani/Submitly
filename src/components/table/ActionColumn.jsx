import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const ActionColumn = () => {
    return (
        <>
            <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-red-500  ">
                    <Trash2 size={20} />
                </button>
                <button className="text-gray-500 hover:text-blue-500  ">
                    <Pencil size={20} />
                </button>
            </div>
        </>
    );
}

export default ActionColumn;
