import { MenuEntry } from '@kiwifinancebsc/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.sonixswap.io/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.sonixswap.io/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Cloud Farms',
    icon: 'TicketIcon',
    href: '/cloudfarms',
  },
  {
    label: 'Cloud Pools',
    icon: 'NftIcon',
    href: '/cloudpools',
  },
  {
    label: 'Referral',
    icon: 'GroupsIcon',
    href: '/referral',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/SonixSwap',
      },
    ],
  },
]

export default config
