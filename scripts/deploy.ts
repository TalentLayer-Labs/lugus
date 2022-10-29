import { ethers } from "hardhat";

async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  // const MockStaking = await ethers.getContractFactory("MockStaking");
  const LugusSwapper = await ethers.getContractFactory("LugusSwapper");

  // const mockStaking = await MockStaking.deploy();
  const lugusSwapper = await LugusSwapper.deploy();
  
  // await mockStaking.deployed();
  await lugusSwapper.deployed();

  console.log(`MockStaking deployed to ${mockStaking.address}`);
  console.log(`LugusSwapper deployed to ${lugusSwapper.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });