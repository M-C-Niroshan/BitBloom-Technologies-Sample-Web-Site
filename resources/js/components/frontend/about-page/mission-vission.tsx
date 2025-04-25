import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MissionVission() {
    const [content, setContent] = useState<{ mission: string; vision: string; ourValues: string[] } | null>(null);

    const getData = async () => {
        try {
            const res = await fetch('/dashboard/customize-about/mission-vision/getAboutUsMissionVisioninfo');
            const data = await res.json();
            setContent(data);
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Our Mission */}
            <motion.div
                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-lg">{content?.mission || 'Loading...'}</p>
            </motion.div>

            {/* Our Vision */}
            <motion.div
                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-lg">{content?.vision || 'Loading...'}</p>
            </motion.div>

            {/* Our Values */}
            <motion.div
                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
                <ul className="list-disc pl-5 text-lg">
                    {content?.ourValues?.length ? content.ourValues.map((v, i) => <li key={i}>{v}</li>) : <li>Loading...</li>}
                </ul>
            </motion.div>
        </div>
    )
}
