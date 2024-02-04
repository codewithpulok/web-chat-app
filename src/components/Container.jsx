import { Box, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ChatContent from "./ChatContent";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
function Container() {
  const params = useParams();
  const { user } = useAuth();
  const id = params.id;

  return (
    <HStack width={"full"}>
      <Box display={["none", "none", "block"]}>
        <LeftSideBar
          displayName={user.displayName}
          userId={user.uid}
          displayPicture={user.photoURL}
        />
      </Box>

      <ChatContent id={id} />
      <RightSideBar peerId={user.uid} display={["none", "none", "flex"]} />
    </HStack>
  );
}

export default Container;
