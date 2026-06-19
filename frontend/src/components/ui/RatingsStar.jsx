import React from "react";
import Star from "../../assets/images/star.svg";

const RatingsStar = ({ ratings }) => {
  return (
    <div className="flex text-2xl">
        <img src={Star} className={`h-[16px] ${(ratings >= 1)? "filter-amber-700" : "filter-slate-500"}`} />
        <img src={Star} className={`h-[16px] ${(ratings >= 2)? "filter-amber-700" : "filter-slate-500"}`} />
        <img src={Star} className={`h-[16px] ${(ratings >= 3)? "filter-amber-700" : "filter-slate-500"}`} />
        <img src={Star} className={`h-[16px] ${(ratings >= 4)? "filter-amber-700" : "filter-slate-500"}`} />
        <img src={Star} className={`h-[16px] ${(ratings >= 5)? "filter-amber-700" : "filter-slate-500"}`} />
    </div>
  );
};

export default RatingsStar;
