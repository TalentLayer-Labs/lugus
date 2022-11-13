pragma solidity ^0.8.0;

interface ILugusSwapper {

    function claimAndSwap(address mockStakingAddress, address token) external;

    function claimAllAndSwap(address mockStakingAddress, address token) external;
}