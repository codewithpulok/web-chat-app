import PropTypes from "prop-types";
import { useCallback } from "react";
import useMessageCreate from "../../hooks/message/useMessageCreate";
import ChatForm from "./ChatForm";

const Props = {
  id: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MessageInput = (props) => {
  const { id } = props;

  // api state
  const [createMessage] = useMessageCreate();

  const onSubmit = useCallback(
    async ({ file, text }, reset) => {
      if (!file && !text) return;

      await createMessage(text, id);

      reset();
    },
    [createMessage, id]
  );

  return <ChatForm onSubmit={onSubmit} />;
};

MessageInput.propTypes = Props;

export default MessageInput;
