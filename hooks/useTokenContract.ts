// import ERC20_ABI from "../contracts/ERC20.json";
import ERC20_ABI from "../contracts/MagnaToken.json";
import useContract from "./useContract";
import type { MagnaToken } from "../contracts/types";

export default function useTokenContract(tokenAddress?: string) {
  return useContract<MagnaToken>(tokenAddress, ERC20_ABI);
}
