pragma solidity ^0.8.0;
import {IDelegateClaim} from "./interfaces/IDelegateClaim.sol";
import {IUniswapV2Pair} from "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import {IUniswapV2Factory} from "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import {SushiSwapHelper} from "./SushiSwapHelper.sol";
import {IERC20} from "@uniswap/v2-core/contracts/interfaces/IERC20.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

import "hardhat/console.sol";

contract LugusSwapper is Context {

    address public uniswapV2Pair;
    IUniswapV2Router02 public immutable uniswapV2Router;
    address public constant sushiSwapRouterAddress = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506; // Arbitrum Mainnet, Rinkeby...


    event Swap(address indexed user, uint256 amountIn, uint256 amountOut);

    constructor() {
        uniswapV2Router = IUniswapV2Router02(sushiSwapRouterAddress);
    }

    function claimAndSwapForEth(address mockStakingAddress, address token) external{
        uint256 value = IDelegateClaim(mockStakingAddress).claim(msg.sender, token);
        _swapTokenForEth(value, token, msg.sender);
    }

    function claimAllAndSwapForEth(address mockStakingAddress) external{
        (address[] memory tokens, uint256[] memory values) = IDelegateClaim(mockStakingAddress).claimAll(msg.sender);
        for(uint8 i = 0; i < tokens.length; i++){
            _swapTokenForEth(values[i], tokens[i], msg.sender);
        }
    }

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
        // block.timestamp.add(100 seconds)
            block.timestamp
        );

        uniswapV2Pair = getETHPair(_token);
    }

    function _swapTokenForEth(uint256 _tokenAmount, address _tokenAddress, address _sender) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = _tokenAddress;
        path[1] = uniswapV2Router.WETH();

        // Need allowance here?

        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            _tokenAmount,
            0, // accept any amount of ETH
            path,
            _sender,
        // block.timestamp.add(100 seconds)
            block.timestamp
        );
    }

    function deposit() external payable {}

    //to recieve ETH from uniswapV2Router when swaping
    receive() external payable {}

}
