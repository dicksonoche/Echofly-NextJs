// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

// The main contract for the decentralized social network
contract SocialNetwork is Ownable {
    // State Variables
    string public platformMessage = "Welcome to the Decentralized Social Network!"; // A public message for the platform
    bool public premiumUser = false; // A flag to indicate if the user is a premium user
    uint256 public interactionCounter = 0; // Counter to track interactions on the platform
    mapping(address => uint256) public userInteractionCounter; // Mapping to track interactions by user

    // Struct to represent a user profile
    struct UserProfile {
        address userAddress; // The user's address
        string username; // The user's username
        string bio; // The user's bio
        string avatarUrl; // The URL of the user's avatar image
        uint256 createdAt; // Timestamp of when the profile was created
        uint256 followersCount; // Number of followers the user has
    }

    // Struct to represent a user post
    struct UserPost {
        address userAddress; // The address of the user who created the post
        string content; // The content of the post
        uint256 timestamp; // Timestamp of when the post was created
        uint256 likesCount; // Number of likes the post has received
    }

    // Struct to represent a comment on a post
    struct PostComment {
        address userAddress; // The address of the user who made the comment
        string content; // The content of the comment
        uint256 timestamp; // Timestamp of when the comment was made
    }

    // Mappings for efficient data retrieval
    mapping(address => UserProfile) private userProfiles; // Mapping from user address to user profile
    mapping(address => UserPost[]) private userPosts; // Mapping from user address to array of posts
    mapping(uint256 => PostComment[]) private postComments; // Mapping from post ID to array of comments

    // Events to log significant actions
    event PlatformMessageUpdated(address indexed updater, string newMessage, bool premiumUser, uint256 value, uint256 timestamp);
    event UserProfileCreated(address indexed userAddress, string username, string bio, string avatarUrl, uint256 timestamp);
    event UserPostCreated(address indexed userAddress, string content, uint256 timestamp);
    event PostLiked(address indexed userAddress, uint256 postId, uint256 timestamp);
    event PostCommented(address indexed userAddress, uint256 postId, string content, uint256 timestamp);
    event UserFollowed(address indexed follower, address indexed followee, uint256 timestamp);
    event EtherWithdrawn(address indexed owner, uint256 amount, uint256 timestamp);

   // Constructor to initialize the contract, setting the deployer as the owner.
    constructor() Ownable(msg.sender) {
        transferOwnership(msg.sender);
    }

    // Function to update the platform message
    function updatePlatformMessage(string memory _newMessage) public payable {
        // Update the platform message and increment counters
        platformMessage = _newMessage;
        interactionCounter += 1;
        userInteractionCounter[msg.sender] += 1;

        // Set premiumUser flag based on whether any ether was sent
        premiumUser = msg.value > 0;

        // Emit event to log the update
        emit PlatformMessageUpdated(msg.sender, _newMessage, premiumUser, msg.value, block.timestamp);
    }

    // Function to create a user profile
    function createUserProfile(string memory _username, string memory _bio, string memory _avatarUrl) public {
        // Ensure username, bio, and avatar URL are not empty
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_bio).length > 0, "Bio cannot be empty");
        require(bytes(_avatarUrl).length > 0, "Avatar URL cannot be empty");

        // Ensure the user does not already have a profile
        require(userProfiles[msg.sender].userAddress == address(0), "Profile already exists");

        // Create and store the new user profile
        userProfiles[msg.sender] = UserProfile(msg.sender, _username, _bio, _avatarUrl, block.timestamp, 0);

        // Emit event to log the creation of the profile
        emit UserProfileCreated(msg.sender, _username, _bio, _avatarUrl, block.timestamp);
    }

    // Function to create a user post
    function createUserPost(string memory _content) public {
        // Ensure the content is not empty
        require(bytes(_content).length > 0, "Content cannot be empty");

        // Ensure the user has a profile
        require(userProfiles[msg.sender].userAddress != address(0), "Profile does not exist");

        // Create and store the new user post
        userPosts[msg.sender].push(UserPost(msg.sender, _content, block.timestamp, 0));

        // Emit event to log the creation of the post
        emit UserPostCreated(msg.sender, _content, block.timestamp);
    }

    // Function to like a post
    function likePost(address _userAddress, uint256 _postId) public {
        // Ensure the post exists
        require(userPosts[_userAddress].length > _postId, "Post does not exist");

        // Increment the likes count of the post
        userPosts[_userAddress][_postId].likesCount += 1;

        // Emit event to log the like
        emit PostLiked(msg.sender, _postId, block.timestamp);
    }

    // Function to comment on a post
    function commentOnPost(address _userAddress, uint256 _postId, string memory _content) public {
        // Ensure the comment content is not empty
        require(bytes(_content).length > 0, "Comment cannot be empty");

        // Ensure the post exists
        require(userPosts[_userAddress].length > _postId, "Post does not exist");

        // Create and store the new comment
        postComments[_postId].push(PostComment(msg.sender, _content, block.timestamp));

        // Emit event to log the comment
        emit PostCommented(msg.sender, _postId, _content, block.timestamp);
    }

    // Function to follow a user
    function followUser(address _userAddress) public {
        // Ensure the user to be followed exists
        require(userProfiles[_userAddress].userAddress != address(0), "User does not exist");

        // Increment the followers count of the user
        userProfiles[_userAddress].followersCount += 1;

        // Emit event to log the follow action
        emit UserFollowed(msg.sender, _userAddress, block.timestamp);
    }

    // Function for the owner to withdraw ether
    function withdrawEther() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner().call{ value: balance }("");
        require(success, "Failed to send Ether");

        // Emit event to log the withdrawal
        emit EtherWithdrawn(owner(), balance, block.timestamp);
    }

    // Function to receive ether
    receive() external payable {}

    // Function to get a user profile by address
    function getUserProfile(address _userAddress) public view returns (UserProfile memory) {
        UserProfile memory profile = userProfiles[_userAddress];
        require(profile.userAddress != address(0), "User profile not found");
        return profile;
    }

    // Function to get all posts by a user
    function getUserPosts(address _userAddress) public view returns (UserPost[] memory) {
        return userPosts[_userAddress];
    }

    // Function to get comments on a post
    function getPostComments(uint256 _postId) public view returns (PostComment[] memory) {
        return postComments[_postId];
    }
}

 

    