// VaultDisplay.tsx
import React from "react";

interface VaultDisplayProps {
  lastMessage: string;
  account: string;
}

const VaultDisplay: React.FC<VaultDisplayProps> = ({
  lastMessage,
  account,
}) => {
  return (
    <div className="bg-gray-200 p-4 mb-4">
      <p>Last Message: {lastMessage}</p>
      <p>Account: {account}</p>
    </div>
  );
};

export default VaultDisplay;
