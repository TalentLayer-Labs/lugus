pragma solidity ^0.8.0;

import {IDelegateClaim} from "./interfaces/IDelegateClaim.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockStaking is IDelegateClaim, Ownable {
    address[] public tokens;
    address public swapperAddress;
    uint private counter;
    mapping(address => mapping(address => uint256)) public userToTokenToBalance;
    mapping(address => address) userToApprover;

    constructor() {}

    function addTokenToList(address _tokenAddress) external onlyOwner {
        tokens.push(_tokenAddress);
        counter++;
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
        uint256 tokenBalance = userToTokenToBalance[msg.sender][_tokenAddress];
        userToTokenToBalance[msg.sender][_tokenAddress] = 0;

        if(_tokenAddress == address(0)){
            payable(msg.sender).transfer(tokenBalance);
        } else {
            require(IERC20(_tokenAddress).transfer(msg.sender, tokenBalance),"Transfer Failed");
        }

        return (tokenBalance);
    }

    //Transfer from Staking to Lugus
    function claimAll(address _userAddress) external returns(address[] memory, uint256[] memory) {
        require(userToApprover[_userAddress] == msg.sender || msg.sender == _userAddress);
        address[] memory tokensToSwap;
        uint256[] memory tokensToSwapBalances;

        for(uint8 i = 0; i < counter; i++) {
            address tokenAddress = tokens[i];
            uint256 tokenBalance = userToTokenToBalance[_userAddress][tokenAddress];
            if(tokenBalance == 0){
                continue;
            }
            userToTokenToBalance[_userAddress][tokenAddress] = 0;
            require(IERC20(tokenAddress).transfer(swapperAddress, tokenBalance),"Transfer Failed");
            tokensToSwap[i] = tokenAddress;
            tokensToSwapBalances[i] = tokenBalance;
        }

        return (tokensToSwap, tokensToSwapBalances);

    }

    function allowClaim(address allowedAddress) external {
        userToApprover[msg.sender] = allowedAddress;
    }
}