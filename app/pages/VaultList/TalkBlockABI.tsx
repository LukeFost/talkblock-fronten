export const talk_address = "0x57967CEFbD8686b99De28CF54406C1EB18373A19";
// export const talk_abi = [
//   {
//     inputs: [
//       {
//         internalType: "string[]",
//         name: "firstVault",
//         type: "string[]",
//       },
//       {
//         internalType: "string",
//         name: "_name",
//         type: "string",
//       },
//     ],
//     name: "createChat",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "myVault",
//         type: "string",
//       },
//       {
//         internalType: "uint256",
//         name: "desiredID",
//         type: "uint256",
//       },
//     ],
//     name: "joinChat",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "desiredID",
//         type: "uint256",
//       },
//     ],
//     name: "leaveChat",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "groupID",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "idToChat",
//     outputs: [
//       {
//         internalType: "string",
//         name: "name",
//         type: "string",
//       },
//       {
//         internalType: "uint256",
//         name: "timeCreated",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "people",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "userChats",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ] as const;

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
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getAllUserChats",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserChatLength",
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
        name: "gID",
        type: "uint256",
      },
    ],
    name: "getVaultLength",
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
        name: "gID",
        type: "uint256",
      },
    ],
    name: "getVaults",
    outputs: [
      {
        internalType: "string[]",
        name: "vaults",
        type: "string[]",
      },
    ],
    stateMutability: "view",
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
