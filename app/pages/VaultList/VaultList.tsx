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
}

const VaultList: React.FC = () => {
  const { address } = useAccount();
  const [vaults, setVaults] = useState<Vault[]>([]);
  const { data, error, status, writeContract } = useWriteContract();
  const [vaultID, setVaultID] = useAtom(globalVaultID);
  const [cache, setCache] = useState(90);
  const [userChatLength, setUserChatLength] = useAtom(globalUserChatLength);

  useEffect(() => {
    const updatedVaults: Vault[] = userChatLength.map((chat) => ({
      name: chat[0],
      timeStampCreated: chat[1],
      numberOfPeople: chat[2],
    }));
    setVaults(updatedVaults);
  }, [userChatLength]);

  const handleSubmit = async () => {
    if (address != undefined) {
      try {
        const response = await createVault(vaultID + ".data", address, cache);
        console.log("Vault created successfully:", response);
      } catch (error) {
        console.error("Error creating vault:", error);
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
    <div>
      <h3>{address}</h3>
      {vaults.map((vault, index) => (
        <div key={index} className="flex items-center mb-4">
          <span className="mr-4">{index + 1}</span>
          <VaultDisplay
            name={vault.name}
            timeStampCreated={vault.timeStampCreated}
            numberOfPeople={vault.numberOfPeople}
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
          type="number"
          placeholder="90"
          value={cache}
          onChange={(e) => setCache(parseInt(e.target.value))}
        />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <button onClick={() => handleCreate()}>Create Chat</button>
      </div>
    </div>
  );
};

export default VaultList;
