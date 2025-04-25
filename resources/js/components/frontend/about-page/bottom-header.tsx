import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderData {
    id?: string;
    mainTitle?: string;
    subTitle?: string;
    notExists?: boolean;
}
export default function BottomHeader() {

    const [headerData, setHeaderData] = useState<HeaderData | null>(null);


    useEffect(() => {
        getHeaderContent();
    }, []);

    const getHeaderContent = async () => {
        try {

            const res = await fetch('/dashboard/customize-about/bottom-header/getAboutUsBottomHeaderinfo');
            const data = await res.json();
            setHeaderData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-4xl font-semibold mb-6">{headerData?.mainTitle || 'Why Choose Us?'}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {headerData?.subTitle || ' With over 10 years of experience, we combine technical expertise with a customer-centric approach to deliver cutting-edge solutions that drive success. Our team is dedicated to excellence, and we are here to help you transform your business through technology.'}
            </p>
        </motion.div>
    )
}
