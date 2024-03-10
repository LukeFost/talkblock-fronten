// VaultDisplay.tsx
import React from "react";
import Link from "next/link";

interface VaultDisplayProps {
  name: string;
  timeStampCreated: string;
  numberOfPeople: string;
  convoID: number;
}

const VaultDisplay: React.FC<VaultDisplayProps> = ({
  name,
  timeStampCreated,
  numberOfPeople,
  convoID,
}) => {
  return (
    <div className="bg-gray-200 p-4 mb-4">
      <p>Convo Name: {name}</p>
      <p>ID:{convoID}</p>
      <p>Number of Peeps: {numberOfPeople}</p>
      <p>TimeStamp :{timeStampCreated}</p>
      <Link href={`/?convoID=${convoID}`}>
        <button className="btn">Open Chat</button>
      </Link>
    </div>
  );
};

export default VaultDisplay;
