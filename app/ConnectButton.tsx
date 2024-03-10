import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();

  return (
    <>
      <button className="btn" onClick={() => open()}>
        Open Connect Modal
      </button>
      <button className="btn" onClick={() => open({ view: "Networks" })}>
        Open Network Modal
      </button>
    </>
  );
}
