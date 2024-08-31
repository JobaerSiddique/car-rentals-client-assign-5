import { useGetUserQuery } from "../../redux/features/Users/UserApi";


const UsersInfo = () => {
    const {data:user,isLoading,error} = useGetUserQuery()
    
    
    return (
        <div>
            <h1>User Name : {user?.data?.name}</h1>
        </div>
    );
};

export default UsersInfo;