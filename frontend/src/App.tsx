import "./App.css";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import ConnectedView from "./components/ConnectedView";

function App() {
  const { connected } = useWallet();

  return (
    <div className="App">
      <div className="wallet-wrapper">
        <WalletSelector />
      </div>
      {connected ? (
        <ConnectedView />
      ) : (
        <h1 className="not-connected-header">
          Please connect your wallet to continue
        </h1>
      )}
    </div>
  );
}

export default App;
