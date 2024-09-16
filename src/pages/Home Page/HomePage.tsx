import FeatureCar from "./FeatureCar";
import HeroSection from "./HeroSection";
import ReviewsPage from "./ReviewsPage";
import WhyChoose from "./WhyChoose";


const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <FeatureCar/>
            <ReviewsPage/>
            <WhyChoose/>
        </div>
    );
};

export default HomePage;