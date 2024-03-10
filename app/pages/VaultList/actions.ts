// actions.ts
"use server";
import axios from "axios";
import qs from "querystring";
import { Hash } from "viem";

export async function createVault(
  vaultID: string,
  account: `0x${string}` | undefined,
  cache: number
): Promise<any> {
  try {
    const data = {
      account: account,
    };

    if (cache !== undefined) {
      data.cache = cache.toString();
    }

    const response = await axios.post(
      `https://basin.tableland.xyz/vaults/${vaultID}`,
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating vault:", error);
    throw error;
  }
}

export async function writeText(
  vaultId: string,
  text: string,
  timestamp: number,
  signature: Hash
) {
  try {
    const url = `https://basin.tableland.xyz/vaults/${vaultId}/events?timestamp=${timestamp}&signature=${signature}`;

    const response = await axios.post(url, text, {
      headers: {
        "Content-Type": "application/octet-stream",
        filename: "randText.txt",
      },
    });

    console.log("Write response:", response.data);
  } catch (error) {
    console.error("Error writing event:", error);
  }
}
