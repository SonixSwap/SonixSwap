import { CloudFarmConfig, QuoteToken, PoolCategory } from './types'

const cloudfarms: CloudFarmConfig[] = [
  {
    salsaId: 6  ,
    tokenName: 'XOS',
    earnToken: 'BUSD',
    stakingTokenName: QuoteToken.XOS,
    stakingTokenAddress: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
    contractAddress: {
      97: '',
      56: '0x844AB3736d9205BCaaA3BB8735a4a56563041dF2',
    },
    poolCategory: PoolCategory.BINANCE,
    projectLink: 'https://Sonixswap.io/',
    harvest: true,
    tokenPerBlock: '0.64',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 8
  }
]

export default cloudfarms
