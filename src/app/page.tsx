import React from "react";
import dynamic from "next/dynamic";

const ComingSoon = dynamic(() => import("../common/components/ComingSoon"), {
  ssr: true,
});

const Page = () => {
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Page;
