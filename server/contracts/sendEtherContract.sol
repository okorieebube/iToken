pragma solidity 0.5.5;

contract sendEtherContract {
    string public functionCalled;

    function sendEther() external payable{
        functionCalled = 'sendEther';
    }

    function () external payable{
        functionCalled = 'fallback';
    }
    
}