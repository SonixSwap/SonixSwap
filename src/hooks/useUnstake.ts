import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
  fetchCloudFarmsPublicDataAsync,updateUserStakedBalanceCloudFarms,updateUserBalanceCloudFarms
} from 'state/actions'
import { unstake, salsaUnstake, salsaEmegencyUnstake,unstakeXOS } from 'utils/callHelpers'
import { useMasterchef, useSalsaChef, useMasterchefXOS } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const SALSAIDS = [1]

export const useSalsaUnstake = (salsaId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const salsaChefContract = useSalsaChef(salsaId)
  const isOldSalsa = SALSAIDS.includes(salsaId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (salsaId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSalsa) {
        const txHash = await salsaEmegencyUnstake(salsaChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await salsaUnstake(salsaChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(salsaId, account))
      dispatch(updateUserBalance(salsaId, account))
      dispatch(updateUserPendingReward(salsaId, account))
    },
    [account, dispatch, isOldSalsa, masterChefContract, salsaChefContract, salsaId],
  )

  return { onUnstake: handleUnstake }
}

export const useUnStakeXOS = (salsaId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchefXOS()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeXOS(masterChefContract,amount,account);
      dispatch(fetchCloudFarmsPublicDataAsync())
      console.info(txHash)
      dispatch(updateUserStakedBalanceCloudFarms(salsaId, account))
      dispatch(updateUserBalanceCloudFarms(salsaId, account))
    },
    [account, dispatch, masterChefContract, salsaId],
  )

  return { onUnstake: handleStake }
}

export default useUnStakeXOS
