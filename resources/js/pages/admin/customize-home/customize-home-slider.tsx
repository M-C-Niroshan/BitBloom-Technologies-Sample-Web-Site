import AdminLayout from '@/layouts/admin/admin-layout';
import SliderArea from '@/components/frontend/home-page/slider-area';

export default function Customizeslider() {
    return (
        <div>
            <AdminLayout title="">
                <div className="flex flex-col columns-2 gap-4 w-full border">
                    <SliderArea admin_mode={true} />
                </div>
                <p className="text-2xl font-bold mt-4 mb-4 pt-3">
                    Customize Home Page Slider
                </p>
                <div className="flex items-center justify-between">

                    
                </div>
                <div className="flex items-center justify-between">dfg</div>
            </AdminLayout>
        </div>
    )
}
