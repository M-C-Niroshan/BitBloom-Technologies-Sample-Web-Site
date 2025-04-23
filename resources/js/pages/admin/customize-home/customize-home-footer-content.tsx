import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

export default function CustomizeFooterContent() {
    const [loading, setLoading] = useState(false);
    interface FooterData {
        companyName?: string;
        leftSideCaption?: string;
        facebookURL?: string;
        twitterURL?: string;
        linkdinURL?: string;
        instagramURL?: string;
        headquartersAddress?: string;
        inquiriesMailAddress?: string;
        contactNumber?: string;
        bottomCaption?: string;
        notExists?: boolean;
        id?: string;
    }

    const [footerData, setFooterData] = useState<FooterData | null>(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<FooterData>({});
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    useEffect(() => {
        getFooterContent();
    }, []);

    const getFooterContent = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-home/getFootercontent');
            const data = await res.json();
            console.log(data)
            setFooterData(data);
            setFormData(data || {});
        }
        catch (error) {
            toast.error('Failed to load technology info');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleEdit = () => setEditing(true);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const body = new FormData();
        body.append('companyName', formData.companyName || '');
        body.append('leftSideCaption', formData.leftSideCaption || '');
        body.append('facebookURL', formData.facebookURL || '');
        body.append('twitterURL', formData.twitterURL || '');
        body.append('linkdinURL', formData.linkdinURL || '');
        body.append('instagramURL', formData.instagramURL || '');
        body.append('headquartersAddress', formData.headquartersAddress || '');
        body.append('inquiriesMailAddress', formData.inquiriesMailAddress || '');
        body.append('contactNumber', formData.contactNumber || '');
        body.append('bottomCaption', formData.bottomCaption || '');

        const url = footerData?.id
            ? '/dashboard/customize-home/footer-content/update'
            : '/dashboard/customize-home/footer-content/store';

        try {
            await submitForm(url, body, csrfToken);
            setEditing(false);
            getFooterContent();
            toast.success(`Footer ${footerData ? 'updated' : 'created'} successfully!`);
        } catch (error) {
            toast.error('Failed to save footer content');
            console.error(error);
        }
    };

    return (
        <AdminLayout title="">
            <div className="bg-[#0B0C10] text-white py-10 border rounded-lg">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">{footerData?.companyName || 'Company Name'}</h3>
                        <p className="text-sm mb-6">{footerData?.leftSideCaption || 'Company caption here...'}</p>
                        <button
                            onClick={handleEdit}
                            className="text-sm border border-blue-600 px-3 py-1.5 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition inline-flex items-center"
                        >
                            <FiEdit className="mr-1" />
                            {footerData?.notExists === true ? 'Add Footer Contents' : 'Edit'}
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:underline">Our Services</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4 text-blue-600">
                            <a href={footerData?.facebookURL || "#"} target="_blank"><FaFacebook size={24} /></a>
                            <a href={footerData?.twitterURL || "#"} target="_blank"><FaTwitter size={24} /></a>
                            <a href={footerData?.linkdinURL || "#"} target="_blank"><FaLinkedin size={24} /></a>
                            <a href={footerData?.instagramURL || "#"} target="_blank"><FaInstagram size={24} /></a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className='flex flex-col'>
                        <div className="text-sm text-gray-300 space-y-3">
                            <div className="flex items-start gap-2">
                                <FaLocationDot className="text-blue-600 mt-1" />
                                <div>
                                    <p className="font-semibold">Headquarters:</p>
                                    <p>{footerData?.headquartersAddress || "Address..."}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <MdAlternateEmail className="text-blue-600 mt-1" />
                                <div>
                                    <p className="font-semibold">Business Inquiries:</p>
                                    <p>{footerData?.inquiriesMailAddress || "email@example.com"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <FaPhoneAlt className="text-blue-600 mt-1" />
                                <div>
                                    <p className="font-semibold">Contact Number:</p>
                                    <p>{footerData?.contactNumber || "+000000000"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6 mt-8">
                    <p>{footerData?.bottomCaption || '© 2025 BitBloom Technologies. All Rights Reserved.'}</p>
                </div>
            </div>

            {/* Popup Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded w-[95%] max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">{footerData ? 'Edit Footer Content' : 'Add Footer Content'}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ['companyName', 'Company Name'],
                                ['leftSideCaption', 'Left Caption'],
                                ['facebookURL', 'Facebook URL'],
                                ['twitterURL', 'Twitter URL'],
                                ['linkdinURL', 'LinkedIn URL'],
                                ['instagramURL', 'Instagram URL'],
                                ['headquartersAddress', 'Headquarters Address'],
                                ['inquiriesMailAddress', 'Email Address'],
                                ['contactNumber', 'Phone Number'],
                                ['bottomCaption', 'Bottom Caption'],
                            ].map(([key, label]) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold">{label}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        required
                                        value={String(formData[key as keyof FooterData] || '')}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
