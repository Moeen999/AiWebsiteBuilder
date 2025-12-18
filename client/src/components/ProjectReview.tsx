import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Project } from "../types";
import { iframeScript } from "../assets/assets";
import EditorPanel from "./EditorPanel";

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
    const [selectedEelemnt, setSelectedElement] = useState<any>(null);

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "ELEMENT_SELECTED") {
          setSelectedElement(event.data.payload);
        } else if (event.data.type === "CLEAR_SELECTION") {
          setSelectedElement(null);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleUpdate = (updates: any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "UPDATE_ELEMENT",
            payload: updates,
          },
          "*"
        );
      }
    };

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

    useImperativeHandle(ref, () => ({
      getCode: () => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return undefined;
        //! remove classes
        doc
          .querySelectorAll(".ai-selected-element,[data-ai-selected]")
          .forEach((elem) => {
            elem.classList.remove("ai-selected-element");
            elem.removeAttribute("data-ai-selected");
            (elem as HTMLElement).style.outline = "";
          });

        //! remove injected script + styles 
        const previewScript = doc.getElementById("ai-preview-script");
        if (previewScript) return previewScript.remove();

        const previewStyles = doc.getElementById("ai-preview-style");
        if (previewStyles) return previewStyles.remove();

        //! clean html searialization
        const html = doc.documentElement.outerHTML;
        return html;
      },
    }));

    return (
      <div className="relative h-full bg-gray-900 rounded-xl flex-1 overflow-hidden max-sm:ml-2">
        {project.current_code ? (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`h-full max-sm:w-full mx-auto transition-all ${resolutions[device]}`}
            />
            {showEditorPanel && selectedEelemnt && (
              <EditorPanel
                selectedEelemnt={selectedEelemnt}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null);
                  if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage(
                      {
                        type: "CLEAR_SELECTION_REQUEST",
                      },
                      "*"
                    );
                  }
                }}
              />
            )}
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }
);

export default ProjectReview;
