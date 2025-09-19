import { Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useMemo } from 'react';
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
    textBtnLabel = "",
    onDelete
}) => {

    const baseClasses =
        "text-gray-500 inline-flex items-center border border-gray-200 justify-center p-1 rounded";
    const actions = useMemo(
        () => [
            { enabled: isTextBtn, label: textBtnLabel, path: textBtnPath, hover: "hover:text-indigo-500  hover:bg-indigo-50", },
            { enabled: isView, label: "View", path: viewPath, icon: <Eye size={20} />, hover: "hover:text-emerald-500  hover:bg-emerald-50" },
            { enabled: isEdit, label: "Edit", path: editPath, icon: <Pencil size={20} />, hover: "hover:text-sky-500  hover:bg-sky-100" },
            { enabled: isDelete, label: "Delete", path: deletePath, icon: <Trash2 size={20} />, hover: "hover:text-rose-500  hover:bg-rose-100", onClick: onDelete },

        ], [isTextBtn, textBtnLabel, textBtnPath, isView, viewPath, isEdit, editPath, isDelete, onDelete]);

    return (

        <div className="flex items-center w-full gap-2">
            {actions.map(
                (action, idx) =>
                    action.enabled && (
                        action.onClick ? (
                            <button
                                key={idx}
                                title={action.label}
                                className={`${baseClasses} ${action.hover} `}
                                onClick={action.onClick}
                            >
                                {action.icon ?? action.label}
                            </button>
                        ) : (
                            <Link
                                key={idx}
                                to={action.path}
                                title={action.label}
                                className={`${baseClasses} ${action.hover} `}
                            >
                                {action.icon ?? action.label}
                            </Link>
                        )
                    )
            )}
        </div>

    );
}

export default ActionColumn;
