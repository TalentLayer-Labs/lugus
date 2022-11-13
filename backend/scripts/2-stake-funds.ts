import {ethers} from "hardhat";
import {dercio, LugusSwapper, SushiSwapHelper, TokenA, TokenB, TokenC, emil} from "../contracts/constants";

const hre = require("hardhat");

async function main() {
  const network = await hre.network.name;
  console.log(network);

  const mockStakingContract = await ethers.getContractAt("MockStaking", SushiSwapHelper);
  const tokenA = await ethers.getContractAt("SimpleERC20", TokenA);
  const tokenB = await ethers.getContractAt("SimpleERC20", TokenB);
  const tokenC = await ethers.getContractAt("SimpleERC20", TokenC);

  //Dercio approves the staking contract to spend his tokens
  await tokenA.connect(dercio).approve(mockStakingContract.address, ethers.utils.parseUnits("1", 'mwei').toString());
  // await tokenB.connect(dercio).approve(mockStakingContract.address, ethers.utils.parseUnits("1", 'mwei'));
  // await tokenC.connect(dercio).approve(mockStakingContract.address, ethers.utils.parseUnits("1", 'mwei'));

  //Dercio stakes his tokens
  // await mockStakingContract.connect(dercio).stake(tokenA.address, ethers.utils.parseUnits("1", 'mwei'));
  // await mockStakingContract.connect(dercio).stake(tokenB.address, ethers.utils.parseUnits("1", 'mwei'));
  // await mockStakingContract.connect(dercio).stake(tokenC.address, ethers.utils.parseUnits("1", 'mwei'));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });