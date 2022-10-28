pragma solidity ^0.8.0;

contract LugusSwapper {

    address[] tokens;
    enum Token{
        USDC,
        ETH,
    }

    function claimAndSwap(address mockStakingAddress, Token token){
        {address token, uint256 value} = DelegateClaimInterface(mockStakingAddress).claim(msg.sender);
            swapToken(token.address, token.amount, token);
    }

    function claimAllAndSwap(address mockStakingAddress, Token token){
        {address tokens, uint256 values} = DelegateClaimInterface(mockStakingAddress).claimAll(msg.sender);
        
        for(var i = 0; i<tokens.length; i++){
            swapTokenToUsdc(token[i], token.amount, token);
        }
    }
}
