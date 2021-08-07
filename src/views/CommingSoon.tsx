import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@kiwifinancebsc/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledCommingSoon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CommingSoon = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledCommingSoon>
        <LogoIcon width="64px" mb="8px" />
        <Heading size="xxl">Comming Soon</Heading>
        <Text mb="16px">{TranslateString(999, 'We are working on something big. We will be back soon.')}</Text>
        <Button as="a" href="/" size="sm">
          {TranslateString(999, 'Back Home')}
        </Button>
      </StyledCommingSoon>
    </Page>
  )
}

export default CommingSoon
