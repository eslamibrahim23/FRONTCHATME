import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../assets/wsa.json";
import { motion } from "framer-motion";
import { useRef } from "react";

const WelcomeScreen = () => {
  const chatAnimation = useRef<LottieRefCurrentProps>(null);
  return (
    <>
      <main className="hidden md:flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Welcome To Chat Me
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Chat
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start chating as soon as you add a users.
              </p>
              <Lottie
                className="h-80 w-96"
                lottieRef={chatAnimation}
                animationData={animationData}
              />
            </motion.div>
            <Link to="/chat-users" className="rounded-lg">
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  rotateZ: [0, -5, 5, -5, 5, -5, 5, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <Button className="mt-4">Create chat</Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default WelcomeScreen;
