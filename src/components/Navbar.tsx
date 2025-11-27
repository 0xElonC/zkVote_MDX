// src/components/Navbar.tsx
import ConnectWallet from './ConnectWallet'

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      padding: '12px 24px',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-color, #e5e7eb)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo / 标题 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            My First ZKVote
          </h1>
        </div>
        {/* 连接钱包按钮 */}
        <ConnectWallet />
      </div>
    </nav>
  )
}
