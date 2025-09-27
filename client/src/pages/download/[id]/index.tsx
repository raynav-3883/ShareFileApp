import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import axios from 'axios';
import RenderFile from '@components/RenderFile';
import { IFile } from 'libs/types';
import fileDownload from 'js-file-download';
import { Download } from 'lucide-react';
const DownloadPage: NextPage<{
  file: IFile;
}> = ({ file: { format, name, sizeInBytes, id, filename } }) => {
  const handleDownload = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}/download`, {
      responseType: "blob",
    });
    fileDownload(data, name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-4 relative">
      {/* Floating particles background */}
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

      <div className="relative z-10 bg-gray-800/60 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center space-y-6 animate-fadeIn">
        {!id ? (
          <span className="text-white text-lg font-medium">Oops! File does not exist. Check the URL 😢</span>
        ) : (
          <>
            <img
              src="/images/file-download.png"
              alt="Download icon"
              className="w-20 h-20 mx-auto animate-bounce"
            />
            <h1 className="text-2xl font-bold text-white drop-shadow-md">Your file is ready to download! 🚀</h1>
            <RenderFile file={{ format, name, sizeInBytes, id, filename: filename ?? name }} />
            <button
              onClick={handleDownload}
              className="
                flex items-center justify-center space-x-2 px-6 py-3
                bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700
                text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25
              "
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
    file = data;
  } catch (error: any) {
    console.log(error?.response?.data);
    file = {};
  }

  return {
    props: {
      file,
    },
  };
}
