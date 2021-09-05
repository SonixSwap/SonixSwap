import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Image, Heading } from '@kiwifinancebsc/uikit'
import { BLOCKS_PER_YEAR, KIWI_PER_BLOCK } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools,useCloudFarms } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = useCloudFarms(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const block = useBlock()
  
  
  const Hero = styled.div`
    align-items: center;
    background-image: url('/images/1.png');
    background-repeat: no-repeat;
    background-position: top center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    margin-bottom: 32px;
    padding-top: 116px;
    text-align: center;

    ${({ theme }) => theme.mediaQueries.lg} {
      background-image: url('/images/1.png'), url('/images/2.png');
      background-position: left center, right center;
      height: 165px;
      padding-top: 0;
    }
  `

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.USDT) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    const rewardTokenPriceInBNB = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )
    const balas  = new BigNumber(pool.userData?.stakedBalance || 0)
    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked, 8))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    return {
      ...pool,
      isFinished: pool.salsaId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="lg" color="primary" mb="35px" style={{ textAlign: 'center' }}>
          {TranslateString(999, 'XOS Smart Staking Pool')}
        </Heading>
        <PoolTabButtons />
      </Hero>
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            <>
              {orderBy(openPools, ['sortOrder']).map((pool) => (
                <PoolCard key={pool.salsaId} pool={pool} />
              ))}
            </>
          </Route>
          <Route path={`${path}/history`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.salsaId} pool={pool} />
            ))}
          </Route>
        </FlexLayout>
      </div>
      <Image src="/images/farm-bg.png" alt="Sonixswap illustration" width={1080} height={600} responsive />
    </Page>
  )
}

export default Farm
