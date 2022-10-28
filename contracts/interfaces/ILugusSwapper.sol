pragma solidity ^0.8.0;

contract ILugusSwapper {

    enum Token {
        USDC,
        ETH,
    }

    function claimAndSwap(address, address);

    function claimAllAndSwap(address, address);
}
