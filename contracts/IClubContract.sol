// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IClubContract {

    struct Idea {
        address ideator; 
        string message; 
        string metadata; 
        uint256 timestamp;
    }
    struct Comment {
        address commentator; 
        string metadata; 
        uint256 timestamp;
    }
    struct Vote {
        address voter; 
        uint256 weight;
        uint256  _type;
    }

    event NewIdea(address indexed from, uint256 timestamp, string message,string metadata);
    event NewVote(uint256 index,address indexed from, uint256 weight, uint256 _type);
    event NewComment(uint256 index,address indexed from, string metadata);
    event NewReply(uint256 ,uint256 ,address indexed from, string metadata);


    // function isMember(address _member) external view returns (bool);
    
    function memberWeight(address _member) external view returns (uint256);

    function postIdea(string memory _message,string memory _metadata) external;
    function postComment(uint256 _index,string memory _metadata) external;
    function postReply(uint256 _indexOfPost,uint256 _indexOfComment,string memory _metadata) external;
    
    function vote(uint256 _index,uint256  _type) external;

    function getAllIdeas() external view returns (Idea[] memory) ;

    function getAllVotes(uint256 _index) external view returns (Vote[] memory) ;

    function getAllComments(uint256 _index) external view returns (Comment[] memory) ;
}