import {useCallback, useMemo, useState} from "react";
import DialogFormFrame from "../../core/Dialog/DialogFormFrame.tsx";

export default function useModal(ref) {
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
      <div ref={ref}>
        <DialogFormFrame
            title={title}
            open={!!modalContent}
            onClose={onClose}
            closeOnClickOutside={closeOnClickOutside}
        >
          {content}
        </DialogFormFrame>
      </div>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title,
      // eslint-disable-next-line no-shadow
      getContent,
      closeOnClickOutside = false,
      ref,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        ref: ref,
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}