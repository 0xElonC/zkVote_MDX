import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmiConfig';
import ZKVotePage from './page/ZKVotePage'
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div style={{
          minHeight: '100vh'
          // 不设置背景色，跟随系统主题
        }}>
          <ZKVotePage />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
