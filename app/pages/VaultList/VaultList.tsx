// VaultList.tsx
"use client";
import React, { useEffect, useState } from "react";
import VaultDisplay from "./VaultDisplay";
import { createVault } from "./actions";
import { useAccount } from "wagmi";
import { useWriteContract, useReadContract } from "wagmi";
import { talk_abi, talk_address } from "./TalkBlockABI";
import { type UseWriteContractReturnType } from "wagmi";
import { useAtom } from "jotai";
import { globalVaultID, globalUserChatLength } from "../../atom";
import ReadUserChats from "@/app/readUserChats";

interface Vault {
  name: string;
  timeStampCreated: string;
  numberOfPeople: string;
  convoID: number;
}
const VaultList: React.FC = () => {
  const { address } = useAccount();
  const [vaults, setVaults] = useState<Vault[]>([]);
  const { data, error, status, writeContract } = useWriteContract();
  const [vaultID, setVaultID] = useAtom(globalVaultID);
  const [cache, setCache] = useState(90);
  const [userChatLength, setUserChatLength] = useAtom(globalUserChatLength);

  const [newVaultName, setNewVaultName] = useState();
  const [desiredVaultID, setDesiredVaultID] = useState();

  useEffect(() => {
    const updatedVaults: Vault[] = userChatLength.map((chat) => {
      const date = new Date(Number(chat[1].toString()) * 1000);
      const timeStampCreated = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;

      return {
        name: chat[0],
        timeStampCreated: timeStampCreated,
        numberOfPeople: chat[2].toString(),
        convoID: chat[3],
      };
    });
    setVaults(updatedVaults);
    setNewVaultName(vaultID);
  }, [userChatLength]);

  const handleSubmit = async () => {
    if (address == undefined) return;
    if (vaultID == userChatLength[0] && desiredVaultID) {
      try {
        const response = await writeContract({
          abi: talk_abi,
          address: talk_address,
          functionName: "joinChat",
          args: [newVaultName, desiredVaultID],
        });
        console.log("Vault Joined Successfully:", response);
      } catch (error) {
        console.error("Error Joining vault:", error);
      }
    } else {
      if (address != undefined) {
        try {
          const response = await createVault(vaultID + ".data", address, cache);
          console.log("Vault created successfully:", response);
          if (response) {
            try {
              const res = await writeContract({
                abi: talk_abi,
                address: talk_address,
                functionName: "createChat",
                args: [[vaultID], vaultID],
              });
              console.log(res, "Create Chat Complete");
            } catch (error) {
              console.error("Error creating Chat", error);
            }
          }
        } catch (error) {
          console.error("Error creating vault:", error);
        }
      }
    }
  };

  const handleCreate = async () => {
    const result = await writeContract({
      abi: talk_abi,
      address: talk_address,
      functionName: "createChat",
      args: [[vaultID], vaultID],
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col items-center">
      {vaults.map((vault, index) => (
        <div key={index} className="flex items-center mb-4">
          <span className="mr-4">{index + 1}</span>
          <VaultDisplay
            name={vault.name}
            timeStampCreated={vault.timeStampCreated}
            numberOfPeople={vault.numberOfPeople}
            convoID={index} // Pass the index as convoID
          />
        </div>
      ))}
      <ReadUserChats address={address} />
      <div>
        <input
          type="text"
          placeholder="Vault ID"
          value={vaultID}
          onChange={(e) => setVaultID(e.target.value)}
        />
        <input
          type="hidden"
          placeholder="240"
          value={cache}
          className="input max-w-xs"
          onChange={(e) => setCache(parseInt(e.target.value))}
        />
        <input
          type="number"
          onChange={(e) => setDesiredVaultID(BigInt(e))}
        ></input>
        <button className="btn" onClick={handleSubmit}>
          Enter
        </button>
        <br />
        <button className="btn" onClick={() => handleCreate()}>
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default VaultList;
