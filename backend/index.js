// backend/index.js
const express = require('express');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const port = 3000;

// Initialize Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_RPC_URL);

// Load contract ABI and address
const contractABI = require('../artifacts/contracts/XDCVault.sol/XDCVault.json').abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Load private key from environment variable
const privateKey = process.env.PRIVATE_KEY;

// Initialize wallet with the private key
const wallet = new ethers.Wallet(privateKey, provider);

// Initialize contract instance with the wallet signer
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.use(express.json());

// API endpoint to initiate transfer
app.post('/initiate-transfer', async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the entire request body
        const { recipientEmail, amount } = req.body;

        // Generate unlock code (you can use any method, e.g., random string generation)
        const unlockCode = generateUnlockCode();
      
// Call the smart contract method to initiate transfer with the wallet signer
        const tx = await contract.initiateTransfer(recipientEmail, amount, unlockCode);
        console.log("unlockCode", unlockCode); // Log the generated unlock code
        // Return success response
        console.log("Initiated transfer:", tx.hash);

        res.status(200).json({ success: true, txHash: tx.hash });
    } catch (error) {
        // Return error response
        console.error("Error initiating transfer:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// API endpoint to claim XDC
// API endpoint to claim XDC
app.post('/claim-xdc', async (req, res) => {
    try {
        const { recipientEmail, unlockCode, recipientWalletAddress } = req.body;

        // Call the smart contract method to claim XDC with the wallet signer
        const tx = await contract.claimXDC(recipientEmail, unlockCode, {
             gasLimit: 1000000 // Set a suitable gas limit value here
        });

        // Return success response
        console.log("Claimed XDC:", tx.hash);
        res.status(200).json({ success: true, txHash: tx.hash });
    } catch (error) {
        // Return error response
        console.error("Error claiming XDC:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});

// Function to generate unlock code
function generateUnlockCode() {
    // Implementation to generate unlock code, for example:
    const unlockCode = Math.random().toString(36).substring(2, 8);
    // console.log("unlockCodefunction",unlockCode);
    return unlockCode;
}
