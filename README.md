# My First ZKVote 🗳️

一个基于 React + Vite + MDX 构建的零知识证明投票教程项目，帮助你理解传统链上投票的隐私问题，以及如何使用 ZK 技术实现匿名投票。

## ✨ 特性

- 📖 **交互式教程** - 使用 MDX 编写的沉浸式学习体验
- 🔗 **链上投票体验** - 实际连接钱包并参与 Sepolia 测试网投票
- 🎨 **现代化 UI** - 响应式设计，支持明暗主题
- 🔐 **钱包集成** - 支持 MetaMask、WalletConnect 等主流钱包

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [React 18](https://react.dev/) | 前端框架 |
| [Vite 7](https://vite.dev/) | 构建工具 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [MDX](https://mdxjs.com/) | 交互式文档 |
| [wagmi v3](https://wagmi.sh/) | 以太坊钱包连接 |
| [viem](https://viem.sh/) | 以太坊交互库 |

## 📦 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd zk_vote

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
```

## ⚙️ 环境变量

在 `.env` 文件中配置以下变量：

```env
# 投票合约代理地址 (Sepolia 测试网)
VITE_PROXY=0x27f95808519b96838D73155Fe83a30F6a8B2Ea66

# WalletConnect 项目 ID (可选，用于支持 WalletConnect)
VITE_WC_PROJECT_ID=your_project_id
```

## 🚀 运行

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
zk_vote/
├── src/
│   ├── abi/                    # 合约 ABI 文件
│   │   └── SimpleVoteABI.json
│   ├── components/             # React 组件
│   │   ├── ChainVote.tsx       # 链上投票组件
│   │   ├── ConnectWallet.tsx   # 钱包连接组件
│   │   ├── Counter.tsx         # 计数器示例组件
│   │   └── Navbar.tsx          # 导航栏组件
│   ├── content/                # MDX 内容
│   │   └── MyFirstZKVote.mdx   # 主教程文档
│   ├── mdx/                    # MDX 配置
│   │   └── MDXComponents.tsx   # 自定义 MDX 组件
│   ├── page/                   # 页面组件
│   │   └── ZKVotePage.tsx
│   ├── types/                  # TypeScript 类型定义
│   │   └── mdx.d.ts
│   ├── App.tsx                 # 应用入口
│   ├── main.tsx                # React 挂载点
│   └── wagmiConfig.ts          # wagmi 配置
├── .env                        # 环境变量
├── vite.config.ts              # Vite 配置
└── package.json
```

## 🎯 教程内容

本教程分为两个阶段：

### 阶段一：传统链上投票

体验完全公开透明的区块链投票，理解其优点与隐私局限：

- 连接钱包到 Sepolia 测试网
- 参与链上投票
- 在区块浏览器查看投票记录

### 阶段二：ZK 匿名投票

学习零知识证明如何解决隐私问题：

- 理解 zk-SNARK 基础概念
- 身份承诺与 Merkle 树
- Nullifier 防重复投票机制
- 本地生成 ZK 证明
- 链上验证与计票

## 🔧 开发指南

### 添加新的 MDX 组件

1. 在 `src/components/` 创建组件
2. 在 `src/mdx/MDXComponents.tsx` 中注册组件
3. 在 MDX 文件中直接使用 `<YourComponent />`

```tsx
// MDXComponents.tsx
import YourComponent from '../components/YourComponent'

export const mdxComponents = {
  // ...existing components
  YourComponent,
}
```

### 修改合约配置

1. 更新 `src/abi/SimpleVoteABI.json`
2. 修改 `.env` 中的 `VITE_PROXY` 地址
3. 根据需要调整 `src/components/ChainVote.tsx`

## 📄 许可证

MIT License

## 🙏 致谢

- [LXDAO](https://lxdao.io/) - 社区支持
- [Semaphore](https://semaphore.pse.dev/) - ZK 匿名信号协议参考

---

Built with ❤️ for the Web3 community
