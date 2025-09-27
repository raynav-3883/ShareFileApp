import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 m-4 max-w-md w-full shadow-2xl animate-slideIn transform relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 animate-slideIn">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="animate-slideIn" style={{animationDelay: '0.1s'}}>
            {children}
          </div>
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default Modal;