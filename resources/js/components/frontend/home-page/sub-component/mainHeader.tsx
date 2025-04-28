import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchData } from '@/utility/fetchData';

export default function MainHeader() {
    const [headerData, setHeaderData] = useState({
        mainTitle: '',
        middleTitle: '',
        headquartersAddress: '',
        businessInquiriesAddress: '',
    });

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            const data = await fetchData('/dashboard/customize-home/customize-home-main-header/getheaderinfo');
            setHeaderData(data);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">{headerData.mainTitle}</h1>

            <p className="text-lg mb-6">
                {headerData.middleTitle}
            </p>

            {/* Company Contact Info */}
            <div className="mb-6 text-sm text-gray-600 space-y-3">
                <div className="flex items-start gap-2">
                    <FaLocationDot className="text-blue-600 mt-1" />
                    <div>
                        <p className="font-semibold">Headquarters:</p>
                        <p>{headerData.headquartersAddress}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MdAlternateEmail className="text-blue-600 mt-1" />
                    <div>
                        <p className="font-semibold">Business Inquiries:</p>
                        <p>
                            <a href={`mailto:${headerData.businessInquiriesAddress}`} className="hover:underline">
                                {headerData.businessInquiriesAddress}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}
