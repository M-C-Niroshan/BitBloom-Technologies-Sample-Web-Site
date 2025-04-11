import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { fetchData } from '@/utility/fetchData';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Feather Icons

export default function Customizeslider() {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [sliders, setSliders] = useState<{ src: string; caption: string; id?: number }[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        loadSliders();
    }, []);

    const loadSliders = async () => {
        try {
            const data = await fetchData('/dashboard/customize-home/slider/getsliders');
            setSliders(data);
        } catch (error) {
            toast.error('Failed to load sliders.');
        }
    };

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const resetForm = () => {
        setImage(null);
        setDescription('');
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleSave = async () => {
        if (!image || !description) return;

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            await submitForm('/dashboard/customize-home/slider/store', formData, csrfToken);
            toast.success('Slider added successfully!');
            resetForm();
            setShowModal(false);
            loadSliders();
        } catch (error) {
            toast.error('Failed to add slider.');
        }
    };

    const handleUpdate = async () => {
        if (editIndex === null || !description) return;

        const slider = sliders[editIndex];
        const formData = new FormData();
        formData.append('id', String(slider.id));
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            await submitForm('/dashboard/customize-home/slider/update', formData, csrfToken);
            toast.success('Slider updated!');
            resetForm();
            setShowModal(false);
            loadSliders();
        } catch (error) {
            toast.error('Update failed.');
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id || !confirm('Are you sure you want to delete this slider?',)) return;

        const formData = new FormData();
        formData.append('id', String(id));

        try {
            await submitForm('/dashboard/customize-home/slider/delete', formData, csrfToken);
            toast.success('Slider deleted!');
            loadSliders();
        } catch (error) {
            toast.error('Failed to delete slider.');
        }
    };

    const openEditModal = (index: number) => {
        const selected = sliders[index];
        setIsEditing(true);
        setEditIndex(index);
        setDescription(selected.caption);
        setImage(null); // if user uploads new image
        setShowModal(true);
    };

    return (
        <div>
            <AdminLayout title="">
                <div className="w-full">
                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add New Slider
                    </button>
                </div>

                <div className="mt-3 pb-3 border rounded-md overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
                            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 z-10">
                                <tr>
                                    <th className="border-b px-4 py-3">Image</th>
                                    <th className="border-b px-4 py-3">Description</th>
                                    <th className="border-b px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="border">
                                {sliders.map((slider, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="border-b px-4 py-2">
                                            <img
                                                src={slider.src}
                                                alt="Slider"
                                                className="w-40 h-28 object-cover rounded shadow"
                                            />
                                        </td>
                                        <td className="border-b px-4 py-2">{slider.caption}</td>
                                        <td className="border-b px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => openEditModal(idx)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                                            >
                                                <FiEdit className="mr-1" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(slider.id)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                                            >
                                                <FiTrash2 className="mr-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 text-black">
                        <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                                {isEditing ? 'Edit Slider' : 'Add New Slider'}
                            </h2>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Upload Image</label>
                                <div className="relative w-full">
                                    {!image ? (
                                        <label
                                            htmlFor="fileUpload"
                                            className="flex items-center justify-center border border-dashed border-gray-400 rounded-md w-full h-40 cursor-pointer hover:bg-gray-100"
                                        >
                                            <span className="text-4xl text-gray-500">+</span>
                                        </label>
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Preview"
                                            className="rounded border border-gray-300 w-full h-40 object-cover"
                                        />
                                    )}
                                    <input
                                        id="fileUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border rounded p-2"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowModal(false);
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={isEditing ? handleUpdate : handleSave}
                                    disabled={!description.trim()}
                                    className={`px-4 py-2 rounded text-white ${!description.trim()
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isEditing ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </div>
    );
}
