const arbitrum = {
    development: {
        tokenName: 'AGOR',
        symbol: 'AGOR',
        ETHNETWORK: 421613,
        rpcUrl: ['https://goerli-rollup.arbitrum.io/rpc/'],
        blockExplorerUrl: 'https://goerli-rollup-explorer.arbitrum.io',
        netName: 'Arbitrum Goerli',
        chainId: '0x66eed',
        chainName: 'Arbitrum Goerli',
        coefficient: 18,
        gasPrice: '10',
        env: "179"
    },
    production: {
        tokenName: 'ETH',
        symbol: 'ETH',
        ETHNETWORK: 42161,
        rpcUrl: ["https://arb1.arbitrum.io/rpc"],
        blockExplorerUrl: 'https://arbiscan.io/',
        netName: 'Arbitrum One Mainnet',
        chainId: '0xa4b1',
        chainName: 'Arbitrum One',
        coefficient: 18,
        gasPrice: '10',
    }
}

export function getChainInfo(env) {
    return arbitrum[env]
}