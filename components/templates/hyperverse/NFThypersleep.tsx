import {
    ThirdwebNftMedia,
    useContract,
    useNFT,
    Web3Button,
  } from "@thirdweb-dev/react";
  import type { FC } from "react";
 
  


  interface NFThypersleepProps {
    tokenId: number;
  }
  
  const NFThypersleep: FC<NFThypersleepProps> = ({ tokenId }) => {

    const nftDropContractAddress = "0x7A6Ed58597a2dac370984544BB779bbE0397d3fF";
    const stakingContractAddress = "0xBaDEbBa4B7eC14D0622ecd84B0490Cb61ae8996a";
    const tokenContractAddress = "0x7aFD1de6D8eF342a9CD903E4A5A04c6078420e6f";


    const { contract: contract } = useContract(nftDropContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, tokenId);
  
    return (
      <>
        {nft && (
          <div className=" text-white font-semibold justify-center m-auto  ">
            {nft.metadata && (
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="w-full max-h-48 justify-center m-auto"
              />
            )}
            <h3 className="py-2">{nft.metadata.name}</h3>
            <div className="pb-6">
            <Web3Button
              action={(contract) => contract?.call("withdraw", [[nft.metadata.id]])}
              contractAddress={stakingContractAddress}
            >
              Unstake
            </Web3Button></div>
          </div>
        )}
      </>
    );
  };
  export default NFThypersleep;