// src/context/Web3Context.jsx - Manages wallet connection and global state
import { useState, useEffect, createContext, useContext } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- BEGIN MODIFICATIONS ---
  // Replace this with your newly deployed contract address.
  const contractAddress = "0x7104b2a8F369c7A79a04a3f6F8c1F786C1D1B64";
  // Replace this with your newly copied ABI.
  const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bio",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "createProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user1",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user2",
				"type": "address"
			}
		],
		"name": "Match",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "ProfileCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "swipeRight",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProfiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bio",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					}
				],
				"internalType": "struct Zingle.Profile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasSwipedRight",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "profiles",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  // --- END MODIFICATIONS ---

  useEffect(() => {
    const connectWalletOnLoad = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            setProvider(provider);

            const contractInstance = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
            setContract(contractInstance);

            const profileExists = await contractInstance.getProfile(accounts[0]).catch(() => null);
            setIsProfileCreated(!!profileExists);
          }
        } catch (error) {
          console.error("Could not connect to MetaMask on load:", error);
        }
      }
      setLoading(false);
    };
    connectWalletOnLoad();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isConnected && address && contract) {
        try {
          const profile = await contract.getProfile(address);
          setUserProfile({
            name: profile[0],
            bio: profile[1],
            avatar: profile[2],
          });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserProfile(null);
        }
      }
    };
    fetchUserProfile();
  }, [isConnected, address, contract]);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
        setProvider(provider);
        console.log("Wallet connected:", address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("MetaMask not detected. Please install it.");
    }
  };

  return (
    <Web3Context.Provider value={{ address, provider, isConnected, connectWallet, userProfile, isProfileCreated, contract, loading }}>
      {children}
    </Web3Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => useContext(Web3Context);
