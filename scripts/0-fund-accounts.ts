import { ethers } from "hardhat";
import {dercio} from "../contracts/constants";
const hre = require("hardhat");

async function main() {
  const network = await hre.network.name;
  console.log(network);

  const tokenA = await ethers.getContractAt("SimpleERC20", '0xff0ec82f8923952Dae4D4291af4D502D60d30b00');
  const tokenB = await ethers.getContractAt("SimpleERC20", '0x353538178F6Dc055b830Bccc338eB63BB9c2E15d');
  const tokenC = await ethers.getContractAt("SimpleERC20", '0xE4449F2F567e561f33d10e11B48335298501ab4d');


  await tokenA.transfer(dercio, ethers.utils.parseEther('10'));
  await tokenB.transfer(dercio, ethers.utils.parseEther('10'));
  await tokenC.transfer(dercio, ethers.utils.parseEther('10'));

  console.log(`Balance owner TokenA=${await tokenA.balanceOf('0x32F9e7f06d614903bD4FC0d6618E8008559b409C')}`);

  console.log(`Balance TokenA=${await tokenA.balanceOf(dercio)}`);
  console.log(`Balance TokenB=${await tokenB.balanceOf(dercio)}`);
  console.log(`Balance TokenC=${await tokenC.balanceOf(dercio)}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });