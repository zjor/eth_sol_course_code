pragma solidity ^0.4.17;

// 0x309098f461e6b2afe4bd41e10b933740ada238e3

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns(uint256) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() {
        require(msg.sender == manager);
        
        uint index = random() % players.length;
        players[index].transfer(this.balance);        
    }

    function getPlayers() public view returns(address[]) {
    	return players;
    }

}