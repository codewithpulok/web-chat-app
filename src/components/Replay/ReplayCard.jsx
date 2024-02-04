import {
  Avatar,
  Box,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { LinkItUrl } from "react-linkify-it";
import ImageModal from "../common/ImageModal";

const Props = {
  replay: PropTypes.object,
  author: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ReplayCard = (props) => {
  const { replay, author } = props;
  const imageDisclosure = useDisclosure();

  const containYoutubeLink = replay?.text?.includes("youtube.com/watch?v=");
  const embedId = containYoutubeLink
    ? replay?.text.split("=")[1].slice(0, 11)
    : "";
  return (
    <VStack width={"full"} alignItems={"flex-start"} padding={"1"}>
      <Box
        width={"full"}
        height={"1px"}
        mb={"2px"}
        bg={
          "linear-gradient(270deg, rgba(88, 101, 242, 0.2) 0%, #5865F2 45.74%, rgba(88, 101, 242, 0.2) 100%)"
        }
      ></Box>
      {replay?.file && (
        <Box>
          <Image
            cursor={"pointer"}
            onClick={imageDisclosure.onOpen}
            src={replay?.file}
            maxW={"200px"}
            borderRadius={"10px"}
          />
        </Box>
      )}
      <HStack width={"full"} alignItems={"center"} spacing={2}>
        <Avatar src={author?.avatar} size={"sm"} />
        <VStack alignItems={"flex-start"} spacing={0}>
          <HStack alignItems={"center"}>
            <Text color={"#4F5660"} fontWeight={"500"} fontSize={"xs"}>
              {author?.full_name}
            </Text>
            <Text fontSize={"12px"}>
              {new Date(replay?.created_at || new Date()).toLocaleDateString()}
            </Text>
          </HStack>
          <LinkItUrl className="purple">
            <Text fontSize={"xs"}>{replay?.text}</Text>
          </LinkItUrl>
          {containYoutubeLink && (
            <Box borderRadius={"10px"}>
              <iframe
                width="300px"
                height="150px"
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                style={{ borderRadius: "10px" }}
              />
            </Box>
          )}

          <ImageModal
            isOpen={imageDisclosure.isOpen}
            onClose={imageDisclosure.onClose}
            src={replay?.file}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

ReplayCard.propTypes = Props;

export default ReplayCard;
