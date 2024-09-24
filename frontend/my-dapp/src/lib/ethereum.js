import { ethers } from "ethers";

let provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and MetaMask is available.
  window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // We are either on the server or the user doesn't have MetaMask installed.
  provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/45659e58bfd842309ac5e26ecd083106"
  );
}

export default provider;
