import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/cloudfarms'
import { useMasterchefXOS } from 'hooks/useContract'
import masterChefABI from 'config/abi/masterchefXOS.json'
import salsaChefABI from 'config/abi/salsaChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getMasterChefAddressXOS } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

// Pool 0, Kiwi / Kiwi is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
const bnbPools = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.BNB)
const nonMasterPools = poolsConfig.filter((p) => p.salsaId !== 0)
const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddressXOS())

export const fetchPoolsAllowanceXOS = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.salsaId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalancesXOS = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.salsaId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await web3.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.salsaId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalancesXOS = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(masterChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.salsaId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Kiwi / Kiwi pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo(account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewardsXOS = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(salsaChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.salsaId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Kiwi / Kiwi pool
  const pendingReward = await masterChefContract.methods.pendingReward(account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}

export const fecthTotalStacking = async () => {
  const totalStack = await masterChefContract.methods.getTotalStakedAmount().call()
  return totalStack
}

export const getTotalCanUnstake = async (account) => {
  const totalUnstack = await masterChefContract.methods.getTotalAmountCanRemove(account).call()
  return totalUnstack
}
