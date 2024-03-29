import Lottie from "lottie-react";

import animationData from "../assets/wsa.json";
const WScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center lg:mx-48 text-white font-poppins">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">hello</h1>
        <p>welcome to our page</p>
        <div className="flex gap-2 justify-center">
          <button>let's get start</button>
        </div>
        <Lottie className="h-20 w-20" animationData={animationData} />
      </div>
    </div>
  );
};

export default WScreen;
