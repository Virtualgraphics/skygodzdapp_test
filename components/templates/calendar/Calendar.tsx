
import { MediaRenderer, useAddress, useContract, useContractMetadata, useNFTs, ConnectWallet } from "@thirdweb-dev/react";
import Gift from "../gift/Gift";




const CALENDAR = () => {

    const address = useAddress();

    const { contract } = useContract("0xE2aF53cDcad7e9C838BfFAF69C82dc4fcE0506AF");
    const { data: contractMetadata } = useContractMetadata(contract);
    const { data: nfts, isLoading: isLoadingNfts } = useNFTs(contract);
  


  return (


<div className='flex justify-center m-auto max-w-screen-xl py-32 '>
      {address ? (
        isLoadingNfts ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-flow-col gap-4 mt-20">
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

        <div className='p-20 bg-blue-600 rounded-3xl'>
        <div className='flex flex-col justify-center m-auto'>
          <MediaRenderer
            src={contractMetadata?.image}
            className='rounded-2xl'
          />
          <h1 className='text-white text-lg text-center pt-12'>Connect your wallet to claim an Alien NFT </h1>
        </div>
        <div className="pt-8 flex justify-center m-auto ">
       <ConnectWallet />
       </div>
        
        </div>
      )}
      
    </div>
 
  
  );
};

export default CALENDAR;