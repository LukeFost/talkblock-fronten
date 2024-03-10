// ChatDisplay.tsx
import React, { useEffect, useRef } from "react";
import DynamicInput from "./DynamicInput";
import SpeechBubble from "./SpeechBubble";

interface Message {
  account: string;
  content: string;
}

interface ChatDisplayProps {
  messages: Message[];
  currentAccount: string;
  onNewFile: (file: string) => void;
  onNewMessage: (message: string) => void;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  messages,
  currentAccount,
  onNewFile,
  onNewMessage,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex justify-center pt-5 sm:pt-0 w-full">
      <div className="bg-white w-full max-w-2xl p-4 h-[calc(100vh-200px)] flex flex-col justify-between rounded-lg shadow-lg">
        <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {messages.map((message, index) => (
            <SpeechBubble
              key={index}
              content={message.content}
              isCurrentUser={message.account === currentAccount}
              account={message.account}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-center mt-4">
          <DynamicInput newFile={onNewFile} newMessage={onNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatDisplay;
