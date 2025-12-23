import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectReview from "../components/ProjectReview";
import type { Project } from "../types";
import api from "@/configs/axios";
import { toast } from "sonner";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/published/${projectId}`);
      setCode(data.code);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
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
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default View;
