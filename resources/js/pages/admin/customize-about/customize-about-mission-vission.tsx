import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FiEdit, FiX, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CustomizeMissionVission() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [content, setContent] = useState<{ mission: string; vision: string; ourValues: string[] } | null>(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ mission: '', vision: '', ourValues: [''] });
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-about/mission-vision/getAboutUsMissionVisioninfo');
            const data = await res.json();
            if (data.mission !== undefined) {
                setContent(data);
            }
            else {
                setContent(null);
            }
        } catch (error) {
            toast.error('Failed to load header content');
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number | null = null) => {
        if (index !== null) {
            const values = [...form.ourValues];
            values[index] = e.target.value;
            setForm({ ...form, ourValues: values });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const addValue = () => {
        setForm({ ...form, ourValues: [...form.ourValues, ''] });
    };

    const removeValue = (index: number) => {
        const values = [...form.ourValues];
        values.splice(index, 1);
        setForm({ ...form, ourValues: values });
    };

    const handleSubmit = async () => {
        if (!form.mission || !form.vision) {
            toast.error('Mission and Vision are required');
            return;
        }

        setLoading(true);

        const body = new FormData();
        body.append('mission', form.mission);
        body.append('vision', form.vision);
        form.ourValues.forEach((value, index) => {
            body.append(`ourValues[${index}]`, value);
        });

        const url = content
            ? '/dashboard/customize-about/mission-vision/update'
            : '/dashboard/customize-about/mission-vision/store';

        try {
            await submitForm(url, body, csrfToken);
            toast.success(`Mission & Vision ${content ? 'updated' : 'created'} successfully!`);
            setEditing(false);
            getData();
        } catch (error) {
            toast.error('Failed to save content');
            console.error(error);
        }

        setLoading(false);
    };


    return (
        <AdminLayout title="" isloading={loading}>
            {!content ? (
                <div className="text-center mt-10">
                    <button onClick={() => setEditing(true)} className="bg-blue-600 px-5 py-2 text-white rounded shadow">
                        + Add Mission & Vision
                    </button>
                </div>
            ) : (<>
                <div className="bg-[#0B0C10] text-white py-5 px-3 border rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <motion.div className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold">Our Mission</h3>

                            </div>
                            <p className="text-lg">{content.mission}</p>
                        </motion.div>

                        <motion.div className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold">Our Vision</h3>


                            </div>
                            <p className="text-lg">{content.vision}</p>
                        </motion.div>

                        <motion.div className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold">Our Values</h3>
                            </div>
                            <ul className="list-disc pl-5 text-lg">
                                {content.ourValues?.map((v, i) => <li key={i}>{v}</li>)}
                            </ul>
                        </motion.div>

                    </div>
                    <div className="flex justify-center items-center pt-2">
                        <button
                            onClick={() => { setEditing(true); setForm(content); }}
                            className="text-sm border border-blue-600 px-3 py-1.5 -mt-4 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition inline-flex items-center"
                        >
                            <FiEdit className="mr-1" />
                            Edit
                        </button>
                    </div>
                </div>
            </>
            )}

            {editing && (
                <div className="fixed inset-0 bg-black/60  z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl text-black relative">
                        <button onClick={() => setEditing(false)} className="absolute top-2 right-2 text-gray-500">
                            <FiX />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{content ? 'Edit Content' : 'Add Content'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Mission</label>
                                <textarea name="mission" value={form.mission} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Vision</label>
                                <textarea name="vision" value={form.vision} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Our Values</label>
                                {form.ourValues.map((val, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input type="text" value={val} onChange={(e) => handleChange(e, i)} className="w-full px-3 py-2 border rounded" />
                                        <button onClick={() => removeValue(i)} className="text-red-500"><FiTrash2 /></button>
                                    </div>
                                ))}
                                <button onClick={addValue} className="text-blue-600 text-sm mt-1 hover:underline">+ Add Value</button>
                            </div>
                            <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                                {content ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
