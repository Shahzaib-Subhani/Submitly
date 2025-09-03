import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UseDeleteModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const [target, setTarget] = useState(null);

    const openDeleteModal = () => {
        // setTarget(row);
        setIsOpen(true);
    };

    const closeDeleteModal = () => {
        // setTarget(null);
        setIsOpen(false);
    };

    const confirmDelete = (entry) => {
        toast.success(`${entry} deleted successfully`);
        closeDeleteModal();
    };

    return {
        isOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    };
}

export default UseDeleteModal;
