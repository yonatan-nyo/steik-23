import React from "react";
import Link from "next/link";
import { bpaType } from "./BPAinfo";
import { getSlug } from "@/lib/utils/stringManipulation";

const BPAbutton = ({ data }: { data: bpaType }) => {
  return (
    <Link
      href={`/tentang-bpa/#${getSlug(data.name)}`}
      className="border-2 rounded-full border-slate-300 h-fit px-1 py-0.5"
    >
      <p className="button">
        <span className="text-slate-500">{data.name}</span>{" "}
        {data.members.length > 1 && (
          <span className="font-bold text-slate-700">
            {data.members.length}
          </span>
        )}
      </p>
    </Link>
  );
};

export default BPAbutton;
