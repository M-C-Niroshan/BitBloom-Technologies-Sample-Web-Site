import { motion } from "framer-motion";
import { FaRegLightbulb, FaPencilRuler, FaCode, FaVial, FaRocket, FaLifeRing } from 'react-icons/fa';

export default function ProductionProcessSection() {
  const steps = [
    {
      title: "Plan",
      icon: <FaRegLightbulb size={28} />,
      desc: "We start by understanding your goals, ideas, and challenges to craft the right solution."
    },
    {
      title: "Design",
      icon: <FaPencilRuler size={28} />,
      desc: "Our design team creates clean, modern, and user-friendly interfaces you'll love."
    },
    {
      title: "Develop",
      icon: <FaCode size={28} />,
      desc: "We build your project using efficient, scalable code and the latest technologies."
    },
    {
      title: "Test",
      icon: <FaVial size={28} />,
      desc: "Every feature is thoroughly tested to ensure smooth, error-free performance."
    },
    {
      title: "Deliver",
      icon: <FaRocket size={28} />,
      desc: "Once everything's perfect, we launch your product and ensure it runs flawlessly."
    },
    {
      title: "Support",
      icon: <FaLifeRing size={28} />,
      desc: "We stay with you for updates, support, and new ideas as your business grows."
    },
  ];
  return (
    <>
      {/* Production process */}
      <div className="py-20 pt-10 pb-10 px-6 text-center bg-[#0B0C10] border mt-5 ">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          How We Turn Your Vision Into Reality
        </h2>
        <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
          Every great product starts with a solid process. Here's a look at how we work with you — from the first chat to long-term support.
        </p>

        <div className="relative">
          <div className="flex flex-wrap justify-between relative z-10 ">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-white w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-16"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white shadow-md p-4 rounded-full text-blue-600 mb-4 cursor-pointer"
                >
                  {step.icon}
                </motion.div>
                <p className="text-xl font-bold mb-2">{step.title}</p>
                <p className="text-base text-gray-300 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}
