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

  const max = userChatsLengthData ? Number(userChatsLengthData.toString()) : 0;

  const indices = Array.from({ length: max }, (_, index) => index);

  const [getUserChatsData, setUserChat] = useAtom(globalUserChatLength);

  useEffect(() => {
    console.log(userChatsLengthData);
  }, [userChatsLengthData]);

  if (userChatsLengthLoading) return <div>Loading...</div>;
  if (userChatsLengthError)
    return (
      <div>
        Error:{" "}
        {(userChatsLengthError as unknown as BaseError).shortMessage ||
          userChatsLengthError.message}
      </div>
    );

  return (
    <>
      {indices.map((index) => (
        <ChildComponent
          key={index}
          index={index}
          address={address}
          setUserChat={setUserChat}
        />
      ))}
    </>
  );
}

function ChildComponent({
  index,
  address,
  setUserChat,
}: {
  index: number;
  address: "'$0x{string}'" | undefined;
  setUserChat: (data: [string, bigint, bigint][]) => void;
}) {
  const {
    data: userChatsDataFinal,
    error: userChatsErrorFinal,
    isLoading: userChatsLoadingFinal,
  } = useReadContract({
    address: talk_address,
    abi: talk_abi,
    functionName: "idToChat",
    args: [BigInt(index)],
    enabled: !!address,
  });

  useEffect(() => {
    if (userChatsDataFinal) {
      setUserChat((prevData: any) => [
        ...prevData,
        userChatsDataFinal as [string, bigint, bigint],
      ]);
    }
  }, [userChatsDataFinal, setUserChat]);

  if (userChatsLoadingFinal) return <div>Loading...</div>;
  if (userChatsErrorFinal)
    return (
      <div>
        Error:{" "}
        {(userChatsErrorFinal as unknown as BaseError).shortMessage ||
          userChatsErrorFinal.message}
      </div>
    );

  return null;
}

export default ReadUserChats;
