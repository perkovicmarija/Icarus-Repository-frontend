import {useCallback, useMemo, useState} from "react";
import DialogFormFrame from "../../core/Dialog/DialogFormFrame.tsx";

export default function useModal() {
  const [modalContent, setModalContent] = useState(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return (
      <DialogFormFrame
        title={title}
        open={!!modalContent}
        onClose={onClose}
        closeOnClickOutside={closeOnClickOutside}
      >
        {content}
      </DialogFormFrame>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title,
      // eslint-disable-next-line no-shadow
      getContent,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}