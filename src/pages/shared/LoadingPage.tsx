import Lottie from "react-lottie-player";

import loading from "../../../loading.json"
const LoadingPage = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                    <Lottie
             loop
             animationData={loading}
             play
             style={{ width: 300, height: 500 }}
           />
               </div>
        </div>
    );
};

export default LoadingPage;