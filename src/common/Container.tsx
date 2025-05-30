import { ReactNode } from "react";

const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full flex justify-center`}>
      <div className={`w-full max-w-[1920px]  ${className}`}>{children}</div>
    </div>
  );
};

export default Container;
