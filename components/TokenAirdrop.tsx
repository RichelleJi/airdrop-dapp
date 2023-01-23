import React, {useState} from "react";
import useAirdropContract from "../hooks/useAirdropContract";
import goerliEnvConfig from "../app.config";
import useTokenContract from "../hooks/useTokenContract";
import toast, { Toaster } from 'react-hot-toast';

function TokenAirdrop({
  tokenRecipients,
  tokenAmounts
  }){
  const airdropContract = useAirdropContract(goerliEnvConfig.airDropAddress);
  const tokenContract = useTokenContract(goerliEnvConfig.magnaTokenAddress);
  const APPROVAL_ERROR_MESSAGE = "The approval has not been processed successfully, please check the logs and try" +
  " again later!"
  const AIRDROP_ERROR_MESSAGE = "The Airdrop has not been processed successfully, please check the logs and try" +
  " again later!"

  const handleOnAirdrop = async (e) => {
    console.log("start airdrop")
    const token_sum = tokenAmounts.reduce((partialSum, a) => partialSum + a, BigInt(0));

    try {
      await tokenContract.approve(goerliEnvConfig.airDropAddress, token_sum)
    } catch (error) {
      console.log(`Token approval failed ${error}`);
      toast.error(APPROVAL_ERROR_MESSAGE)
      return
    }

    await airdropContract.airdropTokens(tokenRecipients, tokenAmounts).catch((error) => {
      console.log(`Token Airdrop failed ${error}`);
      toast.error(AIRDROP_ERROR_MESSAGE)
    });
    //todo: handle overflow problem, underflow
    //todo: check for sufficient tokens
    //todo: optimize for scaling
    //todo: add success error message
  }

  return (
    <div>
      <button
        onClick={(e) => {
          handleOnAirdrop(e);
        }}>
        AIRDROP
      </button>
      <Toaster position="top-left" />
    </div>
  );
}
export default TokenAirdrop