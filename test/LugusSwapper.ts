import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("LugusSwapper", function () {
	let deployer: SignerWithAddress,
		alice: SignerWithAddress,
		bob: SignerWithAddress,
		carol: SignerWithAddress,
		dave: SignerWithAddress,
		LugusSwapper: ContractFactory,
		MockStacking: ContractFactory,
		lugusSwapper: Contract,
		mockStacking: Contract;

	
	before(async function () {
		//Deploy LugusSwapper
		LugusSwapper = await ethers.getContractFactory("LugusSwapper");
		LugusSwapper = await LugusSwapper.deploy();

		//Deploy MockStacking
		MockStacking = await ethers.getContractFactory("MockStacking");
		mockStacking = await MockStacking.deploy();
	});

	describe("Can claim", function () {
		// LugusSwapper.claim();
	});

	describe("Converting tokens", function () {
		it("To USDC", async function () {
			expect(1).to.be.equal(0);
		});
		it("To ETH", async function () {

		});
	});

	

	describe("Can claim token on a defined schedule", function () {
		it("Now", async function () {

		});

		it("Weekly", async function () {

		});

		it("Monthly", async function ( ) {

		});
	});

	describe("Send tokens to users wallet", function () {
		it("", async function () {

		});
	});
});