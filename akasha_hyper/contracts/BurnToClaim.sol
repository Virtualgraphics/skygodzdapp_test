// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721LazyMint.sol";
import "@thirdweb-dev/contracts/base/ERC1155Base.sol";
import "@thirdweb-dev/contracts/base/ERC1155Drop.sol";

contract BurnToClaim is ERC721LazyMint {
    // Store constant values for the 2 NFT Collections:
    // 1. Is the Advent Calendar Alien NFT Collection
    ERC1155Drop public immutable mainNFT;
    // 2. Is the Cosmic Fire Burn NFT Collection
    ERC1155Drop public immutable burnNFT;

    constructor(
        string memory _name,
        string memory _symbol,
        address _defaultAdmin,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _mainNFT,
        address _burnNFT

    ) ERC721LazyMint(_defaultAdmin,_name, _symbol, _royaltyRecipient, _royaltyBps) 

     {
        mainNFT = ERC1155Drop(_mainNFT);
        burnNFT = ERC1155Drop(_burnNFT);
    }

    function verifyClaim(address _claimer, uint256 _quantity)
        public
        view
        virtual
        override
    {
        // 1. Override the claim function to ensure a few things:
        // - They own an NFT from the BAYClone contract
        require(mainNFT.balanceOf(_claimer, 0) >= _quantity, "You don't own enough Alien NFTs");
        // - They own an NFT from the SerumClone contract
        require(burnNFT.balanceOf(_claimer, 0) >= _quantity, "You don't own enough Cosmic Burn NFTs");
    }

    function _transferTokensOnClaim(address _receiver, uint256 _quantity) internal override returns(uint256) 
    
    {
        burnNFT.burn(
            _receiver,
            0,
            _quantity
        );
        
        // Use the rest of the inherited claim function logic
      return super._transferTokensOnClaim(_receiver, _quantity);
    }
}