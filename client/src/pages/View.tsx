import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectReview from "../components/ProjectReview";
import type { Project } from "../types";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCode = () => {
    const code = dummyProjects.find(
      (project) => project.id === projectId
    )?.current_code;

    setTimeout(() => {
      if (code) {
        setCode(code);
        setIsLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    fetchCode();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-indigo-200" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      {code && <ProjectReview project={{current_code:code} as Project} isGenerating={false} showEditorPanel={false}/>}
    </div>
  );
};

export default View;
