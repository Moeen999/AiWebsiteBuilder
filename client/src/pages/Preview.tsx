import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectReview from "../components/ProjectReview";
import type { Project, Version } from "../types";
import { authClient } from "@/lib/auth-client";
import api from "@/configs/axios";
import { toast } from "sonner";

const Preview = () => {
  const { projectId, versionId } = useParams();
  const { data: session, isPending } = authClient.useSession();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/preview/${projectId}`);
      setCode(data?.project?.current_code);
      if (versionId) {
        data?.project.versions.foreach((ver: Version) => {
          if (ver.id === versionId) {
            setCode(ver.code);
          }
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchCode();
    }
  }, [session?.user]);

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
