import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import {BigNumber, Contract, ContractFactory} from "ethers";

describe("LugusSwapper", function () {
	let deployer: SignerWithAddress,
		alice: SignerWithAddress,
		bob: SignerWithAddress,
		carol: SignerWithAddress,
		dave: SignerWithAddress,
		LugusSwapper: ContractFactory,
		MockStaking: ContractFactory,
		SimpleERC20: ContractFactory,
		SushiSwapHelper: ContractFactory,
		lugusSwapper: Contract,
		mockStaking: Contract,
		tokenA: Contract,
		tokenB: Contract,
		tokenC: Contract,
		sushiSwapHelper: Contract;

	const setupAmount = 1000,
		stakeAmount = 100;

	before(async function () {
		//Deploy LugusSwapper
		LugusSwapper = await ethers.getContractFactory("LugusSwapper");
		lugusSwapper = await LugusSwapper.deploy();

		//Deploy MockStacking
		MockStaking = await ethers.getContractFactory("MockStaking");
		mockStaking = await MockStaking.deploy();

		//Deploy SimpleERC20
		SimpleERC20 = await ethers.getContractFactory("SimpleERC20");
		tokenA = await SimpleERC20.deploy();
		tokenB = await SimpleERC20.deploy();
		tokenC = await SimpleERC20.deploy();

		//Deploy SushiSwapHelper
		SushiSwapHelper = await ethers.getContractFactory("SushiSwapHelper");
		sushiSwapHelper = await SushiSwapHelper.deploy();

		//Initiate signers
		[deployer, alice] = await ethers.getSigners();
	});

	describe("Initialize MockStaking", function () {
		it("Set LugusSwapper as swapper address", async function() {
			await mockStaking.setSwapperAddress(lugusSwapper.address);
		});

		it("Add tokens to MockStaking", async function () {
			await mockStaking.addTokenToList(tokenA.address);
			await mockStaking.addTokenToList(tokenB.address);
			await mockStaking.addTokenToList(tokenC.address);	
		});

		it("Transfers " + setupAmount + " tokens to alice", async function() {
			await expect(await tokenA.transfer(alice.address, setupAmount)).to.changeTokenBalances(tokenA, [deployer, alice], [-setupAmount, setupAmount]);
			await expect(await tokenB.transfer(alice.address, setupAmount)).to.changeTokenBalances(tokenB, [deployer, alice], [-setupAmount, setupAmount]);
			await expect(await tokenC.transfer(alice.address, setupAmount)).to.changeTokenBalances(tokenC, [deployer, alice], [-setupAmount, setupAmount]);
		});
		
		it("Stake " + stakeAmount + " tokens", async function () {
			await tokenA.connect(alice).approve(mockStaking.address, stakeAmount);
			await tokenB.connect(alice).approve(mockStaking.address, stakeAmount);
			await tokenC.connect(alice).approve(mockStaking.address, stakeAmount);
			await expect(await mockStaking.connect(alice).stake(tokenA.address, stakeAmount), "Staking tokenA").to.changeTokenBalances(tokenA, [mockStaking, alice], [stakeAmount, -stakeAmount]);
			await expect(await mockStaking.connect(alice).stake(tokenB.address, stakeAmount), "Staking tokenB").to.changeTokenBalances(tokenB, [mockStaking, alice], [stakeAmount, -stakeAmount]);
			await expect(await mockStaking.connect(alice).stake(tokenC.address, stakeAmount), "Staking tokenC").to.changeTokenBalances(tokenC, [mockStaking, alice], [stakeAmount, -stakeAmount]);
		});
	});

	describe("Claim tokens", function () {
		it("Claim " + stakeAmount + " tokens from user", async function () {
			// await mockStaking.connect(alice).allowClaim(deployer.address);
			await expect(await mockStaking.connect(alice).claim(alice.address, tokenA.address), "Claim tokenA").to.changeTokenBalances(tokenA, [mockStaking, alice], [-stakeAmount, stakeAmount]);
			await expect(await mockStaking.connect(alice).claimAll(alice.address), "Claim all tokens")
				.to.changeTokenBalances(tokenA, [mockStaking, lugusSwapper], [0, 0])
				.to.changeTokenBalances(tokenB, [mockStaking, lugusSwapper], [-stakeAmount, stakeAmount])
				.to.changeTokenBalances(tokenC, [mockStaking, lugusSwapper], [-stakeAmount, stakeAmount]);
		});

		it("Claim " + stakeAmount + " tokens from approved address", async function () {
			await stakeTokensUtils(stakeAmount);
			await mockStaking.connect(alice).allowClaim(deployer.address);
			await expect(await mockStaking.connect(deployer).claim(alice.address, tokenA.address), "Claim tokenA").to.changeTokenBalances(tokenA, [mockStaking, alice], [-stakeAmount, stakeAmount]);
			await expect(await mockStaking.connect(deployer).claimAll(alice.address), "Claim all tokens")
				.to.changeTokenBalances(tokenA, [mockStaking, lugusSwapper], [0, 0])
				.to.changeTokenBalances(tokenB, [mockStaking, lugusSwapper], [-stakeAmount, stakeAmount])
				.to.changeTokenBalances(tokenC, [mockStaking, lugusSwapper], [-stakeAmount, stakeAmount]);
		});

		// it("Claim and Swap singel token", async function () {
		// 	expect ( 
		// 		await lugusSwapper.connect(alice).claimAndSwap(mockStaking.address, tokenA.address)
		// 	).to.not.be.reverted;
		// });

		// it("Claim and Swap all", async function () {
		// 	await lugusSwapper.connect(alice).claimAll(mockStaking.address);
		// });
	})


	describe.only("Claim " + stakeAmount + " units from one token", function () {
		it("To USDC", async function () {
			// expect(1).to.be.equal(0);
		});
		it("To ETH", async function () {
			await stakeTokenUtils(ethers.utils.parseEther("1"));
			await tokenA.connect(deployer).transfer(sushiSwapHelper.address, ethers.utils.parseEther("100"));

			const deployerBalance = await tokenA.balanceOf(deployer.address);
			// console.log("the dep ", ethers.utils.parseEther(deployerBalance.toString()));
			// console.log("the dep ", ethers.utils.parseEther("10"));
			await sushiSwapHelper.connect(deployer).addLiquidity(
				tokenA.address,
				ethers.utils.parseEther("10"),
				ethers.utils.parseEther("10"),
				{ value: ethers.utils.parseEther("10") }
			);

			const reserve = await sushiSwapHelper.getReserves();
			console.log("the res ", reserve);

			await tokenA.approve(sushiSwapHelper.address, ethers.utils.parseEther("10"));
			await tokenA.approve('0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', ethers.utils.parseEther("10"));

			await mockStaking.connect(alice).allowClaim(lugusSwapper.address);
			await expect(await lugusSwapper.connect(alice).claimAndSwapForEth(mockStaking.address, tokenA.address), "Claim & swap token A for ETH")
				.to.changeTokenBalances(tokenA, [lugusSwapper, alice], [0, 0]);

		});
	});

	

	describe("Can claim token on a defined schedule", function () {
		it("Now", async function () {
			// expect(1).to.be.equal(0);
		});

		it("Weekly", async function () {
			// expect(1).to.be.equal(0);
		});

		it("Monthly", async function ( ) {
			// expect(1).to.be.equal(0);
		});
	});

	describe("Send tokens to users wallet", function () {
		it("", async function () {
			// expect(1).to.be.equal(0);
		});
	});


	const stakeTokensUtils = async (tokenAmount: number) => {
		await tokenA.connect(alice).approve(mockStaking.address, tokenAmount);
		await tokenB.connect(alice).approve(mockStaking.address, tokenAmount);
		await tokenC.connect(alice).approve(mockStaking.address, tokenAmount);
		await mockStaking.connect(alice).stake(tokenA.address, tokenAmount);
		await mockStaking.connect(alice).stake(tokenB.address, tokenAmount);
		await mockStaking.connect(alice).stake(tokenC.address, tokenAmount);
	}

	const stakeTokenUtils = async (tokenAmount: BigNumber) => {
		await tokenA.transfer(alice.address, tokenAmount)
		await tokenA.connect(alice).approve(mockStaking.address, tokenAmount);
		await mockStaking.connect(alice).stake(tokenA.address, tokenAmount);
	}
});