import { ethers } from "ethers";

let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" }); // Request access to account
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/45659e58bfd842309ac5e26ecd083106"
  );
}

export default provider;
