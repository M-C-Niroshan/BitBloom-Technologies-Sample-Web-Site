import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CustomizeTeamMembers() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        id: null,
        fullName: '',
        role: '',
        profilePicture: null as File | null,
        preview: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            setLoading(true);
            fetch('/dashboard/customize-home/team-members/getTeamMembers')
                .then((res) => res.json())
                .then((data) => setTeamMembers(data));
        } catch (error) {
            toast.error('Failed to load header info');
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    const handleOpenModal = (type: 'add' | 'edit', member?: any) => {
        setModalType(type);
        if (type === 'edit' && member) {
            setFormData({
                id: member.id,
                fullName: member.fullName,
                role: member.role,
                profilePicture: null,
                preview: member.profilePicture,
            });
        } else {
            setFormData({
                id: null,
                fullName: '',
                role: '',
                profilePicture: null,
                preview: '',
            });
        }
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                profilePicture: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async () => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const form = new FormData();
        form.append('fullName', formData.fullName);
        form.append('role', formData.role);

        if (formData.profilePicture) {
            form.append('profilePicture', formData.profilePicture);
        }

        if (modalType === 'edit' && formData.id) {
            form.append('id', formData.id);
        }

        const endpoint =
            modalType === 'add'
                ? '/dashboard/customize-home/team-members/store'
                : '/dashboard/customize-home/team-members/update';
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                },
                body: form,
            });
            setShowModal(false);
            loadHeaderData();
            toast.success('Submited successfully!');
        } catch (error) {
            setShowModal(false);
            toast.error('Submit Failed');
            console.error(error);
        }

    };

    const handleDelete = async (id: number) => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (confirm('Are you sure you want to delete this member?')) {
            try {
                await fetch('/dashboard/customize-home/team-members/delete', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': token || '',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                loadHeaderData();
                toast.success('Deleted successfull!');
            }
            catch (error) {
                toast.error('Delete Failed');
                console.error(error);
            }


        }
    };

    return (
        <AdminLayout title="" isloading={loading}>
            <div className="pt-20 pb-10 px-6 text-center bg-[#0B0C10] border-b border-gray-800 border">
                <h2 className="text-4xl font-extrabold text-white mb-4">Meet Our Team</h2>
                <p className="text-blue-400 text-lg mb-8 max-w-3xl mx-auto">
                    Our dedicated professionals bring passion, expertise, and innovation to every project.
                </p>

                <div className="mb-8">
                    <button
                        onClick={() => handleOpenModal('add')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                        Add New Member
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                    {teamMembers.map((member: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-[#1F2833] rounded-xl p-6 shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={member.profilePicture}
                                alt={member.fullName}
                                className="w-24 h-24 object-cover rounded-full border-4 border-blue-600 mb-4"
                            />
                            <h4 className="text-white text-lg font-semibold">{member.fullName}</h4>
                            <p className="text-sm text-gray-400 mb-4">{member.role}</p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleOpenModal('edit', member)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                                >
                                    <FiEdit className="mr-1" />
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                                >
                                    <FiTrash2 className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 text-black">
                    <div className="bg-white text-black rounded-lg p-6 w-[90%] max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            {modalType === 'add' ? 'Add New Member' : 'Update Member Info'}
                        </h3>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                            }
                            className="w-full p-2 border rounded mb-4"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />

                        {formData.preview && (
                            <img
                                src={formData.preview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-blue-600"
                            />
                        )}

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                {modalType === 'add' ? 'Add' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
