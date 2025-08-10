// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/**
 * @title Zingle
 * @author Gemini
 * @dev This contract manages user profiles and the swiping/matching logic for a
 * decentralized dating application on the BNB Chain.
 */
contract Zingle {
    // --- State Variables ---

    // A struct to hold the data for a user's profile.
    struct Profile {
        address owner;
        string name;
        string bio;
        string imageUrl; // The IPFS hash for the profile picture.
        // Add more fields here as needed (e.g., interests, gender, etc.)
    }

    // A mapping from a user's address to their profile.
    // This allows us to quickly look up a user's profile.
    mapping(address => Profile) public profiles;

    // A mapping to track who has swiped right on whom.
    // mapping(user's address => mapping(other user's address => liked?))
    mapping(address => mapping(address => bool)) public hasSwipedRight;

    // An array to store the addresses of all users who have a profile.
    address[] public userAddresses;

    // --- Events ---

    // Emits when a new profile is created.
    event ProfileCreated(address indexed owner, string name);

    // Emits when a new match is made.
    event Match(address indexed user1, address indexed user2);

    // --- Functions ---

    /**
     * @dev Creates a new user profile on the contract.
     * @param _name The name of the user.
     * @param _bio The user's biography.
     * @param _imageUrl The IPFS hash of the user's profile picture.
     */
    function createProfile(string memory _name, string memory _bio, string memory _imageUrl) public {
        // Ensure a user can only create one profile.
        require(bytes(profiles[msg.sender].name).length == 0, "Profile already exists.");

        // Create the new profile.
        profiles[msg.sender] = Profile(msg.sender, _name, _bio, _imageUrl);
        userAddresses.push(msg.sender);

        emit ProfileCreated(msg.sender, _name);
    }

    /**
     * @dev Allows a user to get their own profile information.
     * @return name The name of the user.
     * @return bio The user's biography.
     * @return imageUrl The IPFS hash of the user's profile picture.
     */
    function getMyProfile() public view returns (string memory name, string memory bio, string memory imageUrl) {
        require(bytes(profiles[msg.sender].name).length > 0, "Profile does not exist.");
        return (profiles[msg.sender].name, profiles[msg.sender].bio, profiles[msg.sender].imageUrl);
    }

    /**
     * @dev Allows a user to like another user's profile.
     * @param _recipient The address of the user being liked.
     */
    function swipeRight(address _recipient) public {
        // A user cannot swipe right on their own profile.
        require(msg.sender != _recipient, "Cannot swipe right on yourself.");
        // The recipient must have a profile.
        require(bytes(profiles[_recipient].name).length > 0, "Recipient profile does not exist.");

        // Mark that the current user has swiped right on the recipient.
        hasSwipedRight[msg.sender][_recipient] = true;

        // Check for a mutual match.
        if (hasSwipedRight[_recipient][msg.sender]) {
            emit Match(msg.sender, _recipient);
        }
    }

    /**
     * @dev Fetches all existing profiles for the discover page.
     * @return An array of Profile structs.
     */
    function getAllProfiles() public view returns (Profile[] memory) {
        Profile[] memory allProfiles = new Profile[](userAddresses.length);
        for (uint i = 0; i < userAddresses.length; i++) {
            allProfiles[i] = profiles[userAddresses[i]];
        }
        return allProfiles;
    }
}

