import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@kiwifinancebsc/uikit'
import BigNumber from 'bignumber.js'
import { QueryParamProvider } from 'use-query-params';
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import Pools from './views/Pools'
import CommingSoon from './views/CommingSoon'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const CloudFarms = lazy(() => import('./views/CloudFarms'))
const NotFound = lazy(() => import('./views/NotFound'))
const Referral = lazy(() => import('./views/Referral'))
const CoomingSoon = lazy(() => import('./views/CommingSoon'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ResetCSS />
        <GlobalStyle />
        <Menu>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              <Route path="/pools">
                <Pools />
              </Route>
              <Route path="/cloudfarms">
                <CloudFarms />
              </Route>
              <Route path="/cloudpools">
                <CommingSoon />
              </Route>
              <Route path="/referral">
                <Referral />
              </Route>
              {/* Redirect */}
              <Route path="/staking">
                <Redirect to="/pools" />
              </Route>
              <Route path="/salsa">
                <Redirect to="/pools" />
              </Route>
              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Menu>
      </QueryParamProvider>
    </Router>
  )
}

export default React.memo(App)
