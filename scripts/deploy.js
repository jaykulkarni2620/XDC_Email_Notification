// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const XDCVault = await ethers.getContractFactory("XDCVault");
    const xdcVault = await XDCVault.deploy();

    console.log("XDCVault contract address:", xdcVault.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

