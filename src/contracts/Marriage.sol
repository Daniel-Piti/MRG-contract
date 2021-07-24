pragma solidity ^0.5.0;

contract Marriage {
    // VARS
    string public name = "Marriage";
    uint256 public id;
    mapping(uint256 => wedding) public weddings;

    constructor() public {
        id = 55555555;
    }

    struct wedding {
        string name1;
        string name2;
        string link1;
        string link2;
        address wedding_sender;
    }

    function addWedding(
        string memory _name1,
        string memory _name2,
        string memory _link1,
        string memory _link2
    ) public {
        require(
            (bytes(_name1).length > 0) &&
                (bytes(_name1).length > 0) &&
                (bytes(_link1).length > 0) &&
                (bytes(_link2).length > 0),
            "Names cant be empty"
        );
        weddings[id++] = wedding(_name1, _name2, _link1, _link2, msg.sender);
    }

    function getWedding(uint256 _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
            weddings[_id].name1,
            weddings[_id].name2,
            weddings[_id].link1,
            weddings[_id].link2,
            weddings[_id].wedding_sender
        );
    }

    function getNextId() public view returns (uint256) {
        return id;
    }

    function divorce(uint256 _id) public returns (uint256) {
        require(
            msg.sender == weddings[_id].wedding_sender,
            "Only the wedding address can divorce"
        );
        delete weddings[_id];
    }

    function checkIdExists(uint256 _id) public view returns (bool) {
        wedding memory w = weddings[_id];
        if (bytes(w.name1).length == 0) return false;
        return true;
    }
}
