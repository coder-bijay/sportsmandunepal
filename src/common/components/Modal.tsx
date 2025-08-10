"use client";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { Button } from "./Button";

interface ICustomModal {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  closeModal: () => void;
}

interface IDeleteCustomModal {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
}

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
  />
);

export const CustomModal: React.FC<ICustomModal> = ({
  isOpen,
  title,
  closeModal,
  children,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <Backdrop onClick={closeModal} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white shadow-xl flex flex-col gap-4 rounded-xl w-[90%] max-w-[500px] transform transition-all duration-300 scale-95 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="flex items-center relative justify-between">
            <span />
            <span className="text-black text-[18px] xl:text-[22px] font-bold">
              {title}
            </span>
            <MdClose
              className="h-[35px] w-[35px] z-40 absolute right-1 top-1 text-red-400 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className=" !w-full h-full">{children}</div>
        </div>
      </div>
    </>,
    document.body
  );
};

export const DeleteCustomModal: React.FC<IDeleteCustomModal> = ({
  isOpen,
  closeModal,
  handleDelete,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <Backdrop onClick={closeModal} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white border border-[#FF6969] shadow-lg flex flex-col rounded-xl 
                     w-[200px] sm:w-[250px] md:w-[350px] xl:w-[468px] 
                     transform transition-all duration-300 scale-95 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
        >
          <div className="flex flex-col gap-3 p-6 text-center">
            <div className="flex flex-col items-center justify-center gap-10 pt-6 pb-8">
              <picture>
                <img src="/assets/delete_warn.png" alt="delete" />
              </picture>
              <span className="text-[20px] md:text-[25px] xl:text-[30px] text-black font-medium">
                Are you sure want to delete?
              </span>
            </div>
            <div className="flex items-center justify-between w-full gap-8 px-6 mt-8 mb-2">
              <Button variant="secondary" label="Cancel" onClick={closeModal} />
              <Button variant="danger" label="Delete" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
