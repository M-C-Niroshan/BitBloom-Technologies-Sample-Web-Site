import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import Slider from '@/components/frontend/home-page/sub-component/slider';
import { fetchData } from '@/utility/fetchData';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';

export default function Customizeslider() {
    const [showModal, setShowModal] = useState(false);
    const [sliders, setSliders] = useState<{ src: string; caption: string }[]>([]);
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

    const handleSave = async () => {
        if (!image || !description) return;

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            await submitForm('/dashboard/customize-home/slider/store', formData, csrfToken);

            toast.success('Slider added successfully!');

            // Reset after success
            setShowModal(false);
            setImage(null);
            setDescription('');
        } catch (error) {
            toast.error('Failed to add slider. Please try again.');
            console.error('Error adding slider:', error);
        }
    };

    return (
        <div>
            <AdminLayout title="">
                <div className=" w-full">
                    <Slider />
                    <div className="flex pt-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Add New Slider
                        </button>
                    </div>
                </div>

                <div className="mt-3 pb-3 border rounded-md overflow-hidden">
                    <div className="max-h-80 overflow-y-auto">
                        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
                            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 z-10">
                                <tr>
                                    <th className="border-b px-4 py-3 sticky top-0 bg-inherit">Image</th>
                                    <th className="border-b px-4 py-3 sticky top-0 bg-inherit">Description</th>
                                </tr>
                            </thead>
                            <tbody className="border">
                                {sliders.map((slider, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="border-b px-4 py-2">
                                            <img
                                                src={slider.src}
                                                alt="Slider"
                                                className="w-20 h-14 object-cover rounded shadow"
                                            />
                                        </td>
                                        <td className="border-b px-4 py-2">{slider.caption}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 text-black">
                        <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Add New Slider</h2>

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
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!image || !description.trim()}
                                    className={`px-4 py-2 rounded text-white ${!image || !description.trim()
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </AdminLayout>
        </div>
    );
}
