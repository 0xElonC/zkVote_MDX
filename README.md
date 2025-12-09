# My First ZKVote 🗳️

一个基于 React + Vite + MDX 构建的零知识证明投票教程项目，帮助你理解传统链上投票的隐私问题，以及如何使用 ZK 技术实现匿名投票。

## ✨ 特性

- 📖 **交互式教程** - 使用 MDX 编写的沉浸式学习体验
- 🔗 **链上投票体验** - 实际连接钱包并参与 Sepolia 测试网投票
- 🎨 **现代化 UI** - 响应式设计，支持明暗主题
- 🔐 **钱包集成** - 支持 MetaMask、WalletConnect 等主流钱包
- ⚡ **浏览器端证明生成** - 使用 snarkjs 在本地自动生成 ZK 证明

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [React 18](https://react.dev/) | 前端框架 |
| [Vite 7](https://vite.dev/) | 构建工具 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [MDX](https://mdxjs.com/) | 交互式文档 |
| [wagmi v3](https://wagmi.sh/) | 以太坊钱包连接 |
| [viem](https://viem.sh/) | 以太坊交互库 |
| [Circom](https://docs.circom.io/) | ZK 电路语言 |
| [snarkjs](https://github.com/iden3/snarkjs) | ZK 证明生成库 |

## 📦 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd zkVote_MDX

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
```

## ⚙️ 环境变量

在 `.env` 文件中配置以下变量：

```env
# ZK 投票合约代理地址 (Sepolia 测试网)
VITE_ZK_VOTE_PROXY=0x你的合约地址

# WalletConnect 项目 ID (可选，用于支持 WalletConnect)
VITE_WC_PROJECT_ID=your_project_id
```

## 🔧 ZK 电路设置 (必需)

**⚠️ 重要:** 运行前端之前，你必须先编译 ZK 电路并生成证明文件。

详细步骤请参考 [CIRCUIT_SETUP.md](./CIRCUIT_SETUP.md)

快速启动：

```bash
# 1. 从 UUPS_SimpleVote 复制编译脚本
cd circuits
bash ../UUPS_SimpleVote/circuits/compile.sh

# 2. 部署生成的文件到前端
mkdir -p public/circuits
cp zkp/vote_js/vote.wasm public/circuits/
cp zkp/vote_final.zkey public/circuits/
cp zkp/verification_key.json public/circuits/
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
zkVote_MDX/
├── circuits/                   # ZK 电路源码
│   └── vote.circom             # 投票电路 (来自 UUPS_SimpleVote)
├── zkp/                        # 编译生成的 ZK 文件 (自动生成)
│   ├── vote.r1cs
│   ├── vote_js/vote.wasm
│   └── vote_final.zkey
├── public/                     # 静态资源
│   └── circuits/               # 前端需要的 ZK 文件
│       ├── vote.wasm
│       ├── vote_final.zkey
│       └── verification_key.json
├── src/
│   ├── abi/                    # 合约 ABI 文件
│   │   └── SimpleVotingV2.json
│   ├── components/             # React 组件
│   │   ├── ZKChainVote.tsx     # ZK 投票组件 (新)
│   │   ├── ZkIdentityPanel.tsx # 匿名身份管理
│   │   ├── ConnectWallet.tsx   # 钱包连接组件
│   │   └── Navbar.tsx          # 导航栏组件
│   ├── zk/                     # ZK 核心逻辑
│   │   ├── zkProofGenerator.ts # 浏览器端证明生成 (新)
│   │   ├── useZkVotingFlow.ts  # 投票流程管理
│   │   ├── useZkIdentity.ts    # 匿名身份管理
│   │   └── simpleVotingClient.ts # 合约交互
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
├── package.json
├── CIRCUIT_SETUP.md            # ZK 电路设置指南 (新)
└── README.md
```

## 🎯 教程内容

本教程分为两个阶段：

### 阶段一：传统链上投票

体验完全公开透明的区块链投票，理解其优点与隐私局限：

- 连接钱包到 Sepolia 测试网
- 参与链上投票
- 在区块浏览器查看投票记录

### 阶段二：ZK 匿名投票 (新)

学习零知识证明如何解决隐私问题：

- 理解新的 ZK 电路结构 (UUPS_SimpleVote)
- 匿名身份管理 (identityCommitment)
- 浏览器本地生成 ZK 证明 (无需后端)
- Nullifier 防重复投票机制
- VoteCommitment 隐藏投票选项
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

### 修改 ZK 电路

1. 编辑 `circuits/vote.circom`
2. 重新编译电路: `bash circuits/compile.sh`
3. 更新 `public/circuits/` 中的文件
4. 根据需要调整 `src/zk/zkProofGenerator.ts`

### 修改合约配置

1. 更新 `src/abi/SimpleVotingV2.json`
2. 修改 `.env` 中的 `VITE_ZK_VOTE_PROXY` 地址
3. 根据需要调整 `src/zk/simpleVotingClient.ts`

## 🆕 更新说明 (v2.0)

### 新电路特性

从旧版本升级到新的 UUPS_SimpleVote 电路：

**旧电路 (v1):**
- 使用 Merkle Tree 验证成员资格
- 需要后端生成 Merkle Proof
- 手动导入 JSON 证明

**新电路 (v2):**
- ✅ 直接使用 `voterAddress` (以太坊地址)
- ✅ `nullifierHash = Poseidon(address, proposalId)` 自动防重投
- ✅ `voteCommitment = Poseidon(nullifierHash, option, secret)` 隐藏选项
- ✅ 浏览器本地自动生成证明 (snarkjs)
- ✅ 无需后端，完全去中心化

### 工作流程对比

**旧流程:**
```
1. 前端: 生成 identityCommitment
2. 后端: 构建 Merkle Tree
3. 后端: 生成 Merkle Proof + ZK Proof
4. 前端: 手动导入 JSON
5. 前端: 提交交易
```

**新流程:**
```
1. 前端: 生成 identityCommitment
2. 前端: 自动计算 nullifierHash
3. 前端: 浏览器本地生成 ZK Proof (2-5 秒)
4. 前端: 自动提交交易
```

## 📄 许可证

MIT License

## 🙏 致谢

- [LXDAO](https://lxdao.io/) - 社区支持
- [Semaphore](https://semaphore.pse.dev/) - ZK 匿名信号协议参考
- [Circom](https://docs.circom.io/) - ZK 电路语言
- [snarkjs](https://github.com/iden3/snarkjs) - ZK 证明生成

---

Built with ❤️ for the Web3 community
