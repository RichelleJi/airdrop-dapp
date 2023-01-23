import Airdrop_ABI from "../contracts/Airdrop.json";
import useContract from "./useContract";
import type { Airdrop } from "../contracts/types";

export default function useAirdropContract(tokenAddress?: string) {
  return useContract<Airdrop>(tokenAddress, Airdrop_ABI);
}