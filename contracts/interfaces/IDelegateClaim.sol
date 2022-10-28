pragma solidity ^0.8.0;

interface IDelegateClaim {
    function allowClaim(address userAddress, address allowedAddress) external;
    function claimAll(address _userAddress) external returns(address[] memory, uint256[] memory);
    function claim(address _userAddress, address _tokenAddress) external returns(uint256);
}
