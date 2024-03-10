"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";
import { useReadContract } from "wagmi";
import ReadContract from "./readContract";
import ChatDisplay from "./ChatDisplay";

interface Message {
  account: string;
  content: string;
}

export default function App() {
  const { address } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      account: "0x1234567890abcdef",
      content: "Hello, how are you today?",
    },
    {
      account: "0xa1b2c3d4e5f67890",
      content: "I'm good, thanks for asking!",
    },
    {
      account: "0x1234567890abcdef",
      content: "What are you up to?",
    },
    {
      account: "0xa1b2c3d4e5f67890",
      content: "Just doing some coding.",
    },
    {
      account: "0xa1b2c3d4e5f67890",
      content: "I can smell ya",
    },
    {
      account: "0x1234567890abcdef",
      content: "ayo bruh wtf",
    },
  ]);

  const [newFile, setNewFile] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const handleNewFile = (file: string) => {
    setNewFile(file);
  };

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const currentAccount = "0x1234567890abcdef";

  useEffect(() => {
    if (newMessage !== "") {
      const newMessageObj = {
        account: currentAccount,
        content: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage(""); // Reset newMessage to avoid duplicate appends
    }
  }, [newMessage, currentAccount]);

  return (
    <main>
      <ReadContract />
      <ConnectButton />
      <div className="w-full flex justify-center">
        <ChatDisplay
          messages={messages}
          currentAccount={currentAccount}
          onNewFile={handleNewFile}
          onNewMessage={handleNewMessage}
        />
      </div>
    </main>
  );
}
