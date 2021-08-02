import React from 'react'
import styled from 'styled-components'
// import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody } from '@kiwifinancebsc/uikit'
// import useI18n from 'useI'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Page from 'components/layout/Page'
import Divider from './components/Divider'
import TotalReferralCount from './components/TotalReferralCount'
import ReferralLink from './components/ReferralLink'

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

const StyledCard = styled(Card)`
  width:70%;
  margin-left: auto;
  margin-right: auto;
  margin-top:24px;
  text-align: center;

`

const Actions = styled.div`
  margin-top: 24px;
`

const StyleHeading = styled(Heading)`
    margin-top: 15px
`

const Referral: React.FC = () => {
    // const TranslateString = useI18n()
    // const { account } = useWeb3React()
    const { account } : { account : string } = useWallet()
    return (
      <Page>
        <Hero>
          <Heading as="h1" size="xl" color="primary" mb="50px" style={{ textAlign: 'center' }}>
            Referral
          </Heading>
          <Heading size="md" color="secondary">
            Share the referral link below to invite your friends and earn 1% of your friends earnings FOREVER!
          </Heading>
        </Hero>
        <div>
          <Divider/>
          <StyledCard>                  
            <Actions>
                {account ? ( 
                  <div>
                      <ReferralLink />
                      <TotalReferralCount />
                  </div>     
                ) : (
                  <CardBody>
                  <div>
                      <UnlockButton />    
                      <StyleHeading size="md">Unlock wallet to get your unique referral link</StyleHeading>    
                  </div>   
                    </CardBody>   
                )}
            </Actions>
                
          </StyledCard>
        </div>
      </Page>  
    )
}
// slava ukraini!
export default Referral