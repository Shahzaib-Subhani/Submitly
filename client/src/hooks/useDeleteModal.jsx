import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UseDeleteModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteFn, setDeleteFn] = useState(null);
    const [refreshFn, setRefreshFn] = useState(null);

    const openDeleteModal = (id, apiFn, onSuccess) => {
        setDeleteFn(() => apiFn);
        setRefreshFn(() => onSuccess);
        setIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteFn(null);
        setRefreshFn(null);
        setIsOpen(false);
    };

    const confirmDelete = async () => {
        if (!deleteFn) return;
        try {
            await deleteFn();
            toast.success({ main: "Record Deleted successfully" });
            if (refreshFn) await refreshFn();
        } catch (error) {
            toast.error({ main: error.message || "Failed to delete" });
        } finally {
            closeDeleteModal();
        }
    };

    return {
        isOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    };
}

export default UseDeleteModal;
