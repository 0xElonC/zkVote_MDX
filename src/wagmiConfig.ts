import { createConfig, http } from "wagmi";
import { mainnet, polygon, sepolia, bscTestnet, polygonAmoy } from 'wagmi/chains';
import { injected,walletConnect } from "wagmi/connectors";
import { createPublicClient } from 'viem';

const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID;

export const wagmiConfig = createConfig({
    chains: [mainnet, polygon, sepolia, bscTestnet, polygonAmoy],
    connectors: [
        injected(),
        walletConnect({
            projectId:WC_PROJECT_ID,
            metadata: {
                name : 'MyFirstZKVote',
                description:"MyFirstZKVote",
                url:"http://localhost:3000",
                icons: ['https://myapp.com/icon.png'],
            },
            showQrModal:true,
        }),
    ],
    transports:{
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [sepolia.id]: http(),
        [bscTestnet.id]: http(),
        [polygonAmoy.id]: http(),
    },
    ssr:false,
})

// 创建 public client 用于读取链上数据
export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
})