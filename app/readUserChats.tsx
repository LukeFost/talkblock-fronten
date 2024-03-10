import { type BaseError, useReadContract } from "wagmi";
import { talk_abi, talk_address } from "./pages/VaultList/TalkBlockABI";
import { useAtom } from "jotai";
import { globalUserChatLength } from "./atom";
import { useEffect } from "react";

function ReadUserChats(address: "'$0x{string}'" | undefined) {
  const {
    data: userChatsLengthData,
    error: userChatsLengthError,
    isLoading: userChatsLengthLoading,
  } = useReadContract({
    address: talk_address,
    abi: talk_abi,
    functionName: "getUserChatLength",
    args: address.address ? [address.address] : [],
    enabled: !!address.address,
  });

  const {
    data: userChatsData,
    error: userChatsError,
    isLoading: userChatsLoading,
  } = useReadContract({
    address: talk_address,
    abi: talk_abi,
    functionName: "userChats",
    args: address.address
      ? [
          address.address,
          userChatsLengthData ? Number(userChatsLengthData) - 1 : 0,
        ]
      : [],
    enabled: !!userChatsLengthData,
  });

  const {
    data: userChatsDataFinal,
    error: userChatsErrorFinal,
    isLoading: userChatsLoadingFinal,
  } = useReadContract({
    address: talk_address,
    abi: talk_abi,
    functionName: "idToChat",
    args: [Number(userChatsData?.toString())],
    enabled: !!userChatsData,
  });

  const [getUserChatsData, setUserChat] = useAtom(globalUserChatLength);

  useEffect(() => {
    console.log(userChatsLengthData);
    console.log(userChatsData, "userChatsData");
    console.log(userChatsDataFinal, "datafinal");
  }, [userChatsLengthData, userChatsData, userChatsDataFinal]);

  if (userChatsLoadingFinal) return <div>Loading...</div>;
  if (userChatsErrorFinal)
    return (
      <div>
        Error:{" "}
        {(userChatsErrorFinal as unknown as BaseError).shortMessage ||
          userChatsErrorFinal.message}
      </div>
    );

  if (userChatsDataFinal) {
    setUserChat(userChatsDataFinal);
  }
  return null;
}

export default ReadUserChats;
