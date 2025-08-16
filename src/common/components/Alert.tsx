"use client";
import React from "react";
import { Button } from "./Button";

interface IAlert {
  label: string;
  buttonType: "Danger" | "Primary";
  isOpen: boolean;
  title: string;
  dialogMessage?: string;
  actionHandler: () => void;
  closeModal: () => void;
  loading?: boolean;
}

const Alert = ({
  label,
  buttonType,
  dialogMessage,
  title,
  isOpen,
  actionHandler,
  closeModal,
  loading,
}: IAlert) => {
  if (!isOpen) return null;

  const handleButtonFunction = () => {
    if (buttonType === "Danger") {
      return (
        <Button
          className="cursor-pointer disabled:cursor-default"
          loading={loading}
          type="submit"
          label={label}
          variant="danger"
        />
      );
    } else {
      return (
        <Button
          className="cursor-pointer disabled:cursor-default"
          type="submit"
          label={label}
          variant="primary"
        />
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {dialogMessage && (
          <p className="mt-2 text-sm text-gray-600">{dialogMessage}</p>
        )}

        <div className="mt-6 flex justify-between">
          <Button
            onClick={() => {
              closeModal();
            }}
            label="Cancel"
            className="cursor-pointer disabled:cursor-default"
            variant="secondary"
            type="button"
          />
          <div
            onClick={() => {
              actionHandler();
            }}
          >
            {handleButtonFunction()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
