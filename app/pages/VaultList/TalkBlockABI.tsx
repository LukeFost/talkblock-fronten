export const talk_address = "0x014c7c05C883Cd99dea43FC23959C9a8550c8F3a";
export const talk_abi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "firstVault",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "createChat",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "myVault",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "desiredID",
        type: "uint256",
      },
    ],
    name: "joinChat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "desiredID",
        type: "uint256",
      },
    ],
    name: "leaveChat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "groupID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToChat",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeCreated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "people",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userChats",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
