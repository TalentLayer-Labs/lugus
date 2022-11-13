pragma solidity ^0.8.9;

interface IDelegateClaim {
    function allowClaim(address allowedAddress) external;
    function claimAll(address _userAddress) external returns(address[50] memory, uint256[50] memory);
    function claim(address _userAddress, address _tokenAddress) external returns(uint256);
}