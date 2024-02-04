import PropTypes from "prop-types";
import { useCallback } from "react";
import useReplayCreate from "../../hooks/replay/useReplayCreate";
import ChatForm from "./ChatForm";

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ReplayInput = (props) => {
  const { id } = props;

  // api state
  const [createReplay] = useReplayCreate();

  const onSubmit = useCallback(
    async ({ file, text }, reset) => {
      if (!file && !text) return;

      const d = await createReplay(text, id);

      console.log({ d });

      reset();
    },
    [createReplay, id]
  );

  return <ChatForm onSubmit={onSubmit} />;
};

ReplayInput.propTypes = Props;

export default ReplayInput;
