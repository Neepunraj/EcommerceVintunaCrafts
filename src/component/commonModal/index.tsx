import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

import React, { Fragment, ReactNode } from "react";

interface CommonModalProps {
  mainContent: ReactNode;
  show: boolean;
  setShow: (value: boolean) => void;
  showModalTitle: boolean;
  modalTitle?: string;
  showButtons?: boolean;
  buttonComponent?: ReactNode;
}
export default function CommonModal({
  modalTitle,
  mainContent,
  showButtons,
  buttonComponent,
  show,
  setShow,
  showModalTitle,
}: CommonModalProps) {
  return (
    <Dialog as="div" open={show} className={"relative z-10"} onClose={setShow}>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className={"w-screen max-w-md"}>
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {showModalTitle ? (
                    <div className="flex items-start justify-between">
                      <DialogTitle>{modalTitle}</DialogTitle>
                    </div>
                  ) : null}
                  <div className="mt-20">{mainContent}</div>
                </div>
                {showButtons ? (
                  <div className="border-none px-4 py-6 sm:px-6">
                    {buttonComponent}
                  </div>
                ) : null}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
