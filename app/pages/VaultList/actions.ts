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

export async function listEvents(vaultId: string) {
  try {
    const url = `https://basin.tableland.xyz/vaults/${vaultId}/events`;
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("Events:", response.data);
      return response.data; // This is an array of events
    } else {
      console.error(
        "Failed to list events:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error listing events:", error);
    return null;
  }
}

export async function getEventText(eventID: string) {
  try {
    const url = `https://basin.tableland.xyz/events/${eventID}`;
    const response = await axios.get(url, { responseType: "text" });
    // console.log(response);
    let data = response.data;
    if (response.status === 200) {
      const contentDisposition = response.headers["content-disposition"];
      let filename = null;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      if (!filename) {
        console.error("Filename not found in Content-Disposition");
        return null;
      }
      let extension = null;
      // console.log(filename);
      //Add more file extension types here
      if (filename.endsWith(".jpg")) {
        extension = ".jpg";
      } else if (filename.endsWith(".txt")) {
        extension = ".txt";
      } else if (filename.endsWith(".gif")) {
        extension = ".gif";
      } else {
        console.error("Unsupported file type");
        return null;
      }
      // console.log(extension);
      const tildeIndex = data.indexOf("~");
      data = data.substring(tildeIndex + 1);
      // console.log(data, extension == ".txt", extension == ".gif");
      if (extension == ".txt") {
        // console.log("Here");
        // const buffer = Buffer.from(data);
        return data;
      }
      return null;
      if (extension == ".txt") {
        console.log("Here");
        // const buffer = Buffer.from(data);
        return data;
      }
    }
  } catch (error) {
    // console.error("Error downloading event:", error);
    return null;
  }
}

const eventCache = new Map();

export async function buildJson(vaultIDs: string[]) {
  let allEvents = [];

  for (let v = 0; v < vaultIDs.length; v++) {
    const vaultID = vaultIDs[v];
    console.log("Processing Vault ID:", vaultID);

    if (eventCache.has(vaultID)) {
      const cachedEvents = eventCache.get(vaultID);
      allEvents.push(...cachedEvents);
    } else {
      try {
        const events = await listEvents(vaultID);
        console.log("Events for Vault ID", vaultID, events);

        const eventsWithInfo = [];
        for (let i = 0; i < events.length; i++) {
          try {
            const info = await getEventText(events[i].cid);
            if (info) {
              eventsWithInfo.push({ ...events[i], info, vaultID });
            }
          } catch (error) {
            console.error(
              "Error getting event text for Vault ID",
              vaultID,
              "Event CID",
              events[i].cid,
              error
            );
          }
        }

        eventCache.set(vaultID, eventsWithInfo);
        allEvents.push(...eventsWithInfo);
      } catch (error) {
        console.error("Error listing events for Vault ID", vaultID, error);
      }
    }
  }

  allEvents.sort((a, b) => b.timestamp - a.timestamp);

  for (let i = 0; i < allEvents.length; i++) {
    console.log(`Event ${i}:`, allEvents[i]);
  }

  return allEvents;
}
