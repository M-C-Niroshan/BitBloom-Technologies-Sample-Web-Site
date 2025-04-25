import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LeftSideContent() {
    const [contactData, setContactData] = useState<{
        mainCaption: string;
        email: string;
        phone: string;
        address: string;
    } | null>(null);

    const getContactData = async () => {
        try {
            const res = await fetch('/dashboard/customize-contact-us/main-content/getContactUsLeftSideContentinfo');
            const data = await res.json();
            setContactData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getContactData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="mb-6 text-lg dark:text-[#bbb]">{contactData?.mainCaption || 'Contact Us'}</p>

            <div className="space-y-6 text-md pt-3">
                <div className="flex items-center gap-4 ">
                    <FaEnvelope className="text-blue-600" />
                    <div>
                        <p className="font-semibold">Email:</p>
                        <a href={`mailto:${contactData?.email}`} className="text-blue-600 hover:underline">
                            {contactData?.email}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <FaPhoneAlt className="text-blue-600" />
                    <div>
                        <p className="font-semibold">Phone:</p>
                        <p>{contactData?.phone || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <div>
                        <p className="font-semibold">Address:</p>
                        <p>{contactData?.address}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
