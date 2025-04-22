import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import { FiTrash2 } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CustomizeFeedbacks() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Array<{
        id: number;
        fullName: string;
        role: string;
        companyName: string;
        caption: string;
        isShow: boolean;
        src: string;
    }>>([]);
    const [form, setForm] = useState<{
        fullName: string;
        role: string;
        companyName: string;
        caption: string;
        isShow: boolean;
        src: File | null;
    }>({
        fullName: '',
        role: '',
        companyName: '',
        caption: '',
        isShow: true,
        src: null,
    });

    const getFeedbacks = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-home/feedbacks/getFeedbacksinfo');
            const data = await res.json();
            setFeedbacks(data);
        }
        catch (error) {
            toast.error('Failed to load technology info');
            console.error(error);
        }
        finally {
            setLoading(false);
        }

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('fullName', form.fullName);
        formData.append('role', form.role);
        formData.append('companyName', form.companyName);
        formData.append('caption', form.caption);
        formData.append('isShow', form.isShow ? '1' : '0');
        if (form.src) {
            formData.append('src', form.src);
        }

        try {
            const res = await submitForm('/dashboard/customize-home/feedbacks/store', formData, csrfToken);
            setForm({ fullName: '', role: '', companyName: '', caption: '', isShow: true, src: null });
            getFeedbacks();
            toast.success("Technology added!");
        } catch (error) {
            toast.error('Error submitting form');
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        const formData = new FormData();
        formData.append('id', id.toString());
        try {
            await submitForm('/dashboard/customize-home/feedbacks/delete', formData, csrfToken);
            getFeedbacks();
            toast.success("Deleted successfully!");
        } catch (error) {
            toast.error('Delete Failed');
            console.error(error);
        }
    };

    const handleToggleVisibility = async (id: number, isCurrentlyVisible: boolean) => {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('isShow', form.isShow ? '1' : '0');
        formData.append('isShow', isCurrentlyVisible ? '0' : '1');

        try {
            await submitForm('/dashboard/customize-home/feedbacks/update', formData, csrfToken);
            getFeedbacks();
            toast.success("Visibility updated!");
        } catch (error) {
            toast.error("Failed to update visibility");
            console.error(error);
        }
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <AdminLayout title="" isloading={loading}>

            {/* Feedbacks */}
            <div className="py-20 pt-10 px-6 text-center bg-[#0B0C10] border rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h4 className="text-4xl font-semibold mb-6 text-white">Manage Client Feedbacks</h4>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {feedbacks.map((client) => (
                        <div key={client.id} className="bg-[#1F2833] p-6 rounded-xl shadow-md relative text-left flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={client.src} alt={client.fullName} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold">{client.fullName}</p>
                                        <p className="text-sm text-gray-400">{client.role}, {client.companyName}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic mb-6">“{client.caption}”</p>
                            </div>

                            <div className="mt-auto flex justify-center gap-4">
                                <button
                                    onClick={() => handleToggleVisibility(client.id, client.isShow)}
                                    className={`inline-flex items-center px-3 py-1.5 text-sm rounded transition ${client.isShow
                                        ? 'bg-green-700 text-white hover:bg-green-800'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }`}
                                >
                                    {client.isShow ? <FaCheckCircle className="mr-2" /> : <FaCheckCircle className="mr-2 opacity-30" />}
                                    {client.isShow ? 'Visible' : 'Hidden'}
                                </button>

                                <button
                                    onClick={() => handleDelete(client.id)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                                >
                                    <FiTrash2 className="mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </AdminLayout>
    );
}
