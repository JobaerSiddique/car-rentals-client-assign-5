import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../redux/features/Users/UserApi";
import Swal from "sweetalert2";
import LoadingPage from "../shared/LoadingPage";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error === 'object' && 'data' in error;
};


const hasMessage = (data: any): data is { message: string } => {
  return data && typeof data === 'object' && 'message' in data;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [reset, { isLoading, error }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token');

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    if (isFetchBaseQueryError(error)) {
      const errorMessage = hasMessage(error.data) ? error.data.message : "An unknown error occurred";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "An unknown error occurred",
        icon: "error"
      });
    }
  }

  const onSubmit = async (formData: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reset your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    });

    if (result.isConfirmed) {
      try {
        if (!token) {
          throw new Error("Token is missing.");
        }

        const payload = {
          email: formData.email,
          password: formData.password
        };
        const res = await reset({
          body: payload,
          token: token
        });

        if (res?.data?.success) {
          Swal.fire({
            title: "Success!",
            text: res?.data?.message,
            icon: "success"
          });
          navigate('/login');
        }
      } catch (err) {
        console.error('err', err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card glass w-auto">
        <div className="card-body">
          <h2 className="text-center text-xl lg:text-3xl text-orange-600 font-extrabold">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="border border-cyan-500 rounded-3xl p-10 my-10">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered input-info w-full"
              />
              {errors.email && <p className="text-red-500 font-bold mt-4">{String(errors.email.message)}</p>}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Enter your new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="input input-bordered input-info w-full"
              />
              {errors.password && <p className="text-red-500 font-bold mt-4">{String(errors.password.message)}</p>}
            </label>

            <input type="submit" value="Submit" className="btn btn-outline btn-info mt-5 w-full" />
          </form>
          <p className="text-red-500 font-extrabold p-5 mt-8">N.B : You can change your password 3 times. Be careful!</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
