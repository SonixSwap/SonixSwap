import React from 'react'
import { Card, CardBody, Heading, Text } from '@kiwifinancebsc/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useFarms, usePriceKiwiBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { getKiwiAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import CardValue from './CardValue'

const StyledKiwiStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const KiwiStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getKiwiAddress())
  const kiwiSupply = totalSupply ? getBalanceNumber(totalSupply, 8) - getBalanceNumber(burnedBalance, 8) : 0
  const farms = useFarms()
  const XOSprice = usePriceKiwiBusd()
  const marketCap = XOSprice.times(new BigNumber(kiwiSupply)).toNumber()

  let wbnbPerBlock
  if (farms && farms[0] && farms[0].wbnbPerBlock) {
    wbnbPerBlock = farms[0].wbnbPerBlock.toNumber()
  }

  return (
    <StyledKiwiStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'XOS Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={marketCap} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total XOS Supply')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply, 8)} />}
        </Row>
          <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total XOS Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {kiwiSupply && <CardValue fontSize="14px" value={kiwiSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New WBNB/block')}</Text>
          <Text bold fontSize="14px">{wbnbPerBlock}</Text>
        </Row>
      </CardBody>
    </StyledKiwiStats>
  )
}

export default KiwiStats
