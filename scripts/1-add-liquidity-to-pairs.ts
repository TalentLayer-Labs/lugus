import {ethers} from "hardhat";
import {dercio, LugusSwapper, SushiSwapHelper, TokenA, TokenB, TokenC, emil} from "../contracts/constants";

const hre = require("hardhat");

async function main() {
  const network = await hre.network.name;
  console.log(network);

  const sushiSwapHelperContract = await ethers.getContractAt("SushiSwapHelper", SushiSwapHelper);
  const tokenA = await ethers.getContractAt("SimpleERC20", TokenA);
  const tokenB = await ethers.getContractAt("SimpleERC20", TokenB);
  const tokenC = await ethers.getContractAt("SimpleERC20", TokenC);

  await tokenA.transfer(
    sushiSwapHelperContract.address,
    ethers.utils.parseEther("100"));

  await tokenB.transfer(
    sushiSwapHelperContract.address,
    ethers.utils.parseEther("100"));

  await tokenC.transfer(
    sushiSwapHelperContract.address,
    ethers.utils.parseEther("100"));



  await sushiSwapHelperContract.addLiquidity(
    TokenA,
    ethers.utils.parseEther('10').toString(),
    ethers.utils.parseUnits("1", 'mwei').toString(),
    {value: ethers.utils.parseUnits("1", 'mwei')
    });

  await sushiSwapHelperContract.addLiquidity(
    TokenB,
    ethers.utils.parseEther('12').toString(),
    ethers.utils.parseUnits("1", 'mwei').toString(),
    {value: ethers.utils.parseUnits("1", 'mwei')
    });

  await sushiSwapHelperContract.addLiquidity(
    TokenC,
    ethers.utils.parseEther('10').toString(),
    ethers.utils.parseUnits("1", 'mwei').toString(),
    {value: ethers.utils.parseUnits("1", 'mwei')
    });

  console.log(`Balance Liquidity pool C=${await sushiSwapHelperContract.getReserves()}`);
  console.log(`Balance TokenA=${await tokenA.balanceOf(SushiSwapHelper)}`);
  console.log(`Balance TokenB=${await tokenB.balanceOf(SushiSwapHelper)}`);
  console.log(`Balance TokenC=${await tokenC.balanceOf(SushiSwapHelper)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });