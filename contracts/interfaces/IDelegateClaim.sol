pragma solidity ^0.8.0;

interface IDelegateClaim {

    function claim(address _userAddress, address _tokenAddress) external returns(uint256);
    function claimAll(address) public;
    function allowClaim(address userAddress, address allowedAddress) external;
}
