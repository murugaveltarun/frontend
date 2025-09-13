import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const publicToast = {
  success: (message) =>
    toast(message, {
      unstyled: true,
      className: "bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2",
      style: { backgroundColor: "#1f1f1f", color: "#ffffff" },
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    }),
  error: (message) =>
    toast(message, {
      unstyled: true,
      className: "bg-gray-900 text-white border border-red-500 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2",
      style: { backgroundColor: "#1f1f1f", color: "#ffffff" },
      icon: <XCircle className="text-red-400 w-5 h-5" />,
    }),
};
