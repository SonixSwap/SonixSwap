/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/cloudfarms'
import BigNumber from 'bignumber.js'
import { fetchPoolsBlockLimits, fetchPoolsTotalStatking } from './fetchPools'
import {
  fetchPoolsAllowanceXOS,
  fetchUserBalancesXOS,
  fetchUserStakeBalancesXOS,
  fetchUserPendingRewardsXOS,
  fecthTotalStacking,
  getTotalCanUnstake
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'


const initialState: PoolsState = { data: [...poolsConfig] }

export const CloudFarmsSlice = createSlice({
  name: 'CloudFarms',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.salsaId === pool.salsaId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.salsaId === pool.salsaId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, salsaId } = action.payload
      const index = state.data.findIndex((p) => p.salsaId === salsaId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = CloudFarmsSlice.actions

// Thunks
export const fetchCloudFarmsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()
  
  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.salsaId === pool.salsaId)
    const totalStaking = totalStakings.find((entry) => entry.salsaId === pool.salsaId)
    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

async function fetchPrice() {
  const response = await fetch("https://api.pancakeswap.info/api/v2/tokens/0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc")
  return response.json();
}

export const fetchCloudFarmsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowanceXOS(account)
  
  
  const stakingTokenBalances = await fetchUserBalancesXOS(account)
  const stakedBalances = await fetchUserStakeBalancesXOS(account)
  const pendingRewards = await fetchUserPendingRewardsXOS(account)
  const totalStack = await fecthTotalStacking()
  const price = await fetchPrice();
  const totalUnstack = await getTotalCanUnstake(account)
  const userData = poolsConfig.map((cloudfarms) => ({
    salsaId: cloudfarms.salsaId,
    allowance: allowances[cloudfarms.salsaId],
    stakingTokenBalance: stakingTokenBalances[cloudfarms.salsaId],
    stakedBalance: stakedBalances[cloudfarms.salsaId],
    pendingReward: pendingRewards[cloudfarms.salsaId],
    totalStaking: totalStack,
    xosprice: price.data.price,
    unstakeBalance:totalUnstack
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowanceCloudFarms = (salsaId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowanceXOS(account)
  dispatch(updatePoolsUserData({ salsaId, field: 'allowance', value: allowances[salsaId] }))
}

export const updateUserBalanceCloudFarms = (salsaId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalancesXOS(account)
  dispatch(updatePoolsUserData({ salsaId, field: 'stakingTokenBalance', value: tokenBalances[salsaId] }))
}

export const updateUserStakedBalanceCloudFarms = (salsaId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalancesXOS(account)
  dispatch(updatePoolsUserData({ salsaId, field: 'stakedBalance', value: stakedBalances[salsaId] }))
}

export const updateUserPendingRewardCloudFarms = (salsaId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewardsXOS(account)
  dispatch(updatePoolsUserData({ salsaId, field: 'pendingReward', value: pendingRewards[salsaId] }))
}


export default CloudFarmsSlice.reducer
