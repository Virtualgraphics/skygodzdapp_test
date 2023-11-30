import { Default } from '../components/layouts/Default';
import type { NextPage } from 'next';

import { MediaRenderer, useAddress, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

import { Gift } from "../components/templates/Gift";



const CALENDAR: NextPage = () => {

    const address = useAddress();

    const { contract } = useContract("0xE2aF53cDcad7e9C838BfFAF69C82dc4fcE0506AF");
    const { data: contractMetadata } = useContractMetadata(contract);
    const { data: nfts, isLoading: isLoadingNfts } = useNFTs(contract);
  


  return (

    <Default pageName="CALENDAR">



<div className='flex justify-center my-0 mx-auto max-w-screen-xl'>
      {address ? (
        isLoadingNfts ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 mt-20">
            {nfts && nfts.length > 0 ? (
              nfts.map((nft) => (
                <Gift
                  nft={nft}
                  key={nft.metadata.id}
                />
              ))
            ) : (
              <p>No NFTs found.</p>
            )}
          </div>
        )
      ) : (
        <div className='flex flex-col justify-center my-40 mx-auto'>
          <MediaRenderer
            src={contractMetadata?.image}
            className='rounded-lg'
          />
          <h1>Login to claim gifts.</h1>
        </div>
      )}
      
    </div>
  </Default>
  
  );
};

export default CALENDAR;