import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { submitForm } from '@/utility/submitForm';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';

interface ServiceCard {
    id?: number;
    mainTitle: string;
    subTitle: string;
    captions: string[];
    src: string;
}

export default function CustomizeServiceCards() {
    const [cards, setCards] = useState<ServiceCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState<ServiceCard | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const res = await fetch('/dashboard/customize-services/service-card/getServiceCardinfo');
            const data = await res.json();
            setCards(data);
        } catch (err) {
            toast.error('Failed to fetch cards');
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingCard({ mainTitle: '', subTitle: '', captions: [], src: '' });
        setImageFile(null);
        setImagePreview('');
        setIsModalOpen(true);
    };

    const openEditModal = (card: ServiceCard) => {
        setEditingCard({ ...card });
        setImagePreview(card.src);
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        if (!editingCard) return;
        const { name, value } = e.target;

        if (name === 'captions' && typeof index === 'number') {
            const updated = [...editingCard.captions];
            updated[index] = value;
            setEditingCard({ ...editingCard, captions: updated });
        } else {
            setEditingCard({ ...editingCard, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const addCaption = () => {
        if (editingCard) {
            setEditingCard({ ...editingCard, captions: [...editingCard.captions, ''] });
        }
    };

    const removeCaption = (index: number) => {
        if (!editingCard) return;
        const updated = editingCard.captions.filter((_, i) => i !== index);
        setEditingCard({ ...editingCard, captions: updated });
    };

    const saveCard = async () => {
        if (!editingCard) return;

        const formData = new FormData();
        if (editingCard.id) formData.append('id', editingCard.id.toString());
        formData.append('mainTitle', editingCard.mainTitle);
        formData.append('subTitle', editingCard.subTitle);

        editingCard.captions.forEach((caption, i) =>
            formData.append(`captions[${i}]`, caption)
        );
        if (imageFile) formData.append('src', imageFile);

        const url = editingCard.id
            ? '/dashboard/customize-services/service-card/update'
            : '/dashboard/customize-services/service-card/store';

        try {
            await submitForm(url, formData, csrfToken);
            toast.success(`Card ${editingCard.id ? 'updated' : 'added'}`);
            setIsModalOpen(false);
            fetchCards();
        } catch {
            toast.error('Error saving card');
        }
    };

    const deleteCard = async (id?: number) => {
        if (!id) return;
        const formData = new FormData();
        formData.append('id', id.toString());
        try {
            await submitForm('/dashboard/customize-services/service-card/delete', formData, csrfToken);
            toast.success('Card deleted');
            fetchCards();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="flex justify-end mb-4">
                <button onClick={openAddModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <FiPlus className="inline mr-1" /> Add Card
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {cards.map((card, i) => (

                    <div key={card.id} className="bg-[#1F2833] text-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[350px]">
                        {/* Top section: Image and Title */}
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src={card.src}
                                alt="service-icon"
                                className="w-14 h-14 object-contain"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{card.mainTitle}</h2>

                            </div>
                        </div>

                        {/* Middle caption */}
                        <div>
                            <p className="text-sm text-gray-400 pt-1 pb-5">{card.subTitle}</p>
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

                        {/* Buttons: Bottom-right corner */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => openEditModal(card)}
                                className="inline-flex items-center px-4 py-1.5 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-200"
                            >
                                <FiEdit className="mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="inline-flex items-center px-4 py-1.5 text-sm text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-200"
                            >
                                <FiTrash2 className="mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>



                ))}
            </div>

            {/* Modal */}
            {isModalOpen && editingCard && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative text-black">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                            <FiX size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-6">{editingCard.id ? 'Edit Service Card' : 'Add Service Card'}</h2>

                        <div className="space-y-4">

                            {/* Main Title */}
                            <div>
                                <label className="block font-medium mb-1">Main Title</label>
                                <input
                                    name="mainTitle"
                                    value={editingCard.mainTitle}
                                    onChange={handleModalChange}
                                    placeholder="Enter main title..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            {/* Sub Title */}
                            <div>
                                <label className="block font-medium mb-1">Sub Title</label>
                                <input
                                    name="subTitle"
                                    value={editingCard.subTitle}
                                    onChange={handleModalChange}
                                    placeholder="Enter sub title..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block font-medium mb-1">Service Icon Image</label>
                                <div className="relative border border-dashed border-gray-400 rounded p-4 cursor-pointer hover:border-blue-400 transition">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="flex items-center justify-center gap-2 text-gray-600">
                                        <span className="text-2xl">+</span>
                                        <span>Select image file (jpg, png...)</span>
                                    </div>
                                </div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        className="mt-3 w-full h-32 object-contain border rounded"
                                        alt="Preview"
                                    />
                                )}
                            </div>

                            {/* Captions */}
                            <div>
                                <label className="block font-medium mb-2">Captions</label>
                                <div className="space-y-2">
                                    {editingCard.captions.map((caption, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                name="captions"
                                                value={caption}
                                                onChange={(e) => handleModalChange(e, i)}
                                                placeholder={`Caption ${i + 1}`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                            />
                                            <button
                                                onClick={() => removeCaption(i)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={addCaption} className="text-blue-600 text-sm hover:underline mt-1">
                                        + Add Caption
                                    </button>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={saveCard}
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                {editingCard.id ? 'Update Card' : 'Save Card'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
