import {
  CircleIcon,
  ScanLineIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request..." },
  { icon: SquareIcon, label: "Generating layout structure..." },
  { icon: TriangleIcon, label: "Assembling UI components..." },
  { icon: CircleIcon, label: "Finalizing your website..." },
];

const STEP_DURATION = 45000;

const LoaderSteps = () => {
  return (
    <div className="w-full h-full justify-center items-center bg-gray-900 gap-3 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-fuchsia-500/10 blur-3xl animate-pulse"></div>
      <div className="relative z-10 w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-30" />
        <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-30" />
        <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-30" />
      </div>
    </div>
  );
};

export default LoaderSteps;
