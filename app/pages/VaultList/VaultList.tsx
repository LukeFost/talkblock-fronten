// VaultList.tsx
"use client";
import React, { useState } from "react";
import VaultDisplay from "./VaultDisplay";
import { createVault } from "./actions";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { talk_abi, talk_address } from "./TalkBlockABI";
import { type UseWriteContractReturnType } from "wagmi";
import { useAtom } from "jotai";
import { globalVaultID } from "../../atom";

interface Vault {
  id: string;
  lastMessage: string;
  account: string;
}

const VaultList: React.FC = () => {
  const [vaults, setVaults] = useState<Vault[]>([
    { id: "vault1", lastMessage: "Hello", account: "0x1234567890" },
    { id: "vault2", lastMessage: "Hi there", account: "0x0987654321" },
  ]);

  const { data, error, status, writeContract } = useWriteContract();

  const { address } = useAccount();
  const [vaultID, setVaultID] = useAtom(globalVaultID);
  const [cache, setCache] = useState(0);

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
        <div key={vault.id} className="flex items-center mb-4">
          <span className="mr-4">{index + 1}</span>
          <VaultDisplay
            lastMessage={vault.lastMessage}
            account={vault.account}
          />
        </div>
      ))}

      <div>
        <input
          type="text"
          placeholder="Vault ID"
          value={vaultID}
          onChange={(e) => setVaultID(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cache"
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
