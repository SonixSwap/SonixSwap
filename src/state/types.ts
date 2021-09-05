import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig,CloudFarmConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  },
  wbnbPerBlock?: BigNumber
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    totalStaking: BigNumber
    xosprice: number
    unstakeBalance:BigNumber
  }
}

export interface CloudFarm extends CloudFarmConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    totalStaking: BigNumber
    xosprice: number
  }
}

// Slices states

export interface FarmsState {
  data: Farm[]
}

export interface CloudFarmsState {
  data: Pool[]
}

export interface PoolsState {
  data: Pool[]
}

// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
  cloudFarms:CloudFarmsState
}
