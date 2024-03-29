import { useState, useEffect } from "react";
import axios from "axios";
import WelcomeScreen from "@/pages/WelcomeScreen";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import CreateChat from "./CreateChat";
import SkeletonLoader from "./SkeletonLoader";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

const ChatUsers = () => {
  const [receiver, setReceiver] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `https://rippleroomback.onrender.com/chat/chatsForUserLogedIn/${userId}`
        );
        setChats(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const getDataOfOneUser = (userData) => {
    setReceiver(userData.receiver);
    setShowChat(true); // Show chat when user is selected
  };

  const handleGoBack = () => {
    setReceiver(null);
    setShowChat(false); // Hide chat when going back
  };

  return (
    <>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
        <div
          className={`relative flex-col items-start gap-8 lg:block ${
            showChat ? "hidden" : "md:flex"
          }`}
        >
          <div className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-bold">Chats</legend>
              <ScrollArea className="h-[550px]">
                <div className="p-4">
                  <h4 className="mb-4 text-2xl font-semibold leading-none">
                    Chat Users
                  </h4>
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    chats.map((chat, i) => (
                      <>
                        <div
                          key={i}
                          onClick={() => getDataOfOneUser(chat)}
                          className="flex items-center gap-4 cursor-pointer  hover:bg-secondary rounded-md p-2"
                        >
                          <Avatar className=" h-12 w-12 sm:flex rounded-lg">
                            <AvatarImage
                              src={chat.receiver.Image}
                              alt="Avatar"
                            />
                            <AvatarFallback>
                              {chat.receiver.userName
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1 ">
                            <p className="text-sm font-bold">
                              {chat.receiver.userName}
                            </p>
                            <p className="text-sm  text-ellipsis overflow-hidden text-muted-foreground">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </>
                    ))
                  )}
                </div>
              </ScrollArea>
            </fieldset>
          </div>
        </div>

        {/* Chat Component */}
        <div
          className={`relative min-h-[50vh] md:col-span-3 ${
            !showChat ? "hidden" : ""
          }`}
        >
          {receiver && <CreateChat receiver={receiver} />}
          {receiver && (
            <Button
              onClick={handleGoBack}
              className="lg:hidden flex absolute top-4 left-4"
              size={"icon"}
              variant={"outline"}
            >
              <ChevronLeft />
            </Button>
          )}
        </div>

        {/* Welcome Screen */}
        <div className={`lg:col-span-3 ${showChat ? "hidden" : ""}`}>
          <WelcomeScreen />
        </div>
      </main>
    </>
  );
};

export default ChatUsers;
