import Swal from "sweetalert2";
import LoadingPage from "../../../pages/shared/LoadingPage";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/features/Admin/AdminUser";
import { useState } from "react";
import { useGetUserStatusMutation } from "../../../redux/features/Users/UserApi";

const AdminAllUser = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState<number>(10); // Initialize with a default value and type it as number
    const { data: users = [], isLoading, isError } = useGetAllUsersQuery({ page, limit });
    const [updateAdmin, { isLoading: updateLoading, error }] = useUpdateUserMutation();
    const [deleteUser, { error: deleteError }] = useDeleteUserMutation();
    const [statusUpdate, { isLoading: statusLoading }] = useGetUserStatusMutation();

    console.log(users?.data?.result);

    const handleUpdate = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this user to Admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateAdmin(id).unwrap();
                    Swal.fire({
                        title: "Updated",
                        text: "The user's role has been updated to Admin.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: `${deleteError}`,
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(id).unwrap();
                    Swal.fire({
                        title: "Deleted",
                        text: "The user has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.log("delete", error?.data?.message);
                    Swal.fire({
                        title: "Error!",
                        text: `${error?.data?.message}`,
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleStatus = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        });

        if (result.isConfirmed) {
            try {
                const res = await statusUpdate(id).unwrap();
                if (res.success) {
                    Swal.fire({
                        title: "Blocked!",
                        text: `${res.message}`,
                        icon: "success"
                    });
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: `${err.data.message}`,
                    icon: "error"
                });
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (isLoading || updateLoading || statusLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        console.log(isError);
    }

    if (error) {
        console.log(error);
    }

    return (
        <>
            <div>
                <div className="card glass w-full">
                    <div className="card-body">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra text-center">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>UserName</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.data?.result?.map((user, index) => (
                                        <tr className={user.isDelete ? "line-through text-red-500" : ""} key={user._id}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.phone}</td>
                                            <td className="flex justify-center items-center gap-5">
                                                {user.isDelete ? (
                                                    <button disabled className="btn btn-outline border-purple-600 btn-sm">Update</button>
                                                ) : (
                                                    <label onClick={() => handleUpdate(user._id)} htmlFor="my_modal_6" className="btn btn-outline border-purple-600 btn-sm">Update</label>
                                                )}
                                                {user.isDelete ? (
                                                    <button disabled className="btn btn-outline border-pink-600 btn-sm">Delete</button>
                                                ) : (
                                                    <button onClick={() => handleDelete(user._id)} className="btn btn-outline border-pink-600 btn-sm">Delete</button>
                                                )}
                                            </td>
                                            <td>{user.status === "block" ? (
                                                <p>Blocked</p>
                                            ) : (
                                                <button onClick={() => handleStatus(user._id)} className="btn btn-outline border-pink-600 btn-sm">Block</button>
                                            )}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-10">
                    <div>
                        <div className="join flex justify-center my-5">
                            {Array.from({ length: users?.data.totalPages }, (_, index) => (
                                <input
                                    key={index + 1}
                                    className="join-item btn btn-square"
                                    type="radio"
                                    name="options"
                                    aria-label={` ${index + 1}`}
                                    checked={page === index + 1}
                                    onChange={() => handlePageChange(index + 1)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <select onChange={(e) => setLimit(Number(e.target.value))} className="select select-info w-auto my-5">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAllUser;
