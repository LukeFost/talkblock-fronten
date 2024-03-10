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
import { talk_abi, talk_address } from "./pages/VaultList/TalkBlockABI";
import ChatPage from "./ChatPage";
import { useAtom } from "jotai";
import { globalVaultID } from "./atom";
import Link from "next/link";

interface Message {
  account: string;
  content: string;
}

export default function App() {
  const { address } = useAccount();
  const { signMessage, data, status } = useSignMessage();
  const [getConvoIDValue, setGetConvoIDValue] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  //Message and Initial States
  const [messages, setMessages] = useState<Message[]>([]);

  // callback states
  const [newFile, setNewFile] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  // Local state for connected vault ID
  const [connectedVaultID, setConnectedVaultID] = useAtom(globalVaultID);

  const [cache, setCache] = useState<number>(100);
  const [pendingNewMessage, setPendingNewMessage] = useState("");
  const [signatureData, setSignatureData] = useState<Hash>();

  const handleNewFile = (file: string) => {
    setNewFile(file);
  };

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  // now we have convoID in this state var: getConvoIDValue
  // we want to get the vaultID that is set by chatpage.tsx,
  //

  useEffect(() => {
    console.log(connectedVaultID, "Connected Vault ID");
  }, [connectedVaultID]);

  useEffect(() => {
    if (newFile === "plus" && address) {
      createVault(connectedVaultID + ".data", address, cache);
      console.log("Creating A Vault...");
      console.log(connectedVaultID, address, cache);
    }
  }, [newFile, address, connectedVaultID, cache]);

  useEffect(() => {
    if (newMessage !== "") {
      const newMessageObj = { account: address || "", content: newMessage };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);

      const handleSignature = async () => {
        setPendingNewMessage("~" + newMessage);
        await signMessage({ message: "~" + newMessage });
      };

      handleSignature();
      setNewMessage(""); // Reset newMessage to avoid duplicate appends
    }
  }, [newMessage, address, signMessage]);

  useEffect(() => {
    if (status === "success") {
      // Trigger rehydration of ChatDisplay by updating messages state
      const newMessageObj = {
        account: address || "",
        content: pendingNewMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);

      // Re-check events after a specified timeout
      setTimeout(() => {
        // Your logic to re-fetch or re-check events
        // You might want to call a function here that updates the `events` state
      }, 2000); // Adjust the timeout as needed
    }
  }, [status, pendingNewMessage, address]);

  useEffect(() => {
    if (status === "success") {
      console.log("success!");
      setSignatureData(data);
    }
  }, [status, data]);

  useEffect(() => {
    console.log(pendingNewMessage, "Message Hashed!");
    console.log(signatureData, "signature Hash");
    const handleSignMake = async () => {
      if (!signatureData) return;

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
        connectedVaultID + ".data",
        "|",
        newMessage,
        "|",
        Date.now(),
        "|",
        sigString
      );
      await writeText(
        connectedVaultID + ".data",
        newMessage,
        Date.now(),
        sigString
      );
    };
    handleSignMake();
  }, [pendingNewMessage, signatureData, connectedVaultID]);

  // useEffect(() => {
  //   async function getJiggy() {
  //     if (!connectedVaultID) return;

  //     // const events = await listEvents(connectedVaultID + ".data");
  //     // console.log(events);
  //     // if (events.length > 0) {
  //     //   const getMsg = await getEventText(events[0].cid);
  //     //   console.log(getMsg);
  //     // }
  //   }
  //   getJiggy();
  // }, [signatureData, connectedVaultID]);

  const handleConvoIDChange = (convoID: string | null) => {
    setGetConvoIDValue(convoID);
    // get the router value ?convoid=0
  };

  const handleEventsChange = (events: any) => {
    const newMessages: Message[] = events
      .map((event: any) => ({
        account: event.vaultID,
        content: event.info,
      }))
      .reverse();
    setMessages(newMessages);
  };

  return (
    <main>
      <ConnectButton />
      <Link className="btn" href="/pages/VaultList">
        Vault Search
      </Link>
      <div className="w-full flex justify-center">
        <ChatDisplay
          messages={messages}
          currentAccount={address || ""} //set this to the vaultNameplz
          onNewFile={handleNewFile}
          onNewMessage={handleNewMessage}
        />
      </div>
      <ChatPage
        onConvoIDChange={handleConvoIDChange}
        onEventsChange={handleEventsChange}
      />
      {/* Outputting the convoID value when its clicked and handling it at that funciton */}
    </main>
  );
}
