// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SocialNetwork {

    address public owner;

    address[] internal addresses;
    mapping(string => address) internal names;
    mapping(address => Profile) public profiles;
    mapping(address => mapping(address => Profile)) internal followers;
    mapping(address => mapping(address => Profile)) internal following;
    mapping(address => Post[]) internal posts;

    //CREATING ID
    uint256 public _postID;
    uint256 public _userID;

    //CHAT
    mapping(bytes32 => message[]) allMessages;

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    // Profile
    struct Profile {
        address owner;
        string name;
        uint timeCreated;
        uint id;
        uint postCount;
        uint followerCount;
        uint followingCount;
        address[] followers;
        address[] following;
    }

    struct AllUserStruck{
        address owner;
        string name;
        uint timeCreated;
        uint id;
        uint postCount;
        uint followerCount;
        uint followingCount;
    }

    AllUserStruck[] getAllUsers;

    // Post
    struct Post {
        address author;
        string postType;
        string postDescription;
        string postURL;
        uint timeCreated;
        uint postID;
        uint likes;
        string[] comments;
    }

    // Events
    event ProfileCreated(address indexed user, string name, uint256 userID);
    event Followed(address indexed follower, address indexed following);
    event Unfollowed(address indexed follower, address indexed following);
    event PostCreated(address indexed author, uint256 postID, string postType);
    event PostDeleted(address indexed author, uint256 postID);
    event PostLiked(address indexed liker, uint256 postID);
    event PostUnliked(address indexed unliker, uint256 postID);
    event CommentAdded(address indexed commenter, uint256 postID, string comment);
    event MessageSent(address indexed sender, address indexed recipient, string message);
    event PostEdited(address indexed editor, uint256 postID, string newDescription);
    event EtherWithdrawn(address indexed owner, uint256 amount, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "ERROR: Only owner can perform this action");
        _;
    }

    // Check if message sender has a created profile
    modifier senderHasProfile() {
        require(profiles[msg.sender].owner != address(0x0), "ERROR: <Must create a profile to perform this action>");
        _;
    }

    // Check if a specified address has created a profile
    modifier profileExists(address _address) {
        require(profiles[_address].owner != address(0x0), "ERROR: <Profile does not exist>");
        _;
    }

    // Check that the message sender is not specifying an address that is itself
    modifier notSelf(address _address) {
        require(msg.sender != _address, "ERROR <You cannot follow/unfollow yourself");
        _;
    }

    // Check that the input is not empty
    modifier nonEmptyInput(string calldata _input) {
        require(keccak256(abi.encodePacked(_input)) != keccak256(abi.encodePacked("")), "ERROR: <Input cannot be empty>");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Create a new profile from a given username
    function createProfile(string calldata _name) external nonEmptyInput(_name) {
        // Checks that the current account did not already make a profile and did not choose a taken username
        require(profiles[msg.sender].owner == address(0x0), "ERROR: <You have already created a profile>");
        require(names[_name] == address(0x0), "ERROR: <Username taken>");

          _userID++;
         uint256 userID = _userID;

        // Updates username list
        names[_name] = msg.sender;

        // Create the new profile object and add it to "profiles" mapping
        profiles[msg.sender] = Profile({
            owner: msg.sender,
            name: _name,
            timeCreated: block.timestamp,
            id: userID,
            postCount: 0,
            followerCount: 0,
            followingCount: 0,
            followers: new address[](0x0),
            following: new address[](0x0)
        });

        // Add address to list of global addresses
        addresses.push(msg.sender);

        getAllUsers.push(AllUserStruck(msg.sender, _name, block.timestamp, userID, 0,0,0));
        emit ProfileCreated(msg.sender, _name, userID);
    }

    // Follow a new profile
    function follow(address _address) external senderHasProfile profileExists(_address) notSelf(_address) {
        require(following[msg.sender][_address].owner == address(0x0), "ERROR: <You already follow this profile>");

        // Add entry to "followers" and "following" mappings
        followers[_address][msg.sender] = profiles[msg.sender];
        following[msg.sender][_address] = profiles[_address];

        // Add element to "followers" and "following" arrays in both Profile objects
        profiles[_address].followers.push(msg.sender);
        profiles[msg.sender].following.push(_address);

        // Increment "followerCount" and "followingCount" in both Profile objects
        profiles[_address].followerCount++;
        profiles[msg.sender].followingCount++;

        emit Followed(msg.sender, _address);
    }

    // Unfollow a profile
    // This deletion operation has a time complexity of O(N).
    function unfollow(address _address) external senderHasProfile profileExists(_address) notSelf(_address) {
        require(following[msg.sender][_address].owner != address(0x0), "ERROR: <You already do not follow this profile>");

        // Delete entry from "followers" and "following" mappings
        delete followers[_address][msg.sender];
        delete following[msg.sender][_address];

        // Delete element from "followers" array in Profile object and decrement followerCount
        for (uint i=0; i<profiles[_address].followerCount; i++) {
            if (profiles[_address].followers[i] == msg.sender) {
                delete profiles[_address].followers[i];
                profiles[_address].followerCount--;
                break;
            }
        }

        // Delete element from "following" array in Profile object and decrement followingCount
        for (uint i=0; i<profiles[msg.sender].followingCount; i++) {
            if (profiles[msg.sender].following[i] == _address) {
                delete profiles[msg.sender].following[i];
                profiles[msg.sender].followingCount--;
                break;
            }
        }

        emit Unfollowed(msg.sender, _address);
    }


    // Create a post
    function createPost(string calldata _type, string calldata _description, string calldata _postURL ) external senderHasProfile() nonEmptyInput(_type) {
        
         _postID++;
         uint256 postID = _postID;
        
        // Create the Post object
        Post memory newPost = Post({
            author: msg.sender,
            postType: _type,
            postDescription: _description,
            postURL: _postURL,
            timeCreated: block.timestamp,
            postID: postID,
            likes: 0,
            comments: new string[](0)
        });

        // Add entry to "posts" mappings
        posts[newPost.author].push(newPost);

        // Increment "postCount" in Profile object
        profiles[newPost.author].postCount++;

        emit PostCreated(msg.sender, postID, _type);
    }

    // Returns all posts from a given address
    function getPosts(address _address) external view profileExists(_address) returns(Post[] memory) {
        return posts[_address];
    }

    // Returns total user count
    function getUserCount() external view returns(uint) {
        return addresses.length;
    }

    // Returns all registered addresses
    function getAddresses() external view returns(address[] memory) {
        return addresses;
    }

    // Get all followers of a specific address
    function getFollowers(address _address) external view profileExists(_address) returns(address[] memory) {
        return profiles[_address].followers;
    }

    // Get all followed accounts of a specific address
    function getFollowing(address _address) external view returns(address[] memory) {
        return profiles[_address].following;
    }

    function getAllPosts() public view returns (Post[] memory) {
        uint256 itemCount = 0;
        for (uint256 i = 0; i< addresses.length; i++) {
                itemCount += posts[addresses[i]].length;
            }

        Post[] memory items = new Post[](itemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < addresses.length; i++) {
                for(uint j=0; j < posts[addresses[i]].length; j++) {
                    items[currentIndex] = posts[addresses[i]][j];
                    currentIndex += 1;
                }
            }
        return items;
    }

     // Delete a post
    function deletePost(uint id) external senderHasProfile() {
        require(posts[msg.sender][id].author != address(0x0), "Post does not exist");

        delete posts[msg.sender][id];
        profiles[msg.sender].postCount--;

        emit PostDeleted(msg.sender, id);
    }

    // like post
    function likePost(uint256 _postID ) external senderHasProfile() {
        for (uint i = 0; i < addresses.length; i++) {
            for(uint j=0; j < posts[addresses[i]].length; j++) {
                if (posts[addresses[i]][j].postID == _postID) {
                    posts[addresses[i]][j].likes++;
                    emit PostLiked(msg.sender, _postID);
                    break;
                }
            }
        }
    }

    function unlikePost(uint256 _postID ) external senderHasProfile() {
        for (uint i = 0; i < addresses.length; i++) {
            for(uint j=0; j < posts[addresses[i]].length; j++) {
                if (posts[addresses[i]][j].postID == _postID) {
                    posts[addresses[i]][j].likes--;
                    emit PostUnliked(msg.sender, _postID);
                    break;
                }
            }
        }
    }

    // Write a comment
    function addComment(string calldata _comment, uint256 _postID) external {
        for (uint i = 0; i < addresses.length; i++) {
            for(uint j=0; j < posts[addresses[i]].length; j++) {
                if (posts[addresses[i]][j].postID == _postID) {
                    posts[addresses[i]][j].comments.push(_comment);
                    emit CommentAdded(msg.sender, _postID, _comment);
                    break;
                }
            }
        }
    }

    //SEND MESSAGE
    function sendMessage(address friend_key, string calldata _msg) external{
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);

        emit MessageSent(msg.sender, friend_key, _msg);
    }

    //get chat code
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else 
        return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //READ MESSAGE
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }

    ///EDIT POST
    function editPost(uint256 _postID, string calldata _description ) external senderHasProfile() {
        for (uint i = 0; i < addresses.length; i++) {
            for(uint j=0; j < posts[addresses[i]].length; j++) {
                if (posts[addresses[i]][j].postID == _postID) {
                    posts[addresses[i]][j].postDescription = _description;
                    emit PostEdited(msg.sender, _postID, _description);
                    break;
                }
            }
        }
    }

    // Function for the owner to withdraw ether
    function withdrawEther() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "ERROR: No Ether to withdraw");

        (bool success, ) = owner.call{ value: balance }("");
        require(success, "Failed to send Ether");

        // Emit event to log the withdrawal
        emit EtherWithdrawn(owner, balance, block.timestamp);
    }

    // Function to receive ether
    receive() external payable {}

    // GET SINGLE POST
    function getSinglePost(uint256 _postID) external view returns(address,
        string memory,
        string memory,
        string memory,
        uint,
        uint,
        uint,
        string[] memory) {
        for (uint i = 0; i < addresses.length; i++) {
            for(uint j=0; j < posts[addresses[i]].length; j++) {
                if (posts[addresses[i]][j].postID == _postID) {
                     return (
                    posts[addresses[i]][j].author,
                    posts[addresses[i]][j].postType,
                    posts[addresses[i]][j].postDescription,
                    posts[addresses[i]][j].postURL,
                    posts[addresses[i]][j].timeCreated,
                    posts[addresses[i]][j].postID,
                    posts[addresses[i]][j].likes,
                    posts[addresses[i]][j].comments
                    );
                }
            }
        }
    }

}