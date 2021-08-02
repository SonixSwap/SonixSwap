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
    lpSymbol: 'XOS-Ybaby LP',
    lpAddresses: {
      97: '',
      56: '0xd22aFeb8c65E95EecB170ef22E775FF64BF3E533',
    },
    tokenSymbol: 'Ybaby',
    tokenAddresses: {
      97: '',
      56: '0x006276057Dc847e2e73298Bf0Aef764B853DC2fD',
    },
    quoteTokenSymbol: QuoteToken.XOS,
    quoteTokenAdresses: contracts.xos,
  },
  {
    pid: 4,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
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
