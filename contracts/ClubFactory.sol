// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "hardhat/console.sol";

contract ClubFactory is Ownable {
    uint256 public totalImplementation;
    address[] public implementationClubContract;
    uint256 public totalClubs;
    address[] public clubs;
    event ImplementationAdded(uint256 index,address _clubContract);
    event ClubCreated(uint256 index,address clone,bytes _data);
    constructor()  { }
    function addClubImplementation(address _clubContract) onlyOwner public {
       require(_clubContract!=address(0));
       implementationClubContract.push(_clubContract);
       totalImplementation+=1;
       emit ImplementationAdded(totalImplementation,_clubContract);
    }
    function deployClub(uint256 index, bytes memory _data) public {
      require(implementationClubContract[index]!=address(0));
      address clone= Clones.clone(implementationClubContract[index]);  
      (bool success, bytes memory returnData) = clone.call(abi.encodeWithSignature("initialize(bytes,address)",_data,msg.sender));
      require(success && (returnData.length == 0 || abi.decode(returnData, (bool))), "Initialization Failed");
      clubs.push(clone);
      totalClubs+=1;
      emit ClubCreated(index,clone,_data);
    }
    function getClubs() public view returns (address[] memory){
       return clubs;
    }
}