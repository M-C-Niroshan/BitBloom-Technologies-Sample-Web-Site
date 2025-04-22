import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { LuSquareArrowDownRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";
export default function CustomizeKeyServices() {

    const [keyServices, setKeyServices] = useState<{ id: number; mainTitle: string; captions: { caption: string }[] }[]>([]);
    const [mainTitle, setMainTitle] = useState('');
    const [captions, setCaptions] = useState(['']);
    const [editId, setEditId] = useState<number | null>(null);

    // Load data on mount
    useEffect(() => {
        fetch('/dashboard/customize-home/key-services/getKeyServicesinfo')
            .then(res => res.json())
            .then(data => setKeyServices(data));
    }, []);

    const resetForm = () => {
        setMainTitle('');
        setCaptions(['']);
        setEditId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: { mainTitle: string; captions: string[]; id?: number | null } = {
            mainTitle,
            captions,
        };

        const url = editId
            ? '/dashboard/customize-home/key-services/update'
            : '/dashboard/customize-home/key-services/store';

        if (editId) payload.id = editId;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(() => {
                fetch('/dashboard/customize-home/key-services/getKeyServicesinfo')
                    .then(res => res.json())
                    .then(data => setKeyServices(data));

                resetForm();
            });
    };

    const handleEdit = (service: { id: number; mainTitle: string; captions: { caption: string }[] }) => {
        setEditId(service.id);
        setMainTitle(service.mainTitle);
        setCaptions(service.captions.map((c: any) => c.caption));
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        fetch('/dashboard/customize-home/key-services/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(() => {
                setKeyServices(prev => prev.filter(service => service.id !== id));
                if (editId === id) resetForm();
            });
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
            <AdminLayout title="Dashboard">
                {/* Key Services */}
                <div className="text-center pt-10 pb-10 border mt-5 px-6 bg-[#0B0C10]">
                    <h2 className="text-4xl font-semibold mb-6 text-white">Our Key Services</h2>
                    <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
                        Every great product starts with a solid process. Here's how we partner with you — from the first chat to long-term support.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white -mt-8">
                        {/* Web Development */}
                        <motion.div
                            className="flex-col h-full p-2 shadow-md rounded-lg"
                            initial={{ opacity: 0, x: +200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 ">
                                <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                                <p className="font-semibold text-2xl mb-2 -mt-10">Web Development</p>
                                <div className='border border-blue-600 w-3/4 mx-auto mb-4 '></div>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Responsive & SEO-optimized sites</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Custom CMS & admin panels</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> E-commerce & payment integration</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> RESTful APIs & third-party integration</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Fast loading & high-performance builds</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Cross-browser & device compatibility</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Ongoing support & feature enhancements</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Mobile App Development */}
                        <motion.div
                            className="flex-col h-full p-2 shadow-md rounded-lg"
                            initial={{ opacity: 0, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                                <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                                <p className="font-semibold text-2xl mb-2 -mt-10">Mobile App Development</p>
                                <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable infrastructure on AWS & GCP</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Dockerized deployment pipelines</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> CI/CD setup for rapid delivery</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Automated backups & monitoring</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> High availability & disaster recovery</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> API management & microservices support</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Security best practices & compliance</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Cloud Solutions */}
                        <motion.div
                            className="flex-col h-full p-2 shadow-md rounded-lg"
                            initial={{ opacity: 0, x: -200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                                <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                                <p className="font-semibold text-2xl mb-2 -mt-10">Cloud Solutions</p>
                                <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable infrastructure on AWS & GCP</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Dockerized deployment pipelines</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> CI/CD setup for rapid delivery</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Automated backups & monitoring</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> High availability & disaster recovery</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> API management & microservices support</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Security best practices & compliance</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>



                <div className="p-6 max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Key Service</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded text-black">
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
                                    <button
                                        type="button"
                                        onClick={() => removeCaption(index)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCaption}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                                + Add Caption
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                {editId ? 'Update' : 'Save'}
                            </button>
                            {editId && (
                                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-2">Key Services</h3>
                        {keyServices.map((service: any) => (
                            <div key={service.id} className="border rounded p-4 mb-4 bg-white">
                                <div className="flex justify-between">
                                    <h4 className="text-md font-semibold">{service.mainTitle}</h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
                                    {service.captions.map((caption: any) => (
                                        <li key={caption.id}>{caption.caption}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </AdminLayout>
        </div>
    )
}
