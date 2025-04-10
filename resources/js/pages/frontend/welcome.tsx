import { useState, useEffect } from 'react';

import FrontEndLayout from '@/layouts/frontend/frontend-layout';

import SliderArea from '@/components/frontend/slider-area';
import OurTeamSection from '@/components/frontend/our-team-section';
import ProductionProcessSection from '@/components/frontend/production-process-section';
import KeyServiceSection from '@/components/frontend/key-service-section';
import TechnologiesSection from '@/components/frontend/technologies-section';
import TestimonialsSection from '@/components/frontend/testimonial-section';

import { FaArrowUp } from 'react-icons/fa';

interface WelcomeProps {
    admin_mode?: boolean;
    title?: string;
}

export default function Welcome({ admin_mode, title }: WelcomeProps) {
    const [isVisible, setIsVisible] = useState(false);

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
            <FrontEndLayout admin_mode={admin_mode} title={title}>

                <div className="flex-1 px-6 py-12 w-full mx-auto">

                    {/* Slideshow and description side by side */}
                    <SliderArea admin_mode={admin_mode} />

                    {/* Our Team Section */}
                    <OurTeamSection/>

                    {/* Production Process Section */}
                    <ProductionProcessSection/>

                    {/* Key Services */}
                    <KeyServiceSection/>

                    {/* Technologies Section */}
                    <TechnologiesSection/>
                    
                    {/* Testimonials Section */}
                    <TestimonialsSection/>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className={`fixed bottom-6 right-12 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100' : 'opacity-0'} ${isVisible ? 'scale-100' : 'scale-75'}`}>
                        <FaArrowUp size={24} />
                    </button>
                </div>
            </FrontEndLayout>
        </>
    );
}
