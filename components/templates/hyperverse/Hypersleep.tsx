import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from 'next/image'

import Spinner from "../../layouts/Spinner";

import NFThypersleep from "./NFThypersleep";



const Hypersleep: NextPage = () => {

  const nftDropContractAddress = "0x7A6Ed58597a2dac370984544BB779bbE0397d3fF";
  const stakingContractAddress = "0xBaDEbBa4B7eC14D0622ecd84B0490Cb61ae8996a";
  const tokenContractAddress = "0x7aFD1de6D8eF342a9CD903E4A5A04c6078420e6f";
 


  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
 
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [[id]]);
  }

  if (isLoading) {
    return <div className="h-screen mt-96 justify-center m-auto flex"><Spinner/></div>;
  }



  return (

    <div className="justify-center px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
<div className="max-w-screen-xl sm:text-center sm:mx-auto">
            
    
       <div className="m-auto w-96py-2">
       <Image
       className="m-auto w-96 py-2"
       src="/assets/star_divider.svg"
       alt="Star Divider"
       width={1260}
       height={750}
     />
       </div>
 
     <h2 className="max-w-screen- justify-center  m-auto mb-4 text-3xl font-bold text-center text-yellow-100 sm:text-4xl sm:leading-none sm:m-auto font-Cinzel py-4 tracking-wider">
   Sky Godz: Hypersleep
     </h2>
     <hr className="max-w-screen-sm justify-center  m-auto border-yellow-200 py-1" />
     <p className="max-w-screen-sm  justify-center  m-auto text-base text-center text-white lg:text-xl md:text-lg sm:px-4 py-5 font-Jost pb-8">
     Send your Akasha Alien on extended journey to the core of the Hyperverse and get additional HYPER Token rewards.</p>
   

    


     <div className="pt-8 justify-center m-auto flex">



<div className=" rounded-3xl h-full bg-gradient-to-t from-blue-800/40 to-blue-900/20  shadow-3xl p-8 mb-8">



      {!address ? (
        <div className=" grid gid-rows-2 gap-4 ">


          <div className="justify-center m-auto flex">
          <Image
            className="m-auto w-96 rounded-3xl"
            src="/assets/hypersleep.jpg"
            alt="Star Divider"
            width={800}
            height={800}
          />
          </div>

       <div className="justify-center m-auto flex-row">
<h1 className="text-white font-Jost pb-8 text-center w-96 ">Please connect a wallet and make sure you own an Akasha Alien NFT.</h1>
<div>
<ConnectWallet

/>
</div>
</div>   

        </div>

      ) : (
        <>
          <h2 className="text-white pb-4">My Tokens</h2>
          <div className="grid grid-row-2 gap-4">

            <div className="w-full h-full p-4 border border-yellow-100 rounded-xl flex flex-col justify-items-center m-auto">
              <h3 className="my-0 font-Jost  text-yellow-100">Claimable Rewards</h3>
              <p className="text-base my-2 text-white font-Jost">
                <b>
                  {!claimableRewards
                    ? "Loading..."
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance?.symbol}
              </p>
            </div>


            <div className="w-full h-full p-4 border border-yellow-100 rounded-xl flex flex-col justify-items-center m-auto">
              <h3 className="my-0 font-Jost  text-yellow-100">Current Balance</h3>
              <p className="text-base my-2  font-Jost">
                <b>{tokenBalance?.displayValue}
                </b> {" "}
                
                {tokenBalance?.symbol}
              </p>
            </div>
          </div>


          <div className="py-8">
          <Web3Button
            action={(contract) => contract.call("claimRewards")}
            contractAddress={stakingContractAddress}
          >
            Claim Rewards
          </Web3Button>
          </div>

          
          <h2 className="text-white pb-4">My Akasha NFTs</h2>

         
          <div className="max-w-3xl">
            {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <NFThypersleep
                  tokenId={stakedToken.toNumber()}
                  key={stakedToken.toString()}
                />
              ))}
          </div>

          
      
        
          <div className="justify-center m-auto flex w-full">
            {ownedNfts?.map((nft) => (
              <div className="justify-center px-4" key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className="w-full max-h-48 rounded-2xl"
                />
                <div className="w-11/12 text-white justify-center mx-auto">
                <h3>{nft.metadata.name}</h3>

                <div className="pt-4">
                <Web3Button
                  contractAddress={stakingContractAddress}
                  action={() => stakeNft(nft.metadata.id)}
                >
                  Stake
                </Web3Button></div> </div>
              </div>
            ))}
          </div>
        </>
      )}
      </div>
      </div>
      </div>


    </div>

   
  );
};

export default Hypersleep;