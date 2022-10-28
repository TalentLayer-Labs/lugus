pragma solidity ^0.8.0;

interface IDelegateClaim {

    function allowClaim(address);

    function claimAll(address);

    function claim(address);
}
