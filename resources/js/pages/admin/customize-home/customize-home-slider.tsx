import { useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import SliderArea from '@/components/frontend/home-page/slider-area';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';

export default function Customizeslider() {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    const handleSave = async () => {
        if (!image || !description) return;

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            const result = await submitForm('/dashboard/customize-home/slider/store', formData, csrfToken);

            toast.success('Slider added successfully!');

            // Reset after success
            setShowModal(false);
            setImage(null);
            setDescription('');
        } catch (error) {
            toast.error('Failed to add slider. Please try again.');
        }
    };

    return (
        <div>
            <AdminLayout title="">
                <div className="flex flex-col gap-4 w-full border">
                    <SliderArea admin_mode={true} />
                </div>

                <p className="text-2xl font-bold mt-4 mb-4 pt-3">
                    Customize Home Page Slider
                </p>

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add New Slider
                    </button>
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
