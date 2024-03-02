import Image from "next/image";
import React from "react";

export type memberBPA = {
  name: string;
  position?: string;
  imgUrl: string;
};
const BPACard = ({
  imgUrl,
  name,
  position,
}: {
  imgUrl: string;
  name: string;
  position?: string;
}) => {
  return (
    <div className="w-[38%] sm:w-[18%] min-w-[116px] max-w-[200px] aspect-[3/4] h-auto text-center drop-shadow-xl border-4 rounded-xl flex flex-col bg-slate-50 border-slate-50 hover:scale-110 duration-150 ease-in hover:shadow-lg hover:font-semibold flex-grow-0">
      <Image
        src={
          imgUrl ||
          "https://utfs.io/f/7648af4a-e902-454b-b937-b7433ef9aa2b-vbi1vd.svg"
        }
        alt={name}
        width={300}
        height={700}
        className="object-cover w-full h-auto"
        blurDataURL={imgUrl}
      />
      <div className="flex justify-center items-center flex-grow">
        <p className="border-t-2 border-slate-300 px-2 py-3">{name}</p>
        {position && (
          <p className="border-t-2 border-slate-300 px-2 py-3">{position}</p>
        )}
      </div>
    </div>
  );
};

export default BPACard;
