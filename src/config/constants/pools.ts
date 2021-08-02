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
      56: '0x26C1a6750C88636C7053026f36D4097FC1c20A19',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://Sonixswap.io/',
    harvest: true,
    tokenPerBlock: '0.001',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 8,
  },
  {
    salsaId: 2,
    tokenName: 'XOS',
    earnToken: 'Ybaby',
    stakingTokenName: QuoteToken.XOS,
    stakingTokenAddress: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
    contractAddress: {
      97: '',
      56: '0x57213d1c733888281E497Cf53061331206578602',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://Sonixswap.io/',
    harvest: true,
    tokenPerBlock: '0.0001',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 9,
  }
]

export default pools
