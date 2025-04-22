import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { LuSquareArrowDownRight } from "react-icons/lu";
import { MdCheckCircle } from "react-icons/md";
import toast from 'react-hot-toast';

export default function CustomizeKeyServices() {
    const [keyServices, setKeyServices] = useState<{ id: number; mainTitle: string; captions: { caption: string }[] }[]>([]);
    const [mainTitle, setMainTitle] = useState('');
    const [captions, setCaptions] = useState(['']);
    const [editId, setEditId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-home/key-services/getKeyServicesinfo');
            const data = await res.json();
            setKeyServices(data);
        } catch (error) {
            toast.error('Failed to load Key Services info');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setMainTitle('');
        setCaptions(['']);
        setEditId(null);
        setShowModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('mainTitle', mainTitle);
        captions.forEach((caption, index) => {
            formData.append(`captions[${index}]`, caption);
        });
        if (editId) formData.append('id', editId.toString());

        const url = editId
            ? '/dashboard/customize-home/key-services/update'
            : '/dashboard/customize-home/key-services/store';

        try {
            await submitForm(url, formData, csrfToken);
            loadHeaderData();
            resetForm();
            toast.success(editId ? 'Updated successfully!' : 'Saved successfully!');

        } catch (error) {
            toast.error('Submit Failed');
            console.error(error);
        }
    };

    const handleEdit = (service: { id: number; mainTitle: string; captions: { caption: string }[] }) => {
        setEditId(service.id);
        setMainTitle(service.mainTitle);
        setCaptions(service.captions.map((c: any) => c.caption));
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        const formData = new FormData();
        formData.append('id', id.toString());
        try {
            await submitForm('/dashboard/customize-home/key-services/delete', formData, csrfToken);

            setKeyServices(prev => prev.filter(service => service.id !== id));
            if (editId === id) resetForm();
            toast.success('Deleted successfully!');

        } catch (error) {
            toast.error('Delete Failed');
            console.error(error);
        }
    };

    const handleCaptionChange = (index: number, value: string) => {
        const updated = [...captions];
        updated[index] = value;
        setCaptions(updated);
    };

    const addCaption = () => {
        setCaptions([...captions, '']);
    };

    const removeCaption = (index: number) => {
        setCaptions(captions.filter((_, i) => i !== index));
    };

    return (
        <div>
            <AdminLayout title="" isloading={loading}>
                {/* Key Services Section */}
                <div className="text-center pt-10 pb-10 border px-6 bg-[#0B0C10] rounded-lg">
                    <h2 className="text-4xl font-semibold mb-6 text-white">Our Key Services</h2>
                    <p className="text-blue-400 text-lg mb-8 max-w-3xl mx-auto">
                        Every great product starts with a solid process. Here's how we partner with you — from the first chat to long-term support.
                    </p>
                    <div className="flex justify-center mb-6 pb-6">
                        <button onClick={() => setShowModal(true)} className="bg-blue-600 px-4 py-2 rounded text-white font-semibold">
                            + Add Key Service
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white -mt-8">
                        {keyServices.map((service: any) => (
                            <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                                <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                                <p className="font-semibold text-2xl mb-2 -mt-10">{service.mainTitle}</p>
                                <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    {service.captions.map((caption: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> {caption.caption}</li>
                                    ))}
                                </ul>
                                <div className="flex space-x-4 justify-center mt-5">
                                    <button onClick={() => handleEdit(service)} className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
                                        <FiEdit className="mr-1" />
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(service.id)} className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition">
                                        <FiTrash2 className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg text-black">
                            <button onClick={resetForm} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold">×</button>
                            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Key Service</h2>
                            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                                <div>
                                    <label className="block font-medium mb-1">Main Title</label>
                                    <input
                                        type="text"
                                        value={mainTitle}
                                        onChange={(e) => setMainTitle(e.target.value)}
                                        className="w-full border rounded p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Captions</label>
                                    {captions.map((caption, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={caption}
                                                onChange={(e) => handleCaptionChange(index, e.target.value)}
                                                className="flex-1 border rounded p-2"
                                                required
                                            />
                                            <button type="button" onClick={() => removeCaption(index)} className="px-2 py-1 bg-red-500 text-white rounded">X</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addCaption} className="px-3 py-1 bg-blue-600 text-white rounded">+ Add Caption</button>
                                </div>

                                <div className="flex gap-3">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                        {editId ? 'Update' : 'Save'}
                                    </button>
                                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </div>
    );
}
