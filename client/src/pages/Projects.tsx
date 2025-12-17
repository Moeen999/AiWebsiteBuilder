import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { dummyConversations, dummyProjects } from "../assets/assets";

const Projects = () => {
  const { projectId } = useParams();
  console.log("<>PID<>", projectId);
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIslaoding] = useState(true);
  const [isGenerating, setIsgenerating] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProjectData = async () => {
    const project = dummyProjects.find((project) => project.id === projectId);
    setTimeout(() => {
      if (project) {
        setProject({ ...project, conversation: dummyConversations });
        setIslaoding(false);
        setIsgenerating(project.current_code ? false : true);
      }
    }, 2000);
  };

  useEffect(() => {
    fetchProjectData();
  },[]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-violet-300" />
      </div>
    );
  }
  return project ? (
    <div className="flex flex-col justify-center h-screen w-full bg-gray-900 text-white">
      {/* Builder Navbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollBar">

      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-gray-200">
        Unable To load the Project.
      </p>
    </div>
  );
};

export default Projects;
