// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./IClubContract.sol";
import "hardhat/console.sol";


contract InviteOnlyClubContract is Ownable, Initializable, IClubContract {
    uint256 totalIdeas;
    uint256 defaultInvites;
    string public name;
    string public metadata;

    event NewInvite(address,address,uint256);

    mapping(uint256 => Vote[]) public votes;
    mapping(uint256 => Comment[]) public comments;
    mapping(uint256=>mapping(uint256 => Comment[])) public replies;
    Idea[] public ideas;
    mapping(address => uint256) public lastPostedAt;

    mapping(address=> uint256) public weightOfMember;
    mapping(address=> uint256) public invites;

    mapping(uint256 => mapping(address => bool)) voters;
    mapping(uint256 => uint256) public up;
    mapping(uint256 => uint256) public down;

    constructor() payable {}

    modifier initialized() {
        _;
    }
    modifier weightMoreThenZero() {
        uint256 weight=_memberWeight(msg.sender);
        require(
            weight>0,
            "No Weight"
        );
        _;
    }

    function initialize(bytes memory _data, address _owner)
        external
        initializer
    {
        // @imp make sure doesn't get initialized again
        // @imp only owners can access
        string memory _name;
        string memory _metadata;
        uint256 _defaultInvites;
        (_defaultInvites, _name, _metadata) = dataDecoder(_data);
        defaultInvites=_defaultInvites;
        name = _name;
        metadata = _metadata;
        invites[_owner]=defaultInvites;
        weightOfMember[_owner]+=1;
        //    transferOwnership(_owner);
        //    emit Initialized(_nftContract);
    }

    function dataDecoder(bytes memory data)
        internal
        pure
        returns (uint256 _defaultInvites,string memory _name, string memory _metadata)
    {
        (_defaultInvites,_name,_metadata) = abi.decode(data, (uint256 , string, string));
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function setMetadata(string memory _metadata) public onlyOwner {
        metadata = _metadata;
    }

    // function modifyModerators(address _moderator,bool _membership) public onlyOwner {
    //     moderators[_moderator]=_membership;
    // }

    function memberWeight(address _member)
        external
        view
        override
        returns (uint256)
    {
        return _memberWeight(_member);
    }

    function _memberWeight(address _member) internal view returns (uint256) {
         return weightOfMember[_member];
    }

    function postIdea(string memory _message, string memory _metadata)
        external
        override
        initialized
        weightMoreThenZero
    {
        require(
            lastPostedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );
        totalIdeas += 1;
        ideas.push(Idea(msg.sender, _message, _metadata, block.timestamp));
        up[totalIdeas] = 0;
        down[totalIdeas] = 0;
        emit NewIdea(msg.sender, block.timestamp, _message,_metadata);
    }

    function vote(uint256 _index, uint256 _type) external override         initialized
        weightMoreThenZero
 {
        require(voters[_index][msg.sender] == false, "Already voted");
        require(_type < 2, "Invalid type");
        uint256 weight = _memberWeight(msg.sender);
        if (_type == 0) {
            up[_index] += weight;
        } else if (_type == 1) {
            down[_index] += weight;
        }
        Vote[] storage newVote = (votes[_index]);
        newVote.push(Vote(msg.sender, weight, _type));
        voters[_index][msg.sender] = true;
        emit NewVote(_index, msg.sender, weight, _type);
    }

    function getAllIdeas() external view override returns (Idea[] memory) {
        return ideas;
    }

    function getAllVotes(uint256 _index)
        external
        view
        override
        returns (Vote[] memory)
    {
        return votes[_index];
    }
    function getAllComments(uint256 _index)
        external
        view
        override
        returns (Comment[] memory)
    {
        return comments[_index];
    }

    function postComment(uint256 _index, string memory _metadata)
        external
        override
        initialized
        weightMoreThenZero
    {
        Comment[] storage newComment = (comments[_index]);
        newComment.push(Comment(msg.sender,_metadata,block.timestamp));
        emit NewComment(_index,msg.sender,_metadata);
    }

    function invite(address _invitee)
        external
        initialized
        weightMoreThenZero
    {
        weightOfMember[_invitee]+=1;
        if(invites[_invitee]==0)
        invites[_invitee]=defaultInvites;
        invites[msg.sender]-=1;
        emit NewInvite(_invitee,msg.sender,weightOfMember[_invitee]);
    }
    function postReply(
        uint256 _indexOfPost,
        uint256 _indexOfComment,
        string memory _metadata
    ) external override initialized
        weightMoreThenZero
    {
        Comment[] storage newReply = (replies[_indexOfPost][_indexOfComment]);
        newReply.push(Comment(msg.sender, _metadata, block.timestamp));
        emit NewReply(_indexOfPost, _indexOfComment, msg.sender, metadata);
    }
}