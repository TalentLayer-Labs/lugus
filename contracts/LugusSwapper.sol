pragma solidity ^0.8.0;
import {IDelegateClaim} from "./interfaces/IDelegateClaim.sol";

contract LugusSwapper {

    address[] tokens;
    
    enum Token{
        USDC,
        ETH
    }

    function claimAndSwap(address mockStakingAddress, Token token) public{
        uint256 value = IDelegateClaim(mockStakingAddress).claim(msg.sender);
            // swapToken(token.address, token.amount, token);
    }

    function claimAllAndSwap(address mockStakingAddress, Token token) public{
        (address[] memory tokens, uint256[] memory values) = IDelegateClaim(mockStakingAddress).claimAll(msg.sender);
        
        // for(var i = 0; i<tokens.length; i++){
        //     swapTokenToUsdc(token[i], token.amount, token);
        // }
    }
}
