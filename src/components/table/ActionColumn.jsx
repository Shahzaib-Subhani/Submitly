import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ActionColumn = ({
    isView = false,
    isEdit = false,
    isDelete = false,
    isTextBtn = false,
    viewPath = "",
    editPath = "",
    deletePath = "",
    textBtnPath = "",
    textBtnLabel = ""
}) => {

    const actions = [
        { enabled: isTextBtn, label: textBtnLabel, path: textBtnPath, hover: "hover:text-indigo-500  hover:bg-indigo-50", path: null },
        { enabled: isView, label: "View", path: viewPath, icon: <Eye size={20} />, hover: "hover:text-emerald-500  hover:bg-emerald-50" },
        { enabled: isEdit, label: "Edit", path: editPath, icon: <Pencil size={20} />, hover: "hover:text-blue-500  hover:bg-blue-50" },
        { enabled: isDelete, label: "Delete", path: deletePath, icon: <Trash2 size={20} />, hover: "hover:text-red-500  hover:bg-red-50" },

    ];
    return (

        <div className="flex items-center w-full gap-2">
            {actions.map(
                (action, idx) =>
                    action.enabled && (
                        <Link
                            key={idx}
                            to={action.path}
                            title={action.label}
                            className={`text-gray-500 ${action.hover} inline-flex items-center border-1 border-gray-200 justify-center p-1 rounded`}
                        >
                            {action.icon ?? action.label}
                        </Link>
                    )
            )}
        </div>

    );
}

export default ActionColumn;
