import { useEffect, useState } from 'react';

interface HeaderData {
    id?: string;
    mainTitle?: string;
    subTitle?: string;
    notExists?: boolean;
}
export default function MiddleHeader() {
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);

    useEffect(() => {
        getHeaderContent();
    }, []);

    const getHeaderContent = async () => {
        try {
            const res = await fetch('/dashboard/customize-about/middle-header/getAboutUsMiddleHeaderinfo');
            const data = await res.json();
            setHeaderData(data);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-6">{headerData?.mainTitle || 'Meet Our Team'}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {headerData?.subTitle || ' Our team is made up of skilled developers, designers, and strategists who are committed to delivering excellence. With a passion for innovation and a focus on results, we work collaboratively to solve the most challenging problems for our clients.'}
            </p>
        </div>
    )
}
