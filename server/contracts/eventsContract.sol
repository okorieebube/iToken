pragma solidity 0.5.5;

contract eventsContract{

    event myEvent(
        uint indexed id,
        uint indexed date,
        string value
    );

    uint nextId;

    function emitEvent(string calldata value) external {
        emit myEvent(nextId, now, value);
        nextId++;
    }


}