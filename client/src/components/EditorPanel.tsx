import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedEelemnt: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedEelemnt,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedEelemnt);
  useEffect(() => {
    setValues(selectedEelemnt);
  }, [selectedEelemnt]);

  if (!selectedEelemnt || !values) return null;

  const handleInputChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handleStylesChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-right-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Edit Element</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100  rounded-full"
        >
          <X className="w-4 h-4 text-gray-600 text-shadow-gray-500" />
        </button>
      </div>
      <div className="space-y-4 text-black">
        <div>
          <label className="block text-xs font-medium text-gray-50 mb-1">
            Text Content
          </label>
          <textarea
            value={values.text}
            className="w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none min-h-20"
            onChange={(e) => handleInputChange("text", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-50 mb-1">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            className="w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none min-h-20"
            onChange={(e) => handleInputChange("className", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-50 mb-1">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              className="w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none min-h-20"
              onChange={(e) => handleStylesChange("padding", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-50 mb-1">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              className="w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none min-h-20"
              onChange={(e) => handleStylesChange("margin", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-50 mb-1">
              Font Size
            </label>
            <input
              type="text"
              value={values.styles.fontSize}
              className="w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-200 outline-none min-h-20"
              onChange={(e) => handleStylesChange("fontSize", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-50 mb-1">
              Background
            </label>
            <div className="flex items-center gap-2 border border-gray-400 rounded-md p-1">
              <input
                type="color"
                value={
                  values.styles.backgroundColor === "rgba(0,0,0,0)"
                    ? "#ffffff"
                    : values.styles.backgroundColor
                }
                className="w-6 h-6 cursor-pointer"
                onChange={(e) =>
                  handleStylesChange("backgroundColor", e.target.value)
                }
              />
              <span className="text-xs text-gray-600 truncate">{values.styles.backgroundColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-50 mb-1">
              Text Color
            </label>
            <div className="flex items-center gap-2 border border-gray-400 rounded-md p-1">
              <input
                type="color"
                value={values.styles.color}
                className="w-6 h-6 cursor-pointer"
                onChange={(e) =>
                  handleStylesChange("color", e.target.value)
                }
              />
              <span className="text-xs text-gray-600 truncate">{values.styles.color}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
