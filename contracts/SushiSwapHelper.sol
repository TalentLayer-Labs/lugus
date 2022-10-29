// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.4;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IUniswapV2Pair} from "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import {IUniswapV2Router01} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import {IUniswapV2Factory} from "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import {IERC20} from "@uniswap/v2-core/contracts/interfaces/IERC20.sol";

import "hardhat/console.sol";

contract SushiSwapHelper is Context {
    using SafeMath for uint256;

    IUniswapV2Router02 public immutable uniswapV2Router;
    address public uniswapV2Pair;
    address public constant sushiSwapRouterAddress = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; // Arbitrum Mainnet, Rinkeby...
    // address public constant sushiSwapRouterAddress = 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F; // Ethereum Mainnet;
    address payable public liquidityLockAddress = payable(0xf4cf3D861a40fC99BB8237a692ef515eDaFe9cB0); // Liquidity Address // TO CHANGE, same as Dev right now

    constructor() {
        // IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(sushiSwapRouterAddress);
        uniswapV2Router = IUniswapV2Router02(sushiSwapRouterAddress);
    }

    // create pair
    // function createPair(address _token) public {
    //     uniswapV2Pair = IUniswapV2Factory(uniswapV2Router.factory()).createPair(
    //         _token,
    //         uniswapV2Router.WETH()
    //     );
    // }

    function getETHPair(address _token) public view returns (address pair) {
        return IUniswapV2Factory(uniswapV2Router.factory()).getPair(_token, uniswapV2Router.WETH());
    } // }

    function getPair(address _token1, address _token2) public view returns (address pair) {
        return IUniswapV2Factory(uniswapV2Router.factory()).getPair(_token1, _token2);
    }

    // addLiquidity
    function addLiquidity(
        address _token,
        uint256 _tokenAmount,
        uint256 _ethAmount
    ) public payable {
        // approve token transfer to cover all possible scenarios
        require(_tokenAmount <= IERC20(_token).balanceOf(address(this)), "Not enough Token in user balance");
        require(_ethAmount <= address(this).balance, "Not enough ETH in contract balance");
        require(IERC20(_token).approve(address(uniswapV2Router), _tokenAmount), "Not able to approve token");

        uniswapV2Router.addLiquidityETH{value: _ethAmount}(
            _token,
            _tokenAmount,
            0,
            0,
            _msgSender(),
            block.timestamp.add(100 seconds)
        );

        uniswapV2Pair = getETHPair(_token);
    }

    // getReserves
    function getReserves() public view returns (uint256, uint256) {
        (uint256 reserves0, uint256 reserves1, ) = IUniswapV2Pair(uniswapV2Pair).getReserves();
        return (reserves0, reserves1);
    }

    // getLpBalance
    function getLpBalance(address _user) public view returns (uint256 _lpBalance) {
        IERC20 _Lptoken = IERC20(uniswapV2Pair);
        return _Lptoken.balanceOf(_user);
    }

    function swapTokenForEth(uint256 _tokenAmount, address _tokenAddress, address _sender) public {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = _tokenAddress;
//        path[0] = address(this);
        path[1] = uniswapV2Router.WETH();

        // Need allowance here?

        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            _tokenAmount,
            0, // accept any amount of ETH
            path,
            _sender,
            block.timestamp.add(100 seconds)
        );
    }

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) public pure returns (uint256 amountB) {
        require(amountA > 0, "UniswapV2Library: INSUFFICIENT_AMOUNT");
        require(reserveA > 0 && reserveB > 0, "UniswapV2Library: INSUFFICIENT_LIQUIDITY");
        amountB = amountA.mul(reserveB).div(reserveA);
    }

    function priceImpact(uint256 transferAmount, address token) public view returns (uint256) {
        (uint256 reserves0, uint256 reserves1, ) = IUniswapV2Pair(uniswapV2Pair).getReserves();
        (uint256 reserveA, uint256 reserveB) = token == IUniswapV2Pair(uniswapV2Pair).token0()
        ? (reserves0, reserves1)
        : (reserves1, reserves0);
        if (reserveA == 0 || reserveB == 0) {
            return 0;
        }
        uint256 _exactQuote = quote(transferAmount, reserveA, reserveB);
        uint256 outputAmount = IUniswapV2Router02(sushiSwapRouterAddress).getAmountOut(
            transferAmount,
            reserveA,
            reserveB
        );
        uint256 _priceImpact = _exactQuote.sub(outputAmount).mul(10**2).div(_exactQuote);
        return _priceImpact;
    }

    function exactQuote(address _token, uint256 _transferAmount) public view returns (uint256 _exactQuote) {
        (uint256 reserves0, uint256 reserves1, ) = IUniswapV2Pair(uniswapV2Pair).getReserves();
        (uint256 reserveA, uint256 reserveB) = _token == IUniswapV2Pair(uniswapV2Pair).token0()
        ? (reserves0, reserves1)
        : (reserves1, reserves0);
        if (reserveA == 0 || reserveB == 0) {
            return 0;
        }
        return quote(_transferAmount, reserveA, reserveB);
    }

    function getAmountOut(address _token, uint256 _transferAmount) public view returns (uint256 _outputAmount) {
        (uint256 reserves0, uint256 reserves1, ) = IUniswapV2Pair(uniswapV2Pair).getReserves();
        (uint256 reserveA, uint256 reserveB) = _token == IUniswapV2Pair(uniswapV2Pair).token0()
        ? (reserves0, reserves1)
        : (reserves1, reserves0);
        if (reserveA == 0 || reserveB == 0) {
            return 0;
        }
        return IUniswapV2Router02(sushiSwapRouterAddress).getAmountOut(_transferAmount, reserveA, reserveB);
    }

    function deposit() external payable {}

    //to recieve ETH from uniswapV2Router when swaping
    receive() external payable {}
}