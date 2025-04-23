import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CustomizeTechnologies() {
    const [loading, setLoading] = useState(false);
    const [technologies, setTechnologies] = useState<any[]>([]);
    const [newTech, setNewTech] = useState({ caption: '', file: null as File | null });
    const [showModal, setShowModal] = useState(false);

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    useEffect(() => {
        loadTechData();
    }, []);

    const loadTechData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-home/solution-area/getTechnologiesinfo');
            const data = await res.json();
            setTechnologies(data);
        } catch (error) {
            toast.error('Failed to load technology info');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTech = async () => {
        if (!newTech.caption || !newTech.file) {
            toast.error("Please provide both title and image.");
            return;
        }

        const formData = new FormData();
        formData.append("caption", newTech.caption);
        formData.append("src", newTech.file);

        try {
            await submitForm('/dashboard/customize-home/technologies/store', formData, csrfToken);
            setShowModal(false);
            setNewTech({ caption: '', file: null });
            loadTechData();
            toast.success("Technology added!");
        } catch (error) {
            toast.error('Add Failed');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this technology?')) return;
        const formData = new FormData();
        formData.append('id', id.toString());

        try {
            await submitForm('/dashboard/customize-home/technologies/delete', formData, csrfToken);
            loadTechData();
            toast.success("Deleted successfully!");
            setTechnologies(technologies.filter(t => t.id !== id));
        } catch (error) {
            toast.error('Delete Failed');
            console.error(error);
        }
    };

    const openModal = () => {
        setNewTech({ caption: '', file: null });
        setShowModal(true);
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="py-20 pt-5 px-6 text-center bg-[#0B0C10] border rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h4 className="text-3xl font-semibold mb-6 text-white">Technologies We Work With</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {technologies.map((tech) => (
                        <div key={tech.id} className="flex flex-col items-center justify-center p-2 relative border pb-3">
                            <img src={tech.src} alt={tech.caption} className="w-16 h-16 object-contain" />
                            <p className="text-white text-lg mt-2">{tech.caption}</p>
                            <button onClick={() => handleDelete(tech.id)} className="inline-flex items-center px-3 py-1.5 mt-3 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition">
                                <FiTrash2 className="mr-1" />
                                Delete
                            </button>
                        </div>
                    ))}

                    <div onClick={openModal} className="cursor-pointer flex flex-col justify-center items-center p-4 border border-dashed border-blue-400 text-white hover:bg-blue-800 transition rounded">
                        <span className="text-4xl">+</span>
                        <p className="mt-2 text-sm">Add Technology</p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 space-y-4 text-black">
                        <h3 className="text-xl font-bold mb-2">Add Technology</h3>

                        <input
                            type="text"
                            placeholder="Technology Title"
                            value={newTech.caption}
                            onChange={(e) => setNewTech({ ...newTech, caption: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <label className="w-full flex flex-col items-center justify-center p-4 border rounded cursor-pointer hover:bg-gray-100">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewTech({ ...newTech, file: e.target.files?.[0] || null })}
                                className="hidden"
                            />
                            {newTech.file ? (
                                <img src={URL.createObjectURL(newTech.file)} className="h-20 object-contain" />
                            ) : (
                                <>
                                    <span className="text-3xl text-gray-400">+</span>
                                    <p className="text-sm text-gray-600">Select Image</p>
                                </>
                            )}
                        </label>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleAddTech} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
