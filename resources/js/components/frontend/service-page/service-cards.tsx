import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion'; 

interface ServiceCard {
    id?: number;
    mainTitle: string;
    subTitle: string;
    captions: string[];
    src: string;
}

export default function ServiceCards() {
    const [cards, setCards] = useState<ServiceCard[]>([])
    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {

            const res = await fetch('/dashboard/customize-services/service-card/getServiceCardinfo');
            const data = await res.json();
            setCards(data);
        } catch (err) {
        }
    };

    return (
        <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                {/* Service Card with Animation */}
                {cards.map((card, i) => (
                    <motion.div
                        key={card.id}
                        className="bg-[#1F2833]  text-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src={card.src}
                                alt="service-icon"
                                className="w-14 h-14 object-contain"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold">{card.mainTitle}</h2>

                            </div>
                        </div>

                        {/* Middle caption */}
                        <div>
                            <p className="text-md text-gray-400 pt-1 pb-5">{card.subTitle}</p>
                        </div>

                        {/* Captions list */}
                        <ul className="text-sm text-gray-300 space-y-2 flex-1">
                            {card.captions.map((cap, j) => (
                                <li key={j} className="flex items-start gap-2">
                                    <MdCheckCircle className="text-blue-500 mt-0.5" />
                                    <span>{cap}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </>
    )
}
