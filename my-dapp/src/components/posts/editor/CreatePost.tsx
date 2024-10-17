"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(hub)/SessionProvider";
import { useSubmitPostMutation } from "./mutations"; // Assuming you have a mutation for backend posting
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import { BrowserProvider, ethers } from "ethers"; // For blockchain interaction
import contractABI from "@/contracts/SocialNetworkABI.json"; // Your contract ABI

const contractAddress = "0x46B247D4AE99315A84a5A1e30a4744c3dF4b1b3e"; // Your contract address

const CreatePost = () => {
  // For accessing the logged-in user
  const { user } = useSession();

  // Off-chain mutation
  const mutation = useSubmitPostMutation();
  
  // Editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's happening?",
      }),
    ],
  });

  const [isPostingToBlockchain, setIsPostingToBlockchain] = useState(false); // Control for blockchain interaction
  const [isBlockchainPosting, setBlockchainPosting] = useState(false); // State for loading spinner during blockchain post

  const input = editor?.getText({ blockSeparator: "\n" }) || "";

  // Function for on-chain post
  const createBlockchainPost = async () => {
    if (!window.ethereum) {
      alert("No crypto wallet found");
      return;
    }

    try {
      setBlockchainPosting(true); // Start loading spinner
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request wallet access
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.createUserPost(input); // Assuming the contract has a method to create posts
      await tx.wait(); // Wait for transaction confirmation

      editor?.commands.clearContent(); // Clear the post content after successful transaction
      alert("Post created successfully on-chain!");
    } catch (error) {
      console.error(error);
      alert("Failed to create post on-chain");
    } finally {
      setBlockchainPosting(false); // Stop loading spinner
    }
  };

  // Function for off-chain post
  const createOffChainPost = () => {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  };

  // Function to decide whether to post on-chain or off-chain
  const onSubmit = () => {
    if (isPostingToBlockchain) {
      createBlockchainPost(); // Post on-chain
    } else {
      createOffChainPost(); // Post off-chain
    }
  };

  return (
    <div className="bg-card flex flex-col gap-5 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="hidden sm:inline"
        />
        <EditorContent
          editor={editor}
          className="bg-background max-h-[20rem] w-full overflow-y-auto rounded-2xl px-5 py-3"
        />
      </div>

      <div className="flex justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isPostingToBlockchain}
            onChange={(e) => setIsPostingToBlockchain(e.target.checked)}
          />
          Post on Blockchain
        </label>

        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending || isBlockchainPosting}
          disabled={!input.trim() || isBlockchainPosting}
          className="min-w-20"
        >
          {isPostingToBlockchain ? "Post on Blockchain" : "Post"}
        </LoadingButton>
      </div>
    </div>
  );
};

export default CreatePost;
