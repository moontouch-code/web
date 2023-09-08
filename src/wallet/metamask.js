import { getChainInfo } from '../wallet/chain';
import { Message } from 'element-ui'

const { ethereum } = window;

export async function changeChain() {
    let judge = true;
    let chainInfo = getChainInfo(process.env.NODE_ENV)
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainInfo.chainId }],
        });
    } catch (switchError) {
        if (switchError.code === 4902 || switchError.code === -32603) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: chainInfo.chainId,
                        chainName: chainInfo.chainName,
                        rpcUrls: chainInfo.rpcUrl,
                        nativeCurrency: {
                            symbol: chainInfo.symbol,
                            decimals: chainInfo.coefficient,
                        },
                        blockExplorerUrls: [chainInfo.blockExplorerUrl],
                    }, ],
                });
            } catch (addError) {
                console.log("addError", addError);
            }
        } else if (switchError.code === 4001) {
            judge = false;
            Message({
                message: 'switch failure.',
                type: 'error'
            })
        }
    }

    return judge;
}