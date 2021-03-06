import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@kiwifinancebsc/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  // const tmp = parseFloat(rawEarningsBalance.toFixed(8)) === 0 ? '0' : parseFloat(rawEarningsBalance.toFixed(8)).toExponential()
  // const displayBalance = rawEarningsBalance < 0.01 ? tmp : rawEarningsBalance.toLocaleString()
  const displayBalance = rawEarningsBalance.toLocaleString()
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {TranslateString(999, 'Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
