import React, { useState } from "react";
import BPACard, { memberBPA } from "./BPACard";
import { getSlug } from "@/lib/utils/stringManipulation";

export type bpaType = {
  name: string;
  jobDesc: string;
  members: memberBPA[];
};

const BPAInfo = ({ data }: { data: bpaType }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const slug = getSlug(data.name);
    const baseUrl = process.env.BASE_URL || "";

    const linkToCopy = `${baseUrl}/tentang-bpa/#${slug}`;

    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  return (
    <div
      className="w-full pb-8 py-2"
      id={getSlug(data.name)}
      data-aos="fade-right"
    >
      <div className="flex w-full border-b-2 gap-2 items-center">
        <h2 className="font-bold text-xl">{data.name}</h2>
        <span
          className="text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-500"
          onClick={handleCopyLink}
        >
          #
        </span>
        {copySuccess && (
          <span className="text-blue-500 ml-2 text-sm">Copied!</span>
        )}
      </div>
      {data.members.length > 1 ? (
        <>
          <p className="py-2 font-light">{data.jobDesc}</p>
          <div className="flex gap-4 flex-wrap w-full justify-center sm:justify-start">
            {data.members.map((member, idx) => (
              <BPACard
                key={`${idx}-${member}-${data.name}`}
                name={member.name}
                imgUrl={member.imgUrl}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 w-full py-4">
          <div className="flex gap-4 flex-wrap w-full sm:w-fit flex-grow-0 justify-center sm:justify-start">
            {data.members.map((member, idx) => (
              <BPACard
                key={`${idx}-${member}-${data.name}`}
                name={member.name}
                imgUrl={member.imgUrl}
              />
            ))}
          </div>
          <p className="py-2">{data.jobDesc}</p>
        </div>
      )}
    </div>
  );
};

export default BPAInfo;
