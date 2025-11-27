// src/mdx/MDXComponents.tsx
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Counter from '../components/Counter'
import ChainVote from '../components/ChainVote'

/**
 * 这里定义 MDX 内常见元素的 React 组件映射（更灵活的样式控制）
 */

export const H1: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h1 style={{ 
    fontSize: '2.25rem', 
    fontWeight: 700,
    margin: '2rem 0 1rem', 
    lineHeight: 1.3,
    textAlign: 'left'
  }}>{children}</h1>
)

export const H2: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 style={{ 
    fontSize: '1.6rem', 
    fontWeight: 600,
    margin: '2rem 0 1rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-color, #e0e0e0)',
    textAlign: 'left'
  }}>{children}</h2>
)

export const H3: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h3 style={{ 
    fontSize: '1.3rem', 
    fontWeight: 600,
    margin: '1.5rem 0 0.75rem',
    textAlign: 'left'
  }}>{children}</h3>
)

export const P: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p style={{ 
    fontSize: '1rem', 
    margin: '0.75rem 0', 
    lineHeight: 1.8,
    textAlign: 'justify' // 两端对齐，解决句子长短不一问题
  }}>{children}</p>
)

export const Small: React.FC<React.PropsWithChildren> = ({ children }) => (
  <small style={{ color: 'var(--text-secondary, #666)', display: 'block', marginTop: 8 }}>{children}</small>
)

export const Blockquote: React.FC<React.PropsWithChildren> = ({ children }) => (
  <blockquote style={{
    margin: '1.25rem 0',
    padding: '1rem 1.25rem',
    borderLeft: '4px solid var(--accent-color, #3b82f6)',
    backgroundColor: 'var(--blockquote-bg, rgba(59, 130, 246, 0.08))',
    borderRadius: '0 8px 8px 0',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
  }}>{children}</blockquote>
)

export const Ul: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ul style={{
    margin: '0.75rem 0',
    paddingLeft: '1.5rem',
    lineHeight: 1.8
  }}>{children}</ul>
)

export const Ol: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ol style={{
    margin: '0.75rem 0',
    paddingLeft: '1.5rem',
    lineHeight: 1.8
  }}>{children}</ol>
)

export const Li: React.FC<React.PropsWithChildren> = ({ children }) => (
  <li style={{
    margin: '0.4rem 0',
    textAlign: 'justify'
  }}>{children}</li>
)

export const Hr: React.FC = () => (
  <hr style={{
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: 'var(--border-color, #e0e0e0)'
  }} />
)

export const Code: React.FC<React.PropsWithChildren> = ({ children }) => (
  <code style={{
    backgroundColor: 'var(--code-bg, rgba(0,0,0,0.06))',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontFamily: 'Consolas, Monaco, monospace',
    display: 'inline',
  }}>{children}</code>
)

export const Pre: React.FC<React.PropsWithChildren> = ({ children }) => (
  <pre style={{
    backgroundColor: 'var(--pre-bg, #1e293b)',
    color: 'var(--pre-color, #e2e8f0)',
    padding: '1rem',
    borderRadius: '8px',
    overflow: 'auto',
    margin: '1rem 0',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
  }}>{children}</pre>
)

export const Card: React.FC<React.PropsWithChildren & {accent?: boolean}> = ({ children, accent }) => (
  <div style={{
    width: '100%',
    padding: '1.25rem',
    boxSizing: 'border-box',
    backgroundColor: accent ? 'var(--card-accent-bg, rgba(251, 191, 36, 0.1))' : 'var(--card-bg, transparent)',
    border: '1px solid var(--border-color, #e0e0e0)',
    borderRadius: '8px',
    margin: '1rem 0'
  }}>
    {children}
  </div>
)

// 导出映射对象
export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  small: Small,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: Hr,
  code: Code,
  pre: Pre,
  Card,
  Counter,
  ChainVote,
}

/**
 * MDXWrapper：提供统一的页面容器样式，跟随系统主题
 */
export const MDXWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MDXProvider components={mdxComponents}>
    <article style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      boxSizing: 'border-box',
      // 不设置背景色，跟随系统/父容器
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: 1.6
    }}>
      {children}
    </article>
  </MDXProvider>
)