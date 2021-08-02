import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { Heading, Text, BaseLayout } from '@kiwifinancebsc/uikit'
import useI18n from 'hooks/useI18n'
import { useQueryParam, StringParam } from 'use-query-params';
import Page from 'components/layout/Page'
import rot13 from '../../utils/encode'
import { isAddress } from '../../utils/web3'
import KiwiStats from './components/KiwiStats'
import FarmStakingCard from './components/FarmStakingCard'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'

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

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const cookies = new Cookies();
  const [ref, setNum] = useQueryParam('ref', StringParam);

  if(ref) {
    if(isAddress(rot13(ref))) {
      cookies.set("ref", ref)
    }
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'Sonixswap')}
        </Heading>
        <Text>{TranslateString(578, 'The Best Modern Yield Farm on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
      <Cards>
        <FarmStakingCard />
        <TwitterCard/>
        <KiwiStats />
        <TotalValueLockedCard />
      </Cards>
      </div>
    </Page>
  )
}

export default Home
