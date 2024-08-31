import Lottie from "react-lottie-player";
import lottieJson from '../../not found.json'

const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen">
             <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 500, height: 500 }}
    />
        </div>
    );
};

export default NotFound;