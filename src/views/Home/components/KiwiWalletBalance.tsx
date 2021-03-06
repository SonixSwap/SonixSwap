import React from 'react'
import { Text } from '@kiwifinancebsc/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getKiwiAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const KiwiWalletBalance = () => {
  const TranslateString = useI18n()
  const kiwiBalance = useTokenBalance(getKiwiAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(kiwiBalance, 8)} fontSize="24px" />
}

export default KiwiWalletBalance
