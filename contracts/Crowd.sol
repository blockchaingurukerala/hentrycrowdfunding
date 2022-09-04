// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Crowd {
    uint public balance=0;
    function donateFunds() public payable {
        balance=balance+msg.value;
    }
}