import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCard = (props: {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  nameFallBack?: string | null;
  avatarOnly?: boolean;
}) => {
  const { name, email, avatar, nameFallBack, avatarOnly } = props;
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={avatar || ""} alt="Avatar" />
        <AvatarFallback className="rounded-lg">{nameFallBack}</AvatarFallback>
      </Avatar>
      {!avatarOnly && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs">{email}</span>
        </div>
      )}
    </>
  );
};

export default UserCard;
