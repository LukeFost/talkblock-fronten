// VaultDisplay.tsx
import React from "react";

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
    </div>
  );
};

export default VaultDisplay;
