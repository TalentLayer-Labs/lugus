pragma solidity ^0.8.0;

import {IDelegateClaim} from "./interfaces/IDelegateClaim.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MockStaking is IDelegateClaim, Ownable {
    address[] public tokens;
    address public swapperAddress;
    mapping(address => mapping(address => uint256)) public userToTokenToBalance;
    mapping(address => address) userToApprover;

    uint256 length = 5;

    constructor() {}

    function addTokenToList(address _tokenAddress) external onlyOwner {
        tokens.push(_tokenAddress);
    }

    function setSwapperAddress(address _swapperAddress) external onlyOwner {
        swapperAddress = _swapperAddress;
    }

    // Before executing this function, the user must approve the Mock staking to spend the token amount
    function stake(address _tokenAddress, uint256 _amount) public payable {
        if(_tokenAddress == address(0)){
            require(msg.value == _amount, "Amount does not match");
        } else {
            IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
        }
        userToTokenToBalance[msg.sender][_tokenAddress] += _amount;
    }

    function claim(address _userAddress, address _tokenAddress) external returns(uint256) {
        require(userToApprover[_userAddress] == msg.sender || msg.sender == _userAddress, "Operation not allowed");
        uint256 tokenBalance = userToTokenToBalance[_userAddress][_tokenAddress];
        userToTokenToBalance[_userAddress][_tokenAddress] = 0;

        if(_tokenAddress == address(0)){
            payable(_userAddress).transfer(tokenBalance);
        } else {
            require(IERC20(_tokenAddress).transfer(_userAddress, tokenBalance),"Transfer Failed");
        }

        return (tokenBalance);
    }

    //Transfer from Staking to Lugus
    function claimAll(address _userAddress) external returns(address[50] memory, uint256[50] memory) {
        require(userToApprover[_userAddress] == msg.sender || msg.sender == _userAddress, "Operation not allowed");
        // uint256 length = tokens.length;

        address[50] memory tokensToSwap;
        uint256[50] memory tokensToSwapBalances;

        for(uint8 i = 0; i < tokens.length; i++) {
            address tokenAddress = tokens[i];
            uint256 tokenBalance = userToTokenToBalance[_userAddress][tokenAddress];
            if(tokenBalance == 0){
                continue;
            }
            userToTokenToBalance[_userAddress][tokenAddress] = 0;
            require(IERC20(tokenAddress).transfer(swapperAddress, tokenBalance),"Transfer Failed");
            console.log(i);
            tokensToSwap[i] = tokenAddress;
            tokensToSwapBalances[i] = tokenBalance;
        }

        return (tokensToSwap, tokensToSwapBalances);

    }

    function allowClaim(address allowedAddress) external {
        userToApprover[msg.sender] = allowedAddress;
    }
}