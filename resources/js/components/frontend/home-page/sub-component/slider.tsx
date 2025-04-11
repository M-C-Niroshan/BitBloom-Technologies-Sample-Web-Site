import { useEffect, useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { fetchData } from '@/utility/fetchData';

export default function Slider() {
    const [sliders, setSliders] = useState<{ src: string; caption: string }[]>([]);
    
    useEffect(() => {
        loadSliders();
    }, []);

    const loadSliders = async () => {
        try {
            const data = await fetchData('/dashboard/customize-home/slider/getsliders');
            setSliders(data);
        } catch (error) {
            console.log('Failed to load sliders.');
        }
    };
    
    return (
        <>
            <div className="w-full md:w-1/2 max-w-xl rounded overflow-hidden shadow-lg relative">
                <Fade
                    duration={2000}
                    transitionDuration={500}
                    arrows={false}
                    autoplay={true}
                    infinite={true}
                    indicators={false}
                >
                    {sliders.map((slider, index) => (
                        <div key={index} className="each-slide-effect relative">
                            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sx px-4 py-8 z-10">
                                {slider.caption}
                            </div>
                            <img
                                src={slider.src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[350px] "
                            />
                        </div>
                    ))}
                </Fade>
            </div>

        </>
    )
}
