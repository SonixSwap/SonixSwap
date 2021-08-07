import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    salsaId: 3,
    tokenName: 'XOS',
    earnToken: 'XEOS',
    stakingTokenName: QuoteToken.XOS,
    stakingTokenAddress: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
    contractAddress: {
      97: '',
      56: '0x86FaB29E3093648d619B608292b16cFdC917b286',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://Sonixswap.io/',
    harvest: true,
    tokenPerBlock: '0.64',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 8,
  },
  {
    salsaId: 2,
    tokenName: 'XOS',
    earnToken: 'CDIS',
    stakingTokenName: QuoteToken.XOS,
    stakingTokenAddress: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
    contractAddress: {
      97: '',
      56: '0x7d14c8fe264CEC8F5A7751c09a27Ca1fC4c3B366',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://Sonixswap.io/',
    harvest: true,
    tokenPerBlock: '0.0035',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 7,
  }
]

export default pools
