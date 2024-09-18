import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateReviewMutation } from "../../redux/features/Reviews/reviewsApi";
import { toast } from "sonner";
import LoadingPage from "../../pages/shared/LoadingPage";

type Booking = {
    car: {
        _id: string;
        name: string;
        model: string;
    };
    user: {
        _id: string;
    };
};

type UserReviewProps = {
    booking: Booking;
};

interface ReviewFormData {
    comment: string;
    ratings: number;
}

const UserReview = ({ booking }: UserReviewProps) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<ReviewFormData>();
    const [addReview, { isLoading }] = useCreateReviewMutation();

    const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
        const review = {
            comment: data.comment,
            ratings: data.ratings,
            carId: booking.car._id,
            user: booking.user._id
        };
        try {
            const res = await addReview(review).unwrap();
            if (res.success) {
                toast.success(res.message, {
                    position: "top-center",
                });
                reset();
                const modal = document.getElementById("my_modal_6") as HTMLInputElement;
                if (modal) modal.checked = false; 
            }
        } catch (error) {
            toast.error('Failed to submit review');
        }
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
                <div className="modal-box">
                    <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h1 id="modal-title" className="text-xl text-info font-bold text-center my-8">
                        Please Review This Car: {booking.car.name} {booking.car.model}
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Car Name</span>
                            </div>
                            <input 
                                type="text" 
                                defaultValue={booking.car.name} 
                                disabled
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-full my-5">
                            <div className="label">
                                <span className="label-text">Comments</span>
                            </div>
                            <textarea 
                                {...register("comment", { required: "Please provide a review" })}
                                className="input input-bordered input-info w-full"
                            />
                            {errors.comment && (
                                <p className="text-red-600 font-bold mt-5">{String(errors.comment.message)}</p>
                            )}
                        </label>
                        <label className="form-control w-full my-5">
                            <div className="label">
                                <span className="label-text">Ratings</span>
                            </div>
                            <input 
                                type="number" 
                                {...register("ratings", { 
                                    required: "Please provide a rating between 1 and 5",
                                    min: {
                                        value: 1,
                                        message: "Rating must be between 1 and 5"
                                    },
                                    max: {
                                        value: 5,
                                        message: "Rating must be between 1 and 5"
                                    }
                                })}
                                className="input input-bordered w-full"
                            />
                            {errors.ratings && (
                                <p className="text-red-600 font-bold mt-5">{String(errors.ratings.message)}</p>
                            )}
                        </label>
                        <input 
                            type="submit" 
                            value="Submit" 
                            className="btn btn-outline btn-info w-full my-8"
                            disabled={isLoading} 
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserReview;
