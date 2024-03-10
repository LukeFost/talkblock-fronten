// ChatPage.tsx
"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useReadContract, useAccount } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "../config/index";
import { talk_abi, talk_address } from "./pages/VaultList/TalkBlockABI";
import { buildJson } from "./pages/VaultList/actions";
import { useAtom } from "jotai";
import { globalVaultID } from "./atom";

interface ChatPageProps {
  onConvoIDChange: (convoID: string | null) => void;
  onEventsChange: (events: any[]) => void; // Adjust the type of events as necessary
}

const ChatPage: React.FC<ChatPageProps> = ({
  onConvoIDChange,
  onEventsChange,
}) => {
  // Fetch the maximum lenderID once
  const [vaultID, setVaultID] = useAtom(globalVaultID);
  const { address } = useAccount();

  const searchParams = useSearchParams();
  const convoID = searchParams.get("convoID");

  useEffect(() => {
    onConvoIDChange(convoID);
    const fetchMaxId = async () => {
      console.log(convoID);
      const result = await readContract(config, {
        abi: talk_abi,
        address: talk_address,
        functionName: "getVaults",
        args: [convoID],
      });
      console.log(result[0], "Result of chatPage");
      //   const fetchVaultFunc = async () => {
      //     const res = await readContract(config, {
      //       abi: talk_abi,
      //       address: talk_address,
      //       functionName: "nameUserToVault",
      //       args: [result[0], address],
      //     });

      //     console.log(res, "RESPONSE CHECK");
      //     return res;
      //   };
      //   const val89 = await fetchVaultFunc();
      setVaultID(result[0]);
      const events = await buildJson(result.map((item) => item + ".data"));
      if (typeof onEventsChange === "function") {
        onEventsChange(events);
      } // Notify the parent about the new events!
    };
    fetchMaxId();
  }, [convoID, setVaultID]);

  return <div></div>;
};

export default ChatPage;
