import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  EyeIcon,
  EyeOffIcon,
  FullscreenIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";
import {
  dummyConversations,
  dummyProjects,
  dummyVersion,
} from "../assets/assets";
import Sidebar from "../components/Sidebar";
import ProjectReview, {
  type ProjectPreviewRef,
} from "../components/ProjectReview";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIslaoding] = useState(true);
  const [isGenerating, setIsgenerating] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProjectData = async () => {
    const project = dummyProjects.find((project) => project.id === projectId);
    setTimeout(() => {
      if (project) {
        setProject({
          ...project,
          conversation: dummyConversations,
          versions: dummyVersion,
        });
        setIslaoding(false);
        setIsgenerating(project.current_code ? false : true);
      }
    }, 2000);
  };

  useEffect(() => {
    fetchProjectData();
  });

  const saveProject = async () => {};

  // ! dowload html code (index.html)

  const downloadCode = () => {
    const htmlCode = previewRef.current?.getCode || project?.current_code;
    if (!htmlCode) {
      if (isGenerating) {
        return;
      }
      return;
    }
    const elem = document.createElement("a");
    const file = new Blob([htmlCode], { type: "text/html" });
    elem.href = URL.createObjectURL(file);
    elem.download = "index.html";
    document.body.appendChild(elem);
    elem.click()
  };

  const togglePublish = async () => {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="size-7 animate-spin text-violet-300" />
      </div>
    );
  }
  return project ? (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      {/* Builder Navbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2">
        {/* Left topbar */}
        <div className="flex items-center gap-2 sm:min-w-90 text-nowrap no-scrollBar">
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm text-medium capitalize truncate">
              {project.name}
            </p>
            <p className="text-xs text-gray-400 -mt-0.5">
              Preview last saved version
            </p>
          </div>
          <div className="sm:hidden flex flex-1 justify-end">
            {isMenuOpen ? (
              <MessageSquareIcon
                className="size-6 cursor-pointer "
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <XIcon
                className="size-6 cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
        {/* middle topbar */}
        <div className="hidden sm:flex gap-2 bg-gray-950 p-1.5 rounded-md">
          <SmartphoneIcon
            onClick={() => setDevice("mobile")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "mobile" ? "bg-gray-700" : ""
            }`}
          />
          <TabletIcon
            onClick={() => setDevice("tablet")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "tablet" ? "bg-gray-700" : ""
            }`}
          />
          <LaptopIcon
            onClick={() => setDevice("desktop")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "desktop" ? "bg-gray-700" : ""
            }`}
          />
        </div>
        {/* right topbar */}
        <div className="flex items-center justify-end flex-1 gap-3 text-xs sm:text-sm">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="max-sm:hidden bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm  transition-colors border border-gray-700"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <SaveIcon size={16} />
            )}
            Save
          </button>
          <Link
            className="flex items-center gap-2 px-4 py-1 rounded sm:rounded-sm border border-gray-700 hover:border-gray-500  transition-colors"
            target="_blank"
            to={`/preview/${projectId}`}
          >
            <FullscreenIcon size={16} /> Preview
          </Link>
          <button
            onClick={downloadCode}
            className="bg-linear-to-br from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors"
          >
            <ArrowBigDownDashIcon size={16} /> Download
          </button>
          <button
            onClick={togglePublish}
            className="bg-linear-to-br from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors "
          >
            {project.isPublished ? (
              <EyeOffIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
            {project.isPublished ? "UnPublish" : "Publish"}
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        <Sidebar
          isGenerating={isGenerating}
          project={project}
          isMenuOpen={isMenuOpen}
          setIsgenerating={setIsgenerating}
          setProject={(p) => setProject(p)}
        />

        <ProjectReview
          isGenerating={isGenerating}
          ref={previewRef}
          project={project}
          device={device}
        />
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
