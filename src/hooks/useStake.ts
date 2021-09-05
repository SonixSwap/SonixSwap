import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance, fetchCloudFarmsPublicDataAsync,updateUserStakedBalanceCloudFarms,updateUserBalanceCloudFarms } from 'state/actions'
import { stake, salsaStake, salsaStakeBnb,stakeXOS } from 'utils/callHelpers'
import { useMasterchef, useSalsaChef, useMasterchefXOS } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSalsaStake = (salsaId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const salsaChefContract = useSalsaChef(salsaId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (salsaId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await salsaStakeBnb(salsaChefContract, amount, account)
      } else {
        await salsaStake(salsaChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(salsaId, account))
      dispatch(updateUserBalance(salsaId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, salsaChefContract, salsaId],
  )

  return { onStake: handleStake }
}

export const useStakeXOS = (salsaId, priceXOS) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchefXOS()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeXOS(masterChefContract,amount,account,priceXOS);
      dispatch(fetchCloudFarmsPublicDataAsync())
      console.info(txHash)
      dispatch(updateUserStakedBalanceCloudFarms(salsaId, account))
      dispatch(updateUserBalanceCloudFarms(salsaId, account))
    },
    [account, dispatch, masterChefContract, salsaId,priceXOS],
  )

  return { onStake: handleStake }
}

export default useStake
