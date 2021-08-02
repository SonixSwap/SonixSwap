import React, { useState } from 'react'
// import { useWeb3React } from '@web3-react/core'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Button, ToastContainer, CardBody, CardFooter, Link } from '@kiwifinancebsc/uikit'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import rot13 from '../../../utils/encode'

const ReferralLink = () => {
    // const { account } = useWeb3React()
    const { account } : { account : string } = useWallet()
    const [toasts, setToasts] = useState([]);

    const handleClick = (description = "") => {
        const now = Date.now();
        const randomToast = {
        id: `id-${now}`,
        title: `Copied`,
        description,
        type: "success",
        };

        setToasts((prevToasts) => [randomToast, ...prevToasts]);
    };

    const handleRemove = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
    };

    
    const StyledLink = styled(Link)`
        cursor: pointer;
    `

    const StyledFooter = styled(CardFooter)`
        min-height: 100px;
    `

    const Container = styled.div`
        display: flex;
        justify-content: space-between;
    `

    return (
        <div>
            {/* <Heading size="md">Your Referral Link</Heading>
            <StyleInput type="text" scale="md" value={`https://app.lambofinance.farm/?ref=${rot13(account)}`} readOnly />
            <CopyToClipboard text={`https://app.lambofinance.farm/?ref=${rot13(account)}`} onCopy={()=> {handleClick()}}>
                <Button variant="primary" mt="8px">Copy</Button>
            </CopyToClipboard>
             */}

                <CardBody>
                    <Container>
                         <Heading size="md">Your Referral Link</Heading>
                         <CopyToClipboard text={`https://sonixswap.io/?ref=${rot13(account)}`} onCopy={()=> {handleClick()}}>
                            <Button variant="primary" mt="8px">Copy</Button>
                        </CopyToClipboard>
                    </Container>
                </CardBody>
                <StyledFooter>
                    <StyledLink>{`https://sonixswap.io/?ref=${rot13(account)}`}</StyledLink>
                </StyledFooter>
            <ToastContainer toasts={toasts} onRemove={handleRemove} />
        </div>
    )

}

export default ReferralLink

