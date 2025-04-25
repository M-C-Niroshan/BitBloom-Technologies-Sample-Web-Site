import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';

interface HeaderData {
    id?: string;
    mainTitle?: string;
    subTitle?: string;
    notExists?: boolean;
}

export default function CustomizeMainHeader() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [loading, setLoading] = useState(false);
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<HeaderData>({});

    useEffect(() => {
        getHeaderContent();
    }, []);

    const getHeaderContent = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-services/main-header/getMainHeadercontent');
            const data = await res.json();
            setHeaderData(data);
            setFormData(data || {});
        } catch (error) {
            toast.error('Failed to load header content');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => setEditing(true);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        if (!formData.mainTitle || !formData.subTitle) {
            toast.error('All fields are required');
            return;
        }

        const body = new FormData();
        body.append('mainTitle', formData.mainTitle);
        body.append('subTitle', formData.subTitle);
        console.log(headerData)
        const url = headerData?.id
            ? '/dashboard/customize-services/main-header/update'
            : '/dashboard/customize-services/main-header/store';

        try {
            await submitForm(url, body, csrfToken);
            toast.success(`Header ${headerData ? 'updated' : 'created'} successfully!`);
            setEditing(false);
            getHeaderContent();
        } catch (error) {
            toast.error('Failed to save header content');
            console.error(error);
        }
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="bg-[#0B0C10] text-white py-10 border rounded-lg">
                <h1 className="text-3xl font-extrabold mb-12 text-[#1b1b18] dark:text-[#EDEDEC] text-center">
                    {headerData?.mainTitle || 'About BitBloom Technologies'}
                </h1>
                <p className="text-lg mb-8 text-[#555] dark:text-[#bbb] max-w-2xl mx-auto">
                    {headerData?.subTitle || 'We offer a range of solutions designed to help your business grow. Each of our services is built with a focus on efficiency, performance, and user experience.'}
                </p>
                <div className="text-center pt-2">
                    <button
                        onClick={handleEdit}
                        className="text-sm border border-blue-600 px-3 py-1.5 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition inline-flex items-center"
                    >
                        <FiEdit className="mr-1" />
                        {headerData?.notExists === true ? 'Add Header Content' : 'Edit'}
                    </button>
                </div>
            </div>

            {editing && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded w-[95%] max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">{headerData ? 'Edit Header Content' : 'Add Header Content'}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-semibold">Main Title</label>
                                <input
                                    type="text"
                                    name="mainTitle"
                                    value={formData.mainTitle || ''}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Sub Title</label>
                                <input
                                    type="text"
                                    name="subTitle"
                                    value={formData.subTitle || ''}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
