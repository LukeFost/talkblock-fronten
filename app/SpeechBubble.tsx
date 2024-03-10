// SpeechBubble.tsx
import React, { useState } from "react";
import Image from "next/image";

interface SpeechBubbleProps {
  account: string;
  content: string;
  isCurrentUser: boolean;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  account,
  content,
  isCurrentUser,
}) => {
  const bubbleClasses = isCurrentUser
    ? "bg-blue-500 text-white self-end"
    : "bg-gray-300 text-black self-start";
  const [thisAccount, setThisAccount] = useState(account);

  const renderContent = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        if (part.match(/\.(gif|jpg|jpeg|png)$/i)) {
          return (
            <div key={index} className="relative w-full h-60">
              <Image
                src={part}
                alt="Message Image"
                width={250}
                height={250}
                unoptimized
              />
            </div>
          );
        } else {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {part}
            </a>
          );
        }
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div
      className={`${bubbleClasses} rounded-lg p-2 mb-2 max-w-[45%] max-h-60 break-words ${
        isCurrentUser ? "ml-auto" : "mr-auto"
      }`}
    >
      <div className="text-sm font-medium mb-1 hover:font-bold">
        {thisAccount ? account.substring(0, 6) : ""}...
      </div>
      {renderContent()}
    </div>
  );
};

export default SpeechBubble;
