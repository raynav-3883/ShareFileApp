import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IFile } from 'libs/types';
import { sizeInMb } from 'libs/sizeInMb';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  setFile: (file: IFile, rawFile: File) => void;
}

const DropZoneComponent: React.FC<DropZoneProps> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formattedFile: IFile = {
      name: file.name,
      filename: file.name,
        sizeInBytes: file.size, // raw bytes

      format: file.type.split('/')[1],
    };

    setFile(formattedFile, file);
    console.log(formattedFile);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'audio/mpeg': ['.mp3'],
    },
  });

  return (
    <div className="w-full p-6 relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div
        {...getRootProps()}
        className={`
          relative w-full rounded-2xl cursor-pointer h-80 focus:outline-none transition-all duration-700 ease-out
          bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800
          hover:from-pink-500 hover:via-violet-500 hover:to-indigo-600
          shadow-2xl hover:shadow-purple-500/25
          border-2 border-transparent hover:border-white/30
          transform hover:scale-[1.02] hover:-rotate-1
          ${isDragReject ? 'scale-105 border-red-400 shadow-red-400/30' : ''}
          ${isDragAccept ? 'scale-105 border-green-400 shadow-green-400/30' : 'border-4 border-dashed border-white/50'}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center h-full text-white relative z-10">
          {/* Animated upload icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20">
              {/* Use your folder image or the Upload icon */}
              <img
                src="/images/folder.png"
                alt="folder"
                className={`w-12 h-12 transition-all duration-500 ${isDragAccept ? 'animate-bounce' : 'animate-pulse'}`}
              />
            </div>
          </div>

          {isDragReject ? (
            <div className="text-center animate-fadeIn">
              <p className="text-2xl font-bold mb-2 text-red-300">Sorry, only JPEG, PNG, and MP3 supported</p>
              <p className="text-red-200 font-semibold">Please choose a different file</p>
            </div>
          ) : isDragAccept ? (
            <div className="text-center animate-fadeIn">
              <p className="text-2xl font-bold mb-2 animate-pulse">Drop it like it's hot! 🔥</p>
              <p className="text-green-300 font-semibold">Release to upload</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-2xl font-bold mb-2 animate-fadeIn">Drop your file here or click to select</p>
              <p className="text-lg text-gray-200 animate-slideUp">Only jpeg, png, and mp3 files are supported</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 animate-slideUp" style={{animationDelay: '0.2s'}}>
                <span>Supports:</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">JPEG</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">PNG</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">MP3</span>
              </div>
            </div>
          )}
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default DropZoneComponent;