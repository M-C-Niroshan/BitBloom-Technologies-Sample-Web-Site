import { useEffect, useState } from "react";
import AdminLayout from '@/layouts/admin/admin-layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { submitForm } from '@/utility/submitForm';
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { FiEdit } from 'react-icons/fi';
import { fetchData } from '@/utility/fetchData';
import toast from 'react-hot-toast';


export default function CustomizeMaiHeader() {

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [headerData, setHeaderData] = useState({
        mainTitle: '',
        middleTitle: '',
        headquartersAddress: '',
        businessInquiriesAddress: '',
    });

    const [formData, setFormData] = useState({ ...headerData });

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        setLoading(true);
        try {
            const data = await fetchData('/dashboard/customize-home/customize-home-main-header/getheaderinfo');
            setHeaderData(data);
            setFormData(data);
        } catch (error) {
            toast.error('Failed to load header info');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const handleUpdate = async () => {
        const body = new FormData();
        body.append('mainTitle', formData.mainTitle);
        body.append('middleTitle', formData.middleTitle);
        body.append('headquartersAddress', formData.headquartersAddress);
        body.append('businessInquiriesAddress', formData.businessInquiriesAddress);

        try {
            await submitForm('/dashboard/customize-home/customize-home-main-header/update', body, csrfToken);
            toast.success('Header updated successfully!');
            setShowModal(false);
            loadHeaderData();
        } catch (error) {
            toast.error('Update failed');
            console.error(error);
        }
    };

    return (
        <div>
            <AdminLayout title="">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="relative">
                        <div className='border border-gray-700 p-6 rounded-lg shadow-sm relative bg-gray-900'>

                            {/* Main And Middle Titles */}
                            <h1 className="text-4xl font-bold mb-4 text-gray-100">
                                {headerData.mainTitle || 'Welcome to BitBloom Technologies'}
                            </h1>

                            <p className="text-lg mb-6 text-gray-300">
                                {headerData.middleTitle || `We provide cutting-edge software solutions to help your business thrive in the digital world.
    From web and mobile development to cloud integration, we turn ideas into scalable, secure, and elegant systems.`}
                            </p>

                            {/* Company Contact Info */}
                            <div className="mb-6 text-sm text-gray-400 space-y-4">
                                <div className="flex items-start gap-2">
                                    <FaLocationDot className="text-blue-400 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-200">Headquarters:</p>
                                        <p>{headerData.headquartersAddress || 'BitBloom Technologies, 225/SK, Colombo 12, Sri Lanka'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <MdAlternateEmail className="text-blue-400 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-200">Business Inquiries:</p>
                                        <p>
                                            <a
                                                href={`mailto:${headerData.businessInquiriesAddress}`}
                                                className="hover:underline text-blue-300"
                                            >
                                                {headerData.businessInquiriesAddress || 'info@bitbloomtec.com'}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Right Edit Button */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="absolute bottom-4 right-4 inline-flex items-center px-4 py-2 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
                            >
                                <FiEdit className="mr-1" />
                                Edit
                            </button>

                        </div>


                        {showModal && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 text-black">
                                <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-lg">
                                    <h2 className="text-xl font-semibold mb-4">Edit Header Info</h2>

                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Main Title</label>
                                        <input
                                            type="text"
                                            value={formData.mainTitle}
                                            onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Middle Title</label>
                                        <textarea
                                            rows={3}
                                            value={formData.middleTitle}
                                            onChange={(e) => setFormData({ ...formData, middleTitle: e.target.value })}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Headquarters Address</label>
                                        <input
                                            type="text"
                                            value={formData.headquartersAddress}
                                            onChange={(e) => setFormData({ ...formData, headquartersAddress: e.target.value })}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Business Inquiries Address</label>
                                        <input
                                            type="email"
                                            value={formData.businessInquiriesAddress}
                                            onChange={(e) => setFormData({ ...formData, businessInquiriesAddress: e.target.value })}
                                            className="w-full border p-2 rounded"
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
                                            onClick={handleUpdate}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}


            </AdminLayout>
        </div>
    )
}
