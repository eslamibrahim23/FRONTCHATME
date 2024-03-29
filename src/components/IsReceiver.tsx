import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { time } from "console";
function IsReceiver({ msg, receiver }) {
  return (
    <>
      <div className="flex justify-normal space-x-2 p-3 m-auto">
        <Avatar>
          <AvatarImage src={receiver.Image} />
          <AvatarFallback>
            {receiver.userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Card className=" p-2">
          <h4 className=" font-semibold mb-1 uppercase">{receiver.userName}</h4>
          <p className="text-sm break-words w-[150px]">
            {msg.content ? msg.content : "loading"}
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              {moment(msg.createdAt).format("hh:mm A")}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}

export default IsReceiver;
