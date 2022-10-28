pragma solidity ^0.8.0;

contract ILugusSwapper {

    enum Token {
        USDC,
        ETH
    }

    function claimAndSwap(address mockStakingAddress, Token token) public;

    function claimAllAndSwap(address mockStakingAddress, Token token) public;
}