import { useEffect, useRef } from 'react';
import '../styles/components/popup.scss';

interface PopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({ message, isOpen, onClose }: PopupProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="popup-dialog"
      onClose={onClose}
    >
      <div className="popup-content">
        <p>{message}</p>
        <button type='button' className="popup-close" aria-label='stäng popup' onClick={onClose}>
          Stäng
        </button>
      </div>
    </dialog>
  );
};

