import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { Contract, ContractFactory } from "ethers";

describe("LugusSwapper", function () {
	let deployer: SignerWithAddress,
		alice: SignerWithAddress,
		bob: SignerWithAddress,
		carol: SignerWithAddress,
		dave: SignerWithAddress,
		LugusSwapper: ContractFactory,
		MockStaking: ContractFactory,
		SimpleERC20: ContractFactory,
		lugusSwapper: Contract,
		mockStaking: Contract,
		tokenA: Contract,
		tokenB: Contract,
		tokenC: Contract;

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
		it("Claim " + stakeAmount + " tokens", async function () {
			await mockStaking.connect(alice).allowClaim(deployer.address);
			// await expect(await mockStaking.connect(alice).claim(alice.address, tokenA.address), "Claim tokenA").to.changeTokenBalances(tokenA, [deployer, alice], [stakeAmount, -stakeAmount]);
			await expect(await mockStaking.connect(alice).claimAll(alice.address), "Claim tokenA").to.changeTokenBalances(tokenA, [deployer, alice], [stakeAmount, -stakeAmount]);
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

	describe("Converting tokens", function () {
		it("To USDC", async function () {
			// expect(1).to.be.equal(0);
		});
		it("To ETH", async function () {
			// expect(1).to.be.equal(0);
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
});