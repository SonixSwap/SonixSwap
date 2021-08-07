import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'XOS',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
  //   },
  //   tokenSymbol: 'BUSD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x75A26B9EfD0a5BD1A73bCc791Ac14B818E11758E',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'XOS-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x9B10886938ECE3A47ad9B4A07549E6DED8142E95',
    },
    tokenSymbol: 'XOS',
    tokenAddresses: {
      97: '',
      56: '0x4BacB027E0bf98025d8EC91493F6512b9F0FA0dc',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'XOS-XEOS LP',
    lpAddresses: {
      97: '',
      56: '0x0354955461884E88EEb100a682A0f55099E950bc',
    },
    tokenSymbol: 'XEOS',
    tokenAddresses: {
      97: '',
      56: '0x223bFC3adaDE278151140f1d42Fb0d80334137b4',
    },
    quoteTokenSymbol: QuoteToken.XOS,
    quoteTokenAdresses: contracts.xos,
  },
  {
    pid: 3,
    lpSymbol: 'XOS-CDIS LP',
    lpAddresses: {
      97: '',
      56: '0x176E76B6033CB1031F00D37227Fd88B0535397c6',
    },
    tokenSymbol: 'CDIS',
    tokenAddresses: {
      97: '',
      56: '0x71B283F6065Dd95Cd1b14d01925A7f4DD7976009',
    },
    quoteTokenSymbol: QuoteToken.XOS,
    quoteTokenAdresses: contracts.xos,
  },
  {
      pid: 5,
      lpSymbol: 'USDT-BNB LP',
      lpAddresses: {
        97: '',
        56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
      },
      tokenSymbol: 'USDT',
      tokenAddresses: {
        97: '',
        56: '0x55d398326f99059fF775485246999027B3197955',
      },
      quoteTokenSymbol: QuoteToken.BNB,
      quoteTokenAdresses: contracts.wbnb,
    },
]

export default farms
