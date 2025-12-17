import { forwardRef, useRef } from "react";
import type { Project } from "../types";
import { iframeScript } from "../assets/assets";

interface ProjectPreviewProps {
  project: Project;
  isGenerating: boolean;
  device?: "mobile" | "tablet" | "desktop";
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}
const ProjectReview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  (
    { isGenerating, project, device = "desktop", showEditorPanel = true },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const injectPreview = (html: string) => {
      if (!html) return "";
      if (!showEditorPanel) return html;

      if (html.includes("</body>")) {
        return html.replace("</body>", iframeScript);
      }
    };
    const resolutions = {
      mobile: "w-[412px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    return (
      <div className="relative h-full bg-gray-900 rounded-xl flex-1 overflow-hidden max-sm:ml-2">
        {project.current_code ? (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`h-full max-sm:w-full mx-auto transition-all ${resolutions[device]}`}
            ></iframe>
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }
);

export default ProjectReview;
