import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OutsideClickWrapper } from '@shared/hooks';

const modalRoot = document.getElementById('modal') || document.body;

export interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    return isOpen
        ? createPortal(
              <div className="fixed bottom-0 left-0 right-0 top-0 bg-gray-600/25">
                  <div className="fixed flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0">
                      <OutsideClickWrapper className="relative max-h-full w-full max-w-2xl" onOutsideClick={onClose}>
                          {children}
                      </OutsideClickWrapper>
                  </div>
              </div>,
              modalRoot,
          )
        : null;
}
