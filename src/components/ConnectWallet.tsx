// src/components/ConnectWallet.tsx
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from 'wagmi'

export default function ConnectWallet() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  // 格式化地址显示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* 链信息 */}
        {chain && (
          <span style={{
            padding: '6px 10px',
            backgroundColor: 'var(--chain-bg, rgba(34, 197, 94, 0.1))',
            color: 'var(--chain-color, #16a34a)',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 500
          }}>
            {chain.name}
          </span>
        )}


        {/* 地址/ENS */}
        <span style={{
          padding: '8px 12px',
          backgroundColor: 'var(--address-bg, rgba(59, 130, 246, 0.1))',
          color: 'var(--address-color, #3b82f6)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 500
        }}>
          {ensName || formatAddress(address)}
        </span>

        {/* 断开连接按钮 */}
        <button
          onClick={() => disconnect()}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: 'var(--disconnect-color, #ef4444)',
            border: '1px solid var(--disconnect-color, #ef4444)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--disconnect-color, #ef4444)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--disconnect-color, #ef4444)'
          }}
        >
          断开连接
        </button>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      gap: '8px'
    }}>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            //background:"#8643f3ff",
            color: '#fff',
            border:"2px solid #8643f3ff",
            borderRadius: '8px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            opacity: isPending ? 0.7 : 1,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isPending) {
              e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover, #8643f3ff)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'
          }}
        >
          {isPending ? '连接中...' : `连接 ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
