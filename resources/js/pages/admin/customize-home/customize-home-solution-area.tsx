import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CustomizeSolutionArea() {
    const [loading, setLoading] = useState(false);
    const [solutionAreas, setSolutionAreas] = useState<any[]>([]);
    const [newArea, setNewArea] = useState({ caption: '', file: null as File | null });
    const [showModal, setShowModal] = useState(false);

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-home/solution-area/getSolutionAreainfo');
            const data = await res.json();
            setSolutionAreas(data);
        } catch (error) {
            toast.error('Failed to load Solution Area info');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddArea = async () => {
        if (!newArea.caption || !newArea.file) {
            toast.error("Please provide both caption and image.");
            return;
        }

        const formData = new FormData();
        formData.append("caption", newArea.caption);
        formData.append("src", newArea.file);

        try {
            const res = await submitForm('/dashboard/customize-home/solution-area/store', formData, csrfToken)
            setShowModal(false);
            loadHeaderData()
            toast.success("Added successfully!");
        }
        catch (error) {
            toast.error('Submit Failed');
            console.error(error);
        }

    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this Solution Area?')) return;
        const formData = new FormData();
        formData.append('id', id.toString());

        try {
            await submitForm(`/dashboard/customize-home/solution-area/delete`, formData, csrfToken);
            toast.success("Deleted successfully!");
            setSolutionAreas(solutionAreas.filter(area => area.id !== id));
        } catch (error) {
            toast.error('Delete Failed');
            console.error(error);
        }
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="flex-col h-full border rounded-xl shadow-lg p-6 bg-[#0B0C10]">
                <div className="text-center mb-6">
                    <h4 className="text-3xl font-semibold mb-6 text-white">Solution Areas</h4>
                </div>

                {/* Solution Areas Display */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {solutionAreas.map((area) => (
                        <div key={area.id} className="flex-col relative p-4 border">
                            <img src={area.src} alt={area.caption} className="w-14 h-14 mx-auto mb-4 object-contain" />
                            <p className="text-white text-lg">{area.caption}</p>
                            <button onClick={() => handleDelete(area.id)} className="inline-flex items-center px-3 py-1.5 mt-3 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition">
                                <FiTrash2 className="mr-1" />
                                Delete
                            </button>
                        </div>
                    ))}

                    {/* Add New Block */}
                    <div onClick={() => {
                        setNewArea({ caption: '', file: null });
                        setShowModal(true);
                    }} className="cursor-pointer flex flex-col justify-center items-center p-4 border border-dashed border-blue-400 text-white hover:bg-blue-800 transition rounded">
                        <span className="text-4xl">+</span>
                        <p className="mt-2 text-sm">Add New</p>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 space-y-4 text-black">
                        <h3 className="text-xl font-bold mb-2">Add Solution Area</h3>

                        <input
                            type="text"
                            placeholder="Caption"
                            value={newArea.caption}
                            onChange={(e) => setNewArea({ ...newArea, caption: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <label className="block w-full border p-2 rounded text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewArea({ ...newArea, file: e.target.files?.[0] || null })}
                                className="hidden"
                            />
                            {newArea.file ? (
                                <img src={URL.createObjectURL(newArea.file)} className="h-20 object-contain mx-auto" />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <span className="text-3xl">+</span>
                                    <p>Select Image</p>
                                </div>
                            )}
                        </label>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleAddArea} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
