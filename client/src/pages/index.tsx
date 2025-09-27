import { useState } from "react";
import axios from "axios";
import DropZoneComponent from "@components/DropZoneComponent";
import RenderFile from "@components/RenderFile";
import DownloadFile from "@components/DownloadFile";
import { IFile } from "libs/types";
import Modal from "@components/Modal";
import { Upload, RefreshCw, XCircle } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<IFile | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [downloadPageLink, setDownloadPageLink] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleUpload = async () => {
    if (uploadState === "Uploading" || !file || !rawFile) return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", rawFile, file.name);

    try {
      const { data } = await axios.post("api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setModalMessage("File uploaded successfully! You can now copy and share the link below.");
      setShowModal(true);

      setTimeout(() => {
        setDownloadPageLink(data.downloadPageLink);
        setUploadState("Uploaded");
      }, 500);

    } catch (error: any) {
      console.log(error.response?.data);
      setUploadState("Upload Failed");
      setModalMessage("Upload failed! Please try again.");
      setShowModal(true);
    }
  };

  const resetComponent = () => {
    setFile(null);
    setRawFile(null);
    setDownloadPageLink(null);
    setUploadState("Upload");
  };

  const getUploadButtonContent = () => {
    switch (uploadState) {
      case "Uploading":
        return (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Uploading...</span>
          </>
        );
      case "Upload Failed":
        return (
          <>
            <XCircle className="w-5 h-5" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Upload className="w-5 h-5" />
            <span>Upload File</span>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slideDown">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
  Got a file? Share it like a secret agent! ✨
</h1>

          <p className="text-xl text-gray-300 animate-fadeIn" style={{animationDelay: '0.3s'}}>
            Drop, upload, and share your files with style
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          {!downloadPageLink && (
            <DropZoneComponent
              setFile={(formattedFile, originalFile) => {
                setFile(formattedFile);
                setRawFile(originalFile);
              }}
            />
          )}

          {file && (
            <RenderFile
              file={{
                format: file.format,
                name: file.name,
                sizeInBytes: file.sizeInBytes,
                filename: file.filename,
                id: "",
              }}
            />
          )}

          {file && !downloadPageLink && (
            <div className="p-6 flex justify-center animate-slideIn">
              <button
                className={`
                  flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${uploadState === "Uploading" 
                    ? 'bg-orange-500 text-white cursor-not-allowed' 
                    : uploadState === "Upload Failed"
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25'
                  }
                `}
                onClick={handleUpload}
                disabled={uploadState === "Uploading"}
              >
                {getUploadButtonContent()}
              </button>
            </div>
          )}

          {downloadPageLink && (
            <div className="p-6 space-y-4">
              <DownloadFile downloadPageLink={downloadPageLink} />
              <div className="flex justify-center">
                <button
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  onClick={resetComponent}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Upload New File</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Message">
        <p className="text-gray-700">{modalMessage}</p>
      </Modal>
    </div>
  );
}