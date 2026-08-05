import React from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  return (
    <Link
      className="resume-card animate-in duration-1000 fade-in"
      to={`/resume/${id}`}
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold wrap-break-word text-black">
            {companyName}
          </h2>
          <h3 className="text-lg wrap-break-word text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="animate-in gradient-border duration-1000 fade-in">
        <div className="h-full w-full">
          <img
            src={imagePath}
            alt="resume"
            className="h-[350px] w-full object-cover object-top max-sm:h-[200px]"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
