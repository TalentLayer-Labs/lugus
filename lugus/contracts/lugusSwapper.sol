pragma solidity ^0.8.0;

contract LugusSwapper {
    function claimAndSwap(mockStakingAddress){
        token = DelegateClaimInterface(mockStakingAddress).claim(msg.sender);
        swapTokenToEth(token.address, token.amount);
    }

    function claimAllAndSwap(mockStakingAddress){
        tokens = DelegateClaimInterface(mockStakingAddress).claimAll(msg.sender);
        for(token in tokens){
        swapTokenToUsdc(token.address, token.amount)
        }
    }
}
