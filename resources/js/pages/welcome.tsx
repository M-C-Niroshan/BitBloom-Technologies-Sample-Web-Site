import { useState, useEffect } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Header } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { LuSquareArrowDownRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaPencilRuler, FaCode, FaVial, FaRocket, FaLifeRing } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { FaDocker } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiMysql } from "react-icons/si";

import { MdFactory } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

import { MdCheckCircle } from "react-icons/md";

import { FaArrowUp } from 'react-icons/fa';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isVisible, setIsVisible] = useState(false);

    // Update your slides data to include captions
    const slides = [
        {
            src: '/images/slide_show/slide_show_1.jpeg',
            caption: 'Innovating Together — Tailored Tech for Your Vision',
        },
        {
            src: '/images/slide_show/slide_show_2.webp',
            caption: 'Empowering Ideas Through Seamless Solutions',
        },
        {
            src: '/images/slide_show/slide_show_3.webp',
            caption: 'Where Technology Meets Simplicity and Style',
        },
        {
            src: '/images/slide_show/slide_show_4.webp',
            caption: 'A Team That Cares. A Process That Works.',
        },
        {
            src: '/images/slide_show/slide_show_6.jpg',
            caption: 'Creating Mobile Experiences People Love',
        },
        {
            src: '/images/slide_show/slide_show_7.jpg',
            caption: 'Smart Cloud Solutions Built for Scalability',
        },
        {
            src: '/images/slide_show/slide_show_8.jpg',
            caption: 'Driven by Purpose. Powered by Innovation.',
        },
    ]


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
    // Icons Array
    const techIcons = [
        { icon: <FaReact size={55} className="text-blue-500" />, label: "React" },
        { icon: <FaNode size={55} className="text-green-600" />, label: "Node.js" },
        { icon: <FaLaravel size={55} className="text-red-500" />, label: "Laravel" },
        { icon: <FaFlutter size={55} className="text-sky-400" />, label: "Flutter" },
        { icon: <FaDocker size={55} className="text-blue-700" />, label: "Docker" },
        { icon: <FaAws size={55} className="text-orange-500" />, label: "AWS" },
        { icon: <IoLogoFirebase size={55} className="text-yellow-500" />, label: "Firebase" },
        { icon: <SiMysql size={55} className="text-blue-600" />, label: "MySQL" },
    ];
    const company_team = [
        {
            name: "Nirushan Perera",
            role: "Co-Founder & CTO",
            img: "/images/team/nirushan.jpeg",
        },
        {
            name: "Sajith Ranasinghe",
            role: "Lead Frontend Engineer",
            img: "/images/team/sajith.jpg",
        },
        {
            name: "Tharushi Weerasinghe",
            role: "UI/UX Designer",
            img: "/images/team/tharushi.jpg",
        },
        {
            name: "Roshan Silva",
            role: "Backend Developer",
            img: "/images/team/roshan.jpg",
        },
        {
            name: "Nimali Jayasinghe",
            role: "UI/UX Designer",
            img: "/images/team/Nimali.jpg",
        },
        {
            name: "Bankuka Silva",
            role: "Backend Developer",
            img: "/images/team/Bankuka.jpg",
        },

        {
            name: "Shehara Senevirathna",
            role: "UI/UX Designer",
            img: "/images/team/Shehara.jpg",
        },
        {
            name: "Niroshan Preapa",
            role: "Backend Developer",
            img: "/images/team/Niroshan.jpg",
        },
    ];

    useEffect(() => {
        // Show or hide the button based on scroll position
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Head title="BitBloom Technologies">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <Header />

                <main className="flex-1 px-6 py-12 w-full mx-auto">
                    {/* Slideshow and description side by side */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                        {/* Slideshow Left Side */}
                        <div className="w-full md:w-1/2 max-w-xl rounded overflow-hidden shadow-lg relative">
                            <Fade
                                duration={2000}
                                transitionDuration={500}
                                arrows={false}
                                autoplay={true}
                                infinite={true}
                                indicators={false}
                            >
                                {slides.map((slide, index) => (
                                    <div key={index} className="each-slide-effect relative">
                                        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sx px-4 py-8 z-10">
                                            {slide.caption}
                                        </div>
                                        <img
                                            src={slide.src}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-[350px] "
                                        />
                                    </div>
                                ))}
                            </Fade>
                        </div>


                        {/* Description Right Side of the slide-show*/}
                        <motion.div
                            className="w-full md:w-1/2 text-center md:text-left"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-4xl font-bold mb-4">Welcome to BitBloom Technologies</h1>

                            <p className="text-lg mb-6">
                                We provide cutting-edge software solutions to help your business thrive in the digital world.
                                From web and mobile development to cloud integration, we turn ideas into scalable, secure, and elegant systems.
                            </p>

                            {/* Company Contact Info */}
                            <div className="mb-6 text-sm text-gray-600 space-y-3">
                                <div className="flex items-start gap-2">
                                    <FaLocationDot className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Headquarters:</p>
                                        <p>BitBloom Technologies, 225/SK, Colombo 12, Sri Lanka</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <MdAlternateEmail className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Business Inquiries:</p>
                                        <p>
                                            <a href="mailto:info@bitbloomtec.com" className="hover:underline">
                                                info@bitbloomtec.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-x-4">
                                <Link
                                    href="/services"
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg inline-block"
                                >
                                    Explore Our Services
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-gray-600 hover:bg-gray-700 transition text-white px-6 py-2 rounded-lg inline-block"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Our Team Section */}
                    <div className="pt-20 pb-10 px-6 text-center bg-[#0B0C10] border-b border-gray-800 border">
                        <h2 className="text-4xl font-extrabold text-white mb-4">Meet Our Team</h2>
                        <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
                            Our dedicated professionals bring passion, expertise, and innovation to every project.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                            {company_team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center bg-[#1F2833] rounded-xl p-6 shadow-lg hover:shadow-blue-600/30 transition-shadow duration-300"
                                >
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-24 h-24 object-cover rounded-full border-4 border-blue-600 mb-4"
                                    />
                                    <h4 className="text-white text-lg font-semibold">{member.name}</h4>
                                    <p className="text-sm text-gray-400">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

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
                        {/* Solution Areas */}
                        <motion.div
                            className="flex-col h-full p-2 shadow-md rounded-lg"
                            initial={{ opacity: 0, x: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-col h-full border rounded-xl shadow-lg p-6 bg-[#1F2833]">
                                <div className="text-center mb-6">
                                    <h4 className="text-4xl font-semibold mb-6 text-white">Solution Areas</h4>
                                </div>

                                {/* Solution Area Icons */}
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                                    {/* Manufacturing */}
                                    <div className="flex-col p-4">
                                        <MdFactory size={40} className="text-blue-500 mb-4 mx-auto" />
                                        <p className="text-white text-lg">Manufacturing</p>
                                    </div>

                                    {/* Logistics */}
                                    <div className="flex-col p-4">
                                        <FaShippingFast size={40} className="text-blue-500 mb-4 mx-auto" />
                                        <p className="text-white text-lg">Logistics</p>
                                    </div>

                                    {/* Digital and Telecommunications */}
                                    <div className="flex-col p-4">
                                        <FaMobileAlt size={40} className="text-blue-500 mb-4 mx-auto" />
                                        <p className="text-white text-lg">Digital & Telecommunications</p>
                                    </div>

                                    {/* Finance and Banking */}
                                    <div className="flex-col p-4">
                                        <FaPiggyBank size={40} className="text-blue-500 mb-4 mx-auto" />
                                        <p className="text-white text-lg">Finance & Banking</p>
                                    </div>

                                    {/* IOT */}
                                    <div className="flex-col p-4">
                                        <MdDevices size={40} className="text-blue-500 mb-4 mx-auto" />
                                        <p className="text-white text-lg">IoT</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    {/* Technology Stack Section */}
                    <div className="py-20 pt-10 px-6 text-center mt-5 bg-[#0B0C10] border">
                        <h2 className="text-4xl font-semibold mb-10 text-white">Technologies We Work With</h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-10 justify-center items-center">
                            {techIcons.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center justify-center h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                        {tech.icon}
                                    </div>
                                    <span className="mt-2 text-sm font-medium text-gray-300 group-hover:text-blue-600">
                                        {tech.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>



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
                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className={`fixed bottom-6 right-12 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100' : 'opacity-0'} ${isVisible ? 'scale-100' : 'scale-75'}`}>
                        <FaArrowUp size={24} />
                    </button>
                </main>

                <MainFooter />
            </div>
        </>
    );
}
