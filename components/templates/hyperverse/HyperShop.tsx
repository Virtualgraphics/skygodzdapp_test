
import { FC, useEffect } from 'react';
import { useState } from "react";
import Image from 'next/image'
import EnergyItems from './EnergyItems';
import { ENERGY_ADDRESS } from "../../../const/addresses";
import {
  MediaRenderer,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimedNFTSupply,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useUnclaimedNFTSupply,
  Web3Button,
  useNFTs,
} from "@thirdweb-dev/react";



const HyperShop = () => {


const address = useAddress();
const [quantity, setQuantity] = useState(1);


const { contract } = useContract(ENERGY_ADDRESS);
    const { data: nfts } = useNFTs(contract);
    console.log(nfts);
 
  return (
    <div className="justify-center px-4 py-12 mx-auto  sm:px-4 sm:max-w-xl md:max-w-full lg:max-w-6xl md:px-24 lg:px-8 lg:py-2">

<div>

<div className="justify-center mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-lg md:px-24 lg:px-8 lg:pt-10">
    <div className=" grid max-w-screen-lg row-gap-5 sm:text-center sm:mx-auto">
      

        <div className="m-auto w-96 py-2">
        <Image
      className="m-auto py-2"
      src="/assets/star_divider.svg"
      alt="Star Divider"
      width={1260}
      height={750}
    />
        </div>

        <h2 className="m-auto mb-4 text-2xl text-center font-bold text-yellow-100 sm:text-3xl sm:leading-none sm:m-auto font-Cinzel py-8 tracking-wider">
            SKY GODZ: Hyperverse Shop
            </h2>
            <hr className="w-full justify-center  border-yellow-200" />
       

        <p className="text-base text-white text-center lg:text-lg md:text-lg sm:px-4 pt-6 font-Jost">
       Purchase COSMIC ENERGY NFTs with $HYPER to boost your Akasha Alien's power and gain more $HYPER. 
        </p>
        </div>
        </div>

            {!nfts ? (
                <div className="flex justify-center mx-auto p-24">
                    
                </div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nfts?.map((nftItem) => (
                        <EnergyItems 
                            key={nftItem.metadata.id}
                            nft={nftItem}
                        />
                    ))}
                </div>
            )}

</div>



<div className="bg-gradient-to-t from-blue-800/40 to-blue-900/20 rounded-3xl w-3/4 flex justify-center m-auto shadow-lg p-8 mb-12">
<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>

<div className="">
<h1 className='text-left text-yellow-100 font-Proza text-xl'>The Cosmic Staff of the Akasha</h1>
<p className='text-white text-base font-Proza py-4'>Use the powerful staff of the Akasha to bend time and space and travel the dimensions of the Hyperverse and collect HYPER tokens in the process.</p>
<p className='text-blue-200 text-md font-Proza py-4'>Coming soon...</p>
</div>



<div className="w-80 h-80 justify-end flex m-auto">

<Image
      className=" rounded-3xl shadow-md"
      src="/assets/akasha_staff.gif"
      alt="Akasha Staff"
      width={500}
      height={500}
    />

</div>



</div>

</div>







</div>






       


  );
};


export default HyperShop;