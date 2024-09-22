import { useGetReviewQuery } from "../../redux/features/Reviews/reviewsApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/autoplay'; 

const ReviewsPage = () => {
  const { data: reviews } = useGetReviewQuery(undefined);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars).fill(0).map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars).fill(0).map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="testimonial-section py-10 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },   
            768: { slidesPerView: 2, spaceBetween: 30 },  
            1024: { slidesPerView: 3, spaceBetween: 40 },  
            // 1280: { slidesPerView: 4, spaceBetween: 50 },  
          }}
          className="mySwiper w-full max-w-5xl mx-auto px-4"
        >
          {reviews?.data?.map((testimonial, index) => (
            <SwiperSlide key={index} className="p-4">
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{testimonial.user.name}</h2>
                  <p className="italic">"{testimonial.comment}"</p>
                  <div className="flex justify-center pt-2">
                    {renderStars(testimonial.ratings)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ReviewsPage;





