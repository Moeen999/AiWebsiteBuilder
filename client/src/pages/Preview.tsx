import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectReview from "../components/ProjectReview";
import type { Project } from "../types";

const Preview = () => {
  const { projectId, versionId } = useParams();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchCode = () => {
    setTimeout(() => {
      const code = dummyProjects.find(
        (project) => project.id === projectId
      )?.current_code;
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
    <div className="h-screen">
      {code && (
        <ProjectReview
          isGenerating={false}
          project={{ current_code: code } as Project}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default Preview;
