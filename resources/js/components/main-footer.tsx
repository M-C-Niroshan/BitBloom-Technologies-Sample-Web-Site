import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
interface FooterProps {
    admin_mode?: boolean;
}

export function MainFooter({ admin_mode }: FooterProps) {
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

    useEffect(() => {
        getFooterContent();
    }, []);

    const getFooterContent = async () => {
        try {

            const res = await fetch('/dashboard/customize-home/getFootercontent');
            const data = await res.json();
            console.log(data)
            setFooterData(data);

        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <footer className="bg-[#0B0C10] text-white py-10 w-full">
                <div className="container mx-auto pl-6 pr-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-between items-center w-full">
                        {/* Company Info Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">{footerData?.companyName}</h3>
                            <p className="text-sm mb-6">
                            {footerData?.leftSideCaption}</p>
                        </div>

                        {/* Quick Links Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                            <ul className={`space-y-3 text-sm text-gray-300 ${admin_mode ? 'pointer-events-none' : ''}`}>
                                <li>
                                    <a href="/services" className="hover:underline">
                                        Our Services
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="hover:underline">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:underline">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>

                        </div>

                        {/* Social Media Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-6 text-blue-600">
                                <a href={footerData?.facebookURL || "#"} target="_blank" rel="noopener noreferrer">
                                    <FaFacebook size={30} />
                                </a>
                                <a href={footerData?.twitterURL || "#"} target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size={30} />
                                </a>
                                <a href={footerData?.linkdinURL || "#"} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={30} />
                                </a>
                                <a href={footerData?.instagramURL || "#"} target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={30} />
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            {/* Contact Info */}
                            <div className="text-sm text-gray-300 space-y-3">
                                <div className="flex items-start gap-2">
                                    <FaLocationDot className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Headquarters:</p>
                                        <p>{footerData?.headquartersAddress}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <MdAlternateEmail className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Business Inquiries:</p>
                                        <p>
                                            <a href={footerData?.inquiriesMailAddress} className="hover:underline">
                                                {footerData?.inquiriesMailAddress}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FaPhoneAlt className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Contact Number:</p>
                                        <p>
                                            <a href={footerData?.contactNumber} className="hover:underline">
                                            {footerData?.contactNumber}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="text-center mt-5 text-gray-400 text-sm border-t border-gray-700 pt-6 -mb-4">
                        <p>&copy; 2025 BitBloom Technologies. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}
