import { useState } from "react";
import { useGetUserQuery } from "../../redux/features/Users/UserApi";
import { FaEdit } from "react-icons/fa";
import UpdateUserModel from "../Modal/UpdateUserModel";
import LoadingPage from "../../pages/shared/LoadingPage";
import { toast } from "sonner";

const UsersInfo = () => {
    const { data: users, isLoading, error } = useGetUserQuery(undefined);
    const [userModel, setUserModel] = useState(false);

    const user = users?.data;

    const handleUpdateUser = () => {
        setUserModel(true);
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        // Determine the type of the error and handle it accordingly
        if ('data' in error) {
            // Assuming 'data' is a property in the error object
            toast.error((error as any).data?.message || "An unknown error occurred.");
        } else {
            toast.error("An unknown error occurred.");
        }
    }

    return (
        <>
            <div>
                <div className="card card-glass w-full shadow-xl">
                    <div className="card-body">
                        <div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="bg-gradient-to-r from-purple-600 via-teal-400 to-cyan-500 inline-block text-transparent bg-clip-text text-xl md:text-2xl lg:text-3xl font-bold">My-Profile</h1>
                                </div>
                                <div>
                                    <label htmlFor="my_modal_6" onClick={() => handleUpdateUser()} className="text-xl btn btn-outline hover:btn-info"><FaEdit /></label>
                                </div>
                            </div>
                            <div className="divider divider-info"></div>
                            <div className="lg:border lg:border-cyan-500 rounded-3xl p-10">
                                <div className="avatar placeholder my-10">
                                    {user?.image ? (
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={user?.image} alt="User Avatar" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-neutral text-neutral-content w-24 h-24 rounded-full flex items-center justify-center">
                                            <span className="text-sm lg:text-3xl">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : 'N'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 justify-between items-center inset-2">
                                    <p className="text-semibold dark:text-white light:bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text">Full Name <br /><span className="font-bold text-xl">{user?.name}</span></p>
                                    <p>Email <br /><span className="light:text-black dark:text-white font-bold text-xl">{user?.email}</span></p>
                                    <p>Phone <br /><span className="light:text-black dark:text-white font-bold text-xl">{user?.phone}</span></p>
                                    {user?.address && <p>Address <br /><span className="light:text-black font-bold text-xl">{user?.address}</span></p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {userModel && <UpdateUserModel user={user} />}
        </>
    );
};

export default UsersInfo;
