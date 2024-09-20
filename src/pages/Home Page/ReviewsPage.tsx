import { useGetReviewQuery } from "../../redux/features/Reviews/reviewsApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
import "keen-slider/keen-slider.min.css"; 
import { useKeenSlider } from "keen-slider/react"; 

interface User {
  name: string;
  image: string;
}

interface Review {
  comment: string;
  ratings: number;
  user: User;
}

const ReviewsPage = () => {
  const { data: reviews } = useGetReviewQuery(undefined);
  console.log({reviews});
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      breakpoints: {
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 15 },
        },
        "(min-width: 641px) and (max-width: 1024px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(min-width: 1025px)": {
          slides: { perView: 3, spacing: 15 },
        },
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={i} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  return (
    <div className="lg:my-10 p-8">
      <h1 className="text-center text-5xl p-12 font-bold mb-8">
        <span className="underline-hover text-warning text-2xl lg:text-5xl">
          Customer Testimonials
        </span>
      </h1>
      <div ref={sliderRef} className="keen-slider my-10">
        {reviews?.data?.map((review: Review, index: number) => (
          <div key={index} className="keen-slider__slide">
            <div className="card w-full shadow-2xl">
              <div className="card-body p-5">
                <div className="h-full p-8 rounded shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="leading-relaxed mb-6">{review?.comment}</p>
                  <a className="inline-flex items-center">
                    <img
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      src={review?.user?.image}
                      alt=""
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium">
                        {review?.user?.name}
                      </span>
                    </span>
                  </a>
                  <div>{renderStars(review.ratings)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;