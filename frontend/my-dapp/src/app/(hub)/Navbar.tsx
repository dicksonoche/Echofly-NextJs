"use client"

import { useState } from "react";
import { BrowserProvider, ethers } from "ethers"; 
import SearchField from "@/components/SearchField";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  // State to store the account and connection status
  const [account, setAccount] = useState<string | null>(null);

  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);  // Use BrowserProvider instead of providers.Web3Provider
        const accounts = await provider.send("eth_requestAccounts", []); // Request MetaMask connection
        setAccount(accounts[0]); // Set the connected account
      } else {
        alert("MetaMask not installed. Please install MetaMask to use this feature.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  return (
    <div className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="user"
            className="h-12 w-fit"
          />
        </Link>
        <p className="text- text-1xl font-medium">Social Media App</p>
        <SearchField />
        {/* Button to connect wallet */}
        <Button onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
        </Button>
        <UserButton className="sm:ms-auto" />
      </div>
    </div>
  );
};

export default Navbar;
