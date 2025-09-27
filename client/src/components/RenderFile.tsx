import { IFile } from 'libs/types';
import React, { FunctionComponent } from 'react';
import { Sparkles } from 'lucide-react';
import { sizeInMb } from 'libs/sizeInMb';

const RenderFile: FunctionComponent<{ file: IFile }> = ({ file: { format, sizeInBytes, name } }) => {
  const getFileIcon = (format: string) => {
    // You can keep your existing image icons or use emojis as fallback
    const iconMap: { [key: string]: string } = {
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'mp3': '🎵',
      'default': '📄'
    };
    return iconMap[format] || iconMap['default'];
  };

  return (
    <div className="w-full p-4 animate-slideIn">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50">
        <div className="flex items-center space-x-4">
          {/* File Icon - You can switch between image and emoji */}
          <div className="relative">
            <img 
              src={`/images/${format}.png`} 
              alt={format}
              className="w-14 h-14 animate-pulse"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="hidden text-4xl animate-bounce">
              {getFileIcon(format)}
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-white font-semibold truncate animate-slideIn" style={{animationDelay: '0.1s'}}>
              {name}
            </p>
            <p className="text-gray-400 text-sm animate-slideIn" style={{animationDelay: '0.2s'}}>
              {sizeInMb(sizeInBytes)} • {format.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Animated progress bar effect */}
        <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-slideIn" style={{animationDelay: '0.3s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default RenderFile;