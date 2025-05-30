import React from "react";
import dynamic from "next/dynamic";

const ComingSoon = dynamic(() => import("../common/components/ComingSoon"), {
  ssr: true,
});

const Page = () => {
  return (
    <>
      Bijay subedi
      <ComingSoon />
    </>
  );
};

export default Page;
