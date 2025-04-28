import { useState } from 'react';
import FrontEndLayout from '@/layouts/frontend/frontend-layout';
import { type SharedData } from '@/types';
import LeftSideContent from '../../components/frontend/contact-page/left-side-content';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { submitForm } from '@/utility/submitForm';
interface ContactProps {
    admin_mode?: boolean;
    title?: string;
}

export default function Contact({ admin_mode, title }: ContactProps) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const { auth } = usePage<SharedData>().props; // Get the current route from usePage
    const isLoggedIn = !!auth?.user;
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
    const [preview, setPreview] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            setButtonState('loading');
            const res = await submitForm('/dashboard/customize-home/feedbacks/store', formData, csrfToken);
            setForm({ fullName: '', role: '', companyName: '', caption: '', isShow: true, src: null });
            setButtonState('success');
            setTimeout(() => setButtonState('idle'), 5000);
            //display thank u page
        } catch (error) {
            //toast.error('Error submitting form');
            setButtonState('error');
            console.log("Feedback Submit error:", error)
            setTimeout(() => setButtonState('idle'), 3000);
        }
    };
    const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


    return (
        <>
            <FrontEndLayout admin_mode={admin_mode} title={title}>
                <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">

                    {/* Content */}
                    <div className="flex-1 max-w-6xl mx-auto bg-[#FDFDFC] dark:bg-[#0a0a0a] px-6 py-12 text-[#1b1b18] dark:text-[#EDEDEC]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Side: Contact Info */}
                            <LeftSideContent />

                            {/* Right Side: Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                                className="relative bg-[#F5F7FA] p-6 rounded-xl shadow-lg text-black"
                            >
                                {!isLoggedIn && (
                                    <div
                                        className="absolute inset-0 bg-black/15 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl"
                                        onClick={() => {
                                            const currentPath = window.location.pathname;
                                            window.location.href = route('login') + `?redirect=${currentPath}`;
                                        }}
                                    >
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Login to Send Message</button>
                                    </div>
                                )}

                                <div className={`${!isLoggedIn ? ' pointer-events-none select-none' : ''}`}>
                                    <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                                    <p className="mb-6 text-sm">Fill out the form below and we will get back to you shortly.</p>

                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                                            <input type="text"
                                                placeholder="Full Name"
                                                value={form.fullName}
                                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                                className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium">Role</label>
                                            <input type="text"
                                                placeholder="Role"
                                                value={form.role}
                                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="companyName" className="block text-sm font-medium">Company Name</label>
                                            <input type="text"
                                                placeholder="Company Name"
                                                value={form.companyName}
                                                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                                className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="profilePicture" className="block text-sm font-medium mb-2">Profile Picture</label>

                                            <div className="w-32 h-32 rounded-4xl border-2 border-dashed border-blue-600 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100 hover:opacity-80 transition"
                                                onClick={() => document.getElementById('profileInput')?.click()}>
                                                {preview ? (
                                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Plus className="text-blue-600 w-10 h-10" />
                                                )}
                                            </div>

                                            <input
                                                id="profileInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const file = e.target.files[0];
                                                        setForm({ ...form, src: file });
                                                        setPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                                className="hidden"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="caption" className="block text-sm font-medium">Caption</label>
                                            <textarea placeholder="Caption"
                                                value={form.caption}
                                                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                                                className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                            >

                                            </textarea>
                                        </div>


                                        <button
                                            type="submit"
                                            disabled={buttonState === 'loading'}
                                            className={`
        w-full p-3 rounded-lg transition transform duration-200 flex items-center justify-center gap-2
        ${buttonState === 'success' ? 'bg-green-600 text-white' :
                                                    buttonState === 'error' ? 'bg-red-600 text-white' :
                                                        'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'}
    `}
                                        >
                                            {buttonState === 'loading' && (
                                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            )}
                                            {buttonState === 'success' && (
                                                <>
                                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Submitted
                                                </>
                                            )}
                                            {buttonState === 'error' && (
                                                <>
                                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Error
                                                </>
                                            )}
                                            {buttonState === 'idle' && 'Send Message'}
                                        </button>

                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </FrontEndLayout>
        </>
    );
}
