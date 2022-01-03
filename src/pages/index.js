import * as React from "react"
import { Input, Box, Button, Text, Container, Heading } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ethers } from 'ethers'
const axios = require('axios');

// styles
const spacedOut = {
  marginTop: 40,
  marginBottom: 0,
  // maxWidth: 320,
}


// markup
const IndexPage = () => {
  const [txnHash, setTxnHash] = React.useState('')
  const [inputData, setInputData] = React.useState('')
  const [gasUsed, setGasUsed] = React.useState(0)
  const handleChange = (event) => setTxnHash(event.target.value)

  // var ethersProvider = new ethers.providers.JsonRpcProvider(
  //   "https://eth-mainnet.alchemyapi.io/v2/jBcoVxzCEegqe9Xu4MfYnuaWeS-dcop0"
  // );

  async function getTransaction() {

    const byReceipt = {
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      params: [txnHash],
      id: 0
    }
    const byHash = {
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [txnHash],
      id: 0
    }

    const vmTrace = {
      jsonrpc: "2.0",
      method: "trace_replayTransaction",
      params: [txnHash, ["stateDiff", "vmTrace"]],
      id: 0
    }

    let resp = await axios.post('https://eth-mainnet.alchemyapi.io/v2/jBcoVxzCEegqe9Xu4MfYnuaWeS-dcop0', byReceipt);
    setGasUsed(ethers.BigNumber.from(resp.data.result.gasUsed).toString())

    resp = await axios.post('https://eth-mainnet.alchemyapi.io/v2/jBcoVxzCEegqe9Xu4MfYnuaWeS-dcop0', byHash);
    setInputData(resp.data.result.input)

    // resp = await axios.post('https://eth-mainnet.alchemyapi.io/v2/jBcoVxzCEegqe9Xu4MfYnuaWeS-dcop0', vmTrace);
    
    // console.log(gasUsed);
    // console.log(inputData);
    // console.log(resp);
  }

  return (
    <ChakraProvider>
      <main>
        <title>Home Page</title>
        <Container maxW='container.xl'>
          {/* <Heading style={headingStyles} as='h1'>Gas Breakdown</Heading> */}
          <Box as="section">
            <Box
              maxW="2xl"
              mx="auto"
              px={{ base: '6', lg: '8' }}
              py={{ base: '16', sm: '20' }}
              textAlign="center"
            >
              <Heading size="3xl" fontWeight="extrabold" letterSpacing="tight">
                Are you ready?
              </Heading>
              <Text mt="4" fontSize="lg">
                Enter your transaction below to get detailed breakdown of its gas consumption
              </Text>
              <Input
                mt="8"
                placeholder='Txn Hash'
                txnHash={txnHash}
                onChange={handleChange}
              />
              <Button
                mt="2"
                as="a"
                href="#"
                size="lg"
                colorScheme="blue"
                fontWeight="bold"
                onClick={() => getTransaction(txnHash)}
              >

                Search
              </Button>
              <Heading size="h2" fontWeight="extrabold" letterSpacing="tight">
                Gas Used: {gasUsed}
              </Heading>
              <Heading size="h2" fontWeight="extrabold" letterSpacing="tight">
                Input Data: {inputData}
              </Heading>
            </Box>
          </Box>
        </Container>
      </main>
    </ChakraProvider>

  )
}

export default IndexPage
