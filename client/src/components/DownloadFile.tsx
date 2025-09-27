import React, { useState } from "react";
import Modal from "@components/Modal";
import { CheckCircle, Copy, Link } from "lucide-react";

interface Props {
  downloadPageLink: string;
}

const DownloadFile: React.FC<Props> = ({ downloadPageLink }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadPageLink);
    setCopied(true);
    setShowModal(true);
    
    // Reset copied state after animation
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full animate-slideIn">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 animate-pulse" />
          <div>
            <h3 className="text-xl font-bold animate-slideIn">Upload Successful!</h3>
            <p className="text-green-100 text-sm animate-slideIn" style={{animationDelay: '0.1s'}}>
              Your file is ready to share
            </p>
          </div>
        </div>
        
        <p className="text-lg font-medium text-center mb-4 animate-slideIn" style={{animationDelay: '0.2s'}}>
          Share this link with anyone to download your file.
        </p>

        <div className="space-y-4">
          {/* Enhanced link display */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="flex items-center space-x-2 mb-2">
              <Link className="w-4 h-4" />
              <span className="text-sm font-medium">Download Link</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/10 rounded-lg p-2">
                <span className="text-sm break-all font-mono">
                  {downloadPageLink}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${copied 
                    ? 'bg-white text-green-600 scale-105' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }
                `}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alternative: Keep your original copy icon if you prefer */}
          {/* 
          <div className="flex space-x-3 items-center justify-center">
            <span className="break-all text-sm bg-white/20 p-3 rounded-lg text-white max-w-xs overflow-hidden backdrop-blur-sm">
              {downloadPageLink}
            </span>
            <img
              src="/images/copy.png"
              alt="Copy link"
              className="w-8 h-8 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={handleCopy}
            />
          </div>
          */}
        </div>

        {/* Success animation */}
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-slideIn" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Link Copied!">
        <p className="text-gray-700">The download link has been copied to your clipboard. You can now share it with anyone!</p>
      </Modal>
    </div>
  );
};

export default DownloadFile;