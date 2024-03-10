import { type BaseError, useReadContract } from "wagmi";
import { address, abi } from "./zestyCoinAbi";

function ReadContract() {
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    address: address,
    abi: abi,
    functionName: "balanceOf",
    args: ["0x24715460e2a524725525c46F4A20f4C973e36d33"],
  });

  if (isPending) return <div>Loading...</div>;

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );

  return <div>Zesty Token Balance: {balance?.toString()}</div>;
}
export default ReadContract;
