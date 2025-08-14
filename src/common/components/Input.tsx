import React, { ChangeEvent } from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  title,
  errorMessage,
  disabled,
}: {
  value?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="capitalize pb-1 text-black">{title}</span>
      <input
        value={value}
        disabled={disabled}
        className={`!w-full border border-gray-300 px-2 text-black rounded-md focus:outline-none !mx-1 !h-10`}
        type={type}
        onChange={onChange}
        title={title}
        placeholder={placeholder}
        autoComplete="off"
      />
      <span className="text-red-500 text-sm">{errorMessage}</span>
    </div>
  );
};
