import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

export default function CustomizeContactUsMainContent() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [loading, setLoading] = useState(false);
    const [contactData, setContactData] = useState<{
        mainCaption: string;
        email: string;
        phone: string;
        address: string;
    } | null>(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        mainCaption: '',
        email: '',
        phone: '',
        address: '',
    });

    const getContactData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/dashboard/customize-contact-us/main-content/getContactUsLeftSideContentinfo');
            const data = await res.json();
            if (data.email !== undefined) {
                setContactData(data);
                setForm({
                    mainCaption: data.mainCaption || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || '',
                });
            }
            else {
                setContactData(null);
            }
        } catch (err) {
            toast.error('Failed to load left side content');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getContactData();
    }, []);

    const handleSubmit = async () => {
        if (!form.mainCaption || !form.email || !form.phone || !form.address) {
            toast.error('All fields are required');
            return;
        }

        setLoading(true);
        const body = new FormData();
        body.append('mainCaption', form.mainCaption);
        body.append('email', form.email);
        body.append('phone', form.phone);
        body.append('address', form.address);

        const url = contactData
            ? '/dashboard/customize-contact-us/main-content/update'
            : '/dashboard/customize-contact-us/main-content/store';

        try {
            await submitForm(url, body, csrfToken);
            toast.success(`Contact info ${contactData ? 'updated' : 'created'} successfully!`);
            setEditing(false);
            getContactData();
        } catch (error) {
            toast.error('Failed to save contact info');
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="bg-[#0B0C10] text-white py-5 px-3 border rounded-lg">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="mb-6 text-lg dark:text-[#bbb]">{contactData?.mainCaption || 'Contact Us'}</p>
                {contactData ? (
                    <div className="space-y-6 text-md pt-3">
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Email:</p>
                                <a href="#" className="text-blue-600 hover:underline">
                                    {contactData.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Phone:</p>
                                <p>{contactData.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Address:</p>
                                <p>{contactData.address}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-gray-400">No contact information available.</p>
                    </div>
                )}

                <div className="flex justify-center items-center pt-10">
                    <button
                        onClick={() => setEditing(true)}
                        className="text-sm border border-blue-600 px-3 py-1.5 -mt-4 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition inline-flex items-center"
                    >
                        <FiEdit className="mr-1" />
                        {contactData ? 'Edit' : 'Add Contact Info'}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
                    <div className="bg-[#1f1f1f] text-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                        <h2 className="text-xl font-bold mb-4">{contactData ? 'Edit' : 'Add'} Contact Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Main Caption</label>
                                <input
                                    type="text"
                                    value={form.mainCaption}
                                    onChange={(e) => setForm({ ...form, mainCaption: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Phone</label>
                                <input
                                    type="text"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Address</label>
                                <textarea
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-6">
                            <button
                                onClick={() => setEditing(false)}
                                className="px-4 py-2 rounded border border-gray-500 text-gray-300 hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {contactData ? 'Update' : 'Create'}
                            </button>
                        </div>
                        <button
                            onClick={() => setEditing(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
