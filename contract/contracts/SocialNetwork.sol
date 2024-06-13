// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SocialNetwork is Ownable {
    // State Variables
    string public platformMessage = "Welcome to the Decentralized Social Network!";
    bool public premiumUser = false;
    uint256 public interactionCounter = 0;
    mapping(address => uint) public userInteractionCounter;

    struct UserProfile {
        address userAddress;
        string username;
        string bio;
        uint256 createdAt;
    }

    struct UserPost {
        address userAddress;
        string content;
        uint256 timestamp;
    }

    UserProfile[] public userProfiles;
    UserPost[] public userPosts;

    // Events
    event PlatformMessageUpdated(address indexed updater, string newMessage, bool premiumUser, uint256 value, uint256 timestamp);
    event UserProfileCreated(address indexed userAddress, string username, string bio, uint256 timestamp);
    event UserPostCreated(address indexed userAddress, string content, uint256 timestamp);
    event EtherWithdrawn(address indexed owner, uint256 amount, uint256 timestamp);

    constructor() Ownable(msg.sender) {
        transferOwnership(msg.sender);
    }

    function updatePlatformMessage(string memory _newMessage) public payable {
        platformMessage = _newMessage;
        interactionCounter += 1;
        userInteractionCounter[msg.sender] += 1;

        premiumUser = msg.value > 0;

        emit PlatformMessageUpdated(msg.sender, _newMessage, premiumUser, msg.value, block.timestamp);
    }

    function createUserProfile(string memory _username, string memory _bio) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_bio).length > 0, "Bio cannot be empty");
        UserProfile memory newUserProfile = UserProfile(msg.sender, _username, _bio, block.timestamp);
        userProfiles.push(newUserProfile);
        emit UserProfileCreated(msg.sender, _username, _bio, block.timestamp);
    }

    function createUserPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        UserPost memory newUserPost = UserPost(msg.sender, _content, block.timestamp);
        userPosts.push(newUserPost);
        emit UserPostCreated(msg.sender, _content, block.timestamp);
    }

    function withdrawEther() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner().call{ value: balance }("");
        require(success, "Failed to send Ether");
        emit EtherWithdrawn(owner(), balance, block.timestamp);
    }

    receive() external payable {}

    function getUserProfile(address _userAddress) public view returns (UserProfile memory) {
        for (uint i = 0; i < userProfiles.length; i++) {
            if (userProfiles[i].userAddress == _userAddress) {
                return userProfiles[i];
            }
        }
        revert("User profile not found");
    }

    function getUserPosts(address _userAddress) public view returns (UserPost[] memory) {
        UserPost[] memory posts = new UserPost[](userPosts.length);
        uint counter = 0;
        for (uint i = 0; i < userPosts.length; i++) {
            if (userPosts[i].userAddress == _userAddress) {
                posts[counter] = userPosts[i];
                counter++;
            }
        }
        return posts;
    }
}

