import { MediaRenderer, Web3Button, useAddress, useClaimConditions, useContract, useNFTBalance } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";


type GiftProps = {
    nft: NFT;
};

export const Gift = ({ nft }: GiftProps) => {
    const address = useAddress();
    const currentDate = new Date();

    const { contract } = useContract("0xE2aF53cDcad7e9C838BfFAF69C82dc4fcE0506AF");

    const { data: isOwned, isLoading: isLoadingIsOwned } = useNFTBalance(contract, address, nft.metadata.id);

    const { data: claimCondition, isLoading: isLoadingClaimCondition } = useClaimConditions(contract, nft.metadata.id);

    if(claimCondition === undefined || claimCondition.length === 0) {
        return (
            <div>
            </div>
        )
    };

    const isDatePassed = claimCondition && claimCondition[0].startTime < currentDate;
    const displayGiftDay = parseInt(nft.metadata.id) + 1;

    return (
        <div className="flex flex-col justify-center m-auto max-w-screen-xl">
            <div className="relative">
                {!isLoadingIsOwned && !isLoadingClaimCondition && isOwned && (
                    <>
                        <MediaRenderer
                            src={isDatePassed && isOwned.toNumber() > 0 ? nft.metadata.image : "https://www.skygodz.com/wp-content/uploads/2023/11/hyperverse_cover.jpg"}
                            className="rounded-lg"
                        />
                        <h3 className="absolute mt-0 ml-8 text-black text-lg font-semibold rounded-lg bg-white">Day {displayGiftDay}</h3>
                        {address && (
                            isOwned.toNumber() > 0 ? (
                                <p className="absolute mb-3 ml-1/2 w-4/5 bg-blue-900 text-blue-100 text-lg font-semibold rounded-lg p-4 text-center ">Claimed!</p>
                            ) : (
                                <Web3Button
                                    contractAddress={"0xE2aF53cDcad7e9C838BfFAF69C82dc4fcE0506AF"}
                                    action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
                                    isDisabled={!isDatePassed || isOwned.toNumber() > 0}
                                    className="absolute mb-0 ml-0 bg-white text-black text-xl font-semibold rounded-t-none rounded-b-lg p-4 w-100"
                                >{
                                    isDatePassed ? (
                                        isOwned.toNumber() > 0 ? "Alien Claimed" : "Claim Alien"
                                    ) : (
                                        claimCondition![0].startTime.toLocaleString()
                                    )
                                }</Web3Button>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    )
};