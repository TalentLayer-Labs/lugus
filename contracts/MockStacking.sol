pragma solidity ^0.8.0;

import {DelegateClaimInterface} from "./interfaces/DelegateClaimInterface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockStacking is DelegateClaimInterface, Ownable {
    address[] public tokens;
    address public swapperAddress;
    uint private counter;
    mapping(address => mapping(address => uint256)) public userToTokenToBalance;
    mapping(address => address) userToApprover;

    constructor() {
    }

    function addTokenToList(address _tokenAddress) external onlyOwner {
        tokens.push(_tokenAddress);
        counter++;
    }

    function setSwapperAddress(address _swapperAddress) external onlyOwner {
        swapperAddress = _swapperAddress;
    }

    function stake(address _tokenAddress, uint256 _amount) public payable {
        if(_tokenAddress == address(0)){
            require(msg.value == _amount, "Amount does not match");
        } else {
            require(IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount),"Transfer Failed");
        }
        userToTokenToBalance[msg.sender][_tokenAddress] += _amount;
    }

    function claim(address _userAddress, address _tokenAddress) external {
        require(userToApprover[_userAddress] == msg.sender || msg.sender == _userAddress);
        uint256 tokenBalance = userToTokenToBalance[msg.sender][_tokenAddress];
        userToTokenToBalance[msg.sender][_tokenAddress] = 0;

        if(_tokenAddress == address(0)){
            payable(msg.sender).transfer(tokenBalance);
        } else {
            require(IERC20(_tokenAddress).transfer(msg.sender, tokenBalance),"Transfer Failed");
        }
    }

    //     gain = getGain(tokenAddress, userAddress)
    //     if(gain == 0){
    // continue;
    // }
    //     sendToken(msg.sender, gain))
    //     return [token, gain];
    // }


    //Transfer from Staking to Lugus
    function claimAll(address _userAddress) external {
        require(userToApprover[_userAddress] == msg.sender || msg.sender == _userAddress);

        for(uint8 i = 0; i < counter; i++) {
            address tokenAddress = tokens[i];
            uint256 tokenBalance = userToTokenToBalance[_userAddress][tokenAddress];
            if(tokenBalance == 0){
                continue;
            }
            userToTokenToBalance[_userAddress][tokenAddress] = 0;
            require(IERC20(tokenAddress).transfer(swapperAddress, tokenBalance),"Transfer Failed");
        }
    }

    function allowClaim(address userAddress, address allowedAddress) override external {
        require(userAddress == msg.sender, "You can't perform this action");
        userToApprover[msg.sender] = allowedAddress;
    }
}