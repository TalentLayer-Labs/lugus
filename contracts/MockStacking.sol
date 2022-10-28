pragma solidity ^0.8.0;

import {DelegateClaimInterface} from "./interfaces/DelegateClaimInterface.sol";

contract MockStacking is DelegateClaimInterface {
    struct tokenBalance {
        address tokenAddress;
        uint256 amount;
    }
    mapping(address => tokenBalance[]) public stackedTokens;
    mapping(address => tokenBalance[]) public tokensGains;

    //Before

        array tokens;
        mapping(address=>address) userToApprover;

    function claim(address userAddress){
        require(userToApprover[userAddress] == msg.sender || msg.sender == userAddress);
        gain = getGain(tokenAddress, userAddress)
        if(gain == 0){
    continue;
    }
        sendToken(msg.sender, gain))
        return [token, gain];
    }


    function claimAll(address userAddress){
        require(userToApprover[userAddress] == msg.sender || msg.sender == address);
        for(tokenAddress in tokens){
            gain = getGain(tokenAddress, address)
            if(gain == 0){
        continue
        }
            sendToken(gain, address))
            tokensSend.push(tokenAddress);
        }
        return tokensSend;
    }

    function allowClaim(address allowedAddress){
        require(address = msg.sender);
        userToApprover[msg.sender] = allowedAddress;
    }
}