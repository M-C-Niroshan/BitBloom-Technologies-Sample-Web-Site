import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <>
                        {/* Testimonials Section */}
                        <div className="mt-10 px-6 py-10 bg-[#0B0C10] text-white text-center border">
                        <h3 className="text-4xl font-bold mb-10">What Our Clients Say</h3>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                            {[
                                {
                                    name: "Jane Doe",
                                    title: "CEO, Company Siyera",
                                    quote: "BitBloom Technologies helped us transform our business with their innovative solutions.",
                                    img: "/images/testimonials/user1.jpeg",
                                },
                                {
                                    name: "Michael Lee",
                                    title: "CTO, TechNova Inc.",
                                    quote: "The team’s attention to detail and timely delivery exceeded our expectations.",
                                    img: "/images/testimonials/user2.webp",
                                },
                                {
                                    name: "Ayesha Fernando",
                                    title: "Project Manager, CloudPoint",
                                    quote: "Highly professional and easy to work with. They truly understand scalable architecture.",
                                    img: "/images/testimonials/user3.jpg",
                                },
                            ].map((client, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-[#1F2833] p-6 rounded-xl shadow-md text-left"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={client.img} alt={client.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold">{client.name}</p>
                                            <p className="text-sm text-gray-400">{client.title}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic">“{client.quote}”</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
    </>
  )
}
