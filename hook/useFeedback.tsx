import { MessageType, showMessage } from "react-native-flash-message";

export default function useFeedback() {
  const showFeedback = (
    type: MessageType,
    message: string,
    description?: string
  ) => {
    showMessage({
      message,
      description,
      type,
      icon: type,
      duration: type === "success" ? 6000 : 4000,
      floating: true,
      style: {
        marginTop: 35,
      },
    });
  };
  return { showFeedback };
}
