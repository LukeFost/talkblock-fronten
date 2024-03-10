"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useSignMessage } from "wagmi";
import ConnectButton from "./ConnectButton";
import { useReadContract } from "wagmi";
import ReadContract from "./readContract";
import ChatDisplay from "./ChatDisplay";
import {
  createVault,
  writeText,
  listEvents,
  getEventText,
} from "./pages/VaultList/actions";
import { type UseSignMessageReturnType } from "wagmi";
import { Hash } from "viem";
import { useAtom } from "jotai";
import { globalVaultID } from "./atom";
import { talk_abi, talk_address } from "./pages/VaultList/TalkBlockABI";

interface Message {
  account: string;
  content: string;
}

export default function App() {
  const { address } = useAccount();
  const { signMessage, data, status } = useSignMessage();
  //Message and Inital States
  const [messages, setMessages] = useState<Message[]>([]);

  // callback states
  const [newFile, setNewFile] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  // Global States
  const [vaultID, setVaultID] = useAtom(globalVaultID);
  const [cache, setCache] = useState<number>(100);

  const [pendingNewMessage, setPendingNewMessage] = useState("");
  const [signatureData, setSignatureData] = useState<Hash>();

  const handleNewFile = (file: string) => {
    setNewFile(file);
  };

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const currentAccount = "0x1234567890abcdef";
  useEffect(() => {
    console.log(vaultID, "Vault ID");
  }, [vaultID]);

  useEffect(() => {
    if (newFile == "plus") {
      if (address != undefined) {
        createVault(vaultID + ".data", address, cache);
        console.log("Creating A Vault...");
        console.log(vaultID, address, cache);
      }
    }
  }, [newFile]);

  useEffect(() => {
    if (newMessage !== "") {
      const newMessageObj = {
        account: currentAccount,
        content: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      const handleSignature = async () => {
        setPendingNewMessage("~" + newMessage);
        await signMessage({ message: "~" + newMessage });
      };
      handleSignature();
      setNewMessage(""); // Reset newMessage to avoid duplicate appends
    }
  }, [newMessage, currentAccount, signMessage, data]);

  useEffect(() => {
    if (status == "success") {
      console.log("success!");
      setSignatureData(data);
    }
  }, [status]);

  useEffect(() => {
    console.log(pendingNewMessage, "Message Hashed!");
    console.log(signatureData, "signature Hash");
    const handleSignMake = async () => {
      let sig = signatureData;
      let sigString = sig.substring(2);
      let lastTwoChars = sigString.slice(-2);
      let decimalValue = parseInt(lastTwoChars, 16);

      decimalValue -= 0x1b;

      if (decimalValue < 0) {
        decimalValue = 0;
      }

      let adjustedHex = decimalValue.toString(16);

      adjustedHex = adjustedHex.padStart(2, "0");

      sigString = sigString.substring(0, sigString.length - 2) + adjustedHex;
      const prefix = `\x19Ethereum Signed Message:\n${pendingNewMessage.length}`;
      const newMessage = prefix + pendingNewMessage;
      console.log(
        vaultID + ".data",
        "|",
        newMessage,
        "|",
        Date.now(),
        "|",
        sigString
      );
      await writeText(vaultID + ".data", newMessage, Date.now(), sigString);
    };
    if (!signatureData) return;
    else handleSignMake();
  }, [pendingNewMessage, signatureData]);

  useEffect(() => {
    async function getJiggy() {
      const events = await listEvents(vaultID + ".data");
      console.log(events);
      const getMsg = await getEventText(events[0].cid);
      console.log(getMsg);
    }
    if (!vaultID) return;
    else getJiggy();
  }, [signatureData, vaultID]);

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
