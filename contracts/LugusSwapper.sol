pragma solidity ^0.8.0;
import {IDelegateClaim} from "./interfaces/IDelegateClaim.sol";

contract LugusSwapper {

    address[] tokens;

    function claimAndSwap(address mockStakingAddress, address token) external{
        uint256 value = IDelegateClaim(mockStakingAddress).claim(msg.sender, token);
            // swapToken(token.address, token.amount, token);
    }

    function claimAllAndSwap(address mockStakingAddress, address token) external{
        (address[] memory tokens, uint256[] memory values) = IDelegateClaim(mockStakingAddress).claimAll(msg.sender);
        
        // for(var i = 0; i<tokens.length; i++){
        //     swapTokenToUsdc(token[i], token.amount, token);
        // }
    }
}
