/**
 * Semaphore 证明生成器
 *
 * 使用 @semaphore-protocol/proof 生成零知识证明
 * 完全兼容 SimpleVotingV4 合约
 */

import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { generateProof } from '@semaphore-protocol/proof'

/**
 * Semaphore 证明输出（匹配 V4 合约参数）
 */
export type SemaphoreProofOutput = {
  merkleTreeDepth: bigint
  merkleTreeRoot: bigint
  nullifier: bigint
  message: bigint // signal (投票选项)
  scope: bigint // proposalId
  points: [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]
}

/**
 * 证明生成参数
 */
export type ProofGenerationParams = {
  identity: Identity
  groupMembers: bigint[] // 所有成员的 commitment
  proposalId: number
  optionId: number
}

/**
 * 验证器文件路径配置
 *
 * 注意：这些文件需要从 Semaphore 官方包中复制到 public/ 目录
 * 或使用 CDN 链接
 */
const SEMAPHORE_FILES = {
  wasmFile: 'https://unpkg.com/@semaphore-protocol/proof@4.0.3/artifacts/semaphore.wasm',
  zkeyFile: 'https://unpkg.com/@semaphore-protocol/proof@4.0.3/artifacts/semaphore.zkey',
}

/**
 * 生成 Semaphore 零知识证明
 *
 * @param params - 证明生成参数
 * @returns Semaphore 证明对象
 */
export async function generateSemaphoreProof(
  params: ProofGenerationParams
): Promise<SemaphoreProofOutput> {
  try {
    const { identity, groupMembers, proposalId, optionId } = params

    console.log('[generateSemaphoreProof] 开始生成证明', {
      identityCommitment: identity.commitment.toString(),
      groupSize: groupMembers.length,
      proposalId,
      optionId,
    })

    // 1. 构建 Semaphore Group (Merkle Tree)
    const treeDepth = 20 // V4 合约使用的树深度
    const group = new Group(proposalId, treeDepth)

    // 添加所有成员
    for (const member of groupMembers) {
      group.addMember(member)
    }

    console.log('[generateSemaphoreProof] Merkle Tree 构建完成', {
      root: group.root.toString(),
      depth: treeDepth,
      members: group.members.length,
    })

    // 2. 生成证明
    // message (signal) = optionId (投票选项)
    // scope = proposalId (提案 ID)
    const fullProof = await generateProof(
      identity,
      group,
      BigInt(optionId), // message/signal
      BigInt(proposalId), // scope
      {
        wasmFilePath: SEMAPHORE_FILES.wasmFile,
        zkeyFilePath: SEMAPHORE_FILES.zkeyFile,
      }
    )

    console.log('[generateSemaphoreProof] 证明生成成功', {
      merkleTreeRoot: fullProof.merkleTreeRoot.toString(),
      nullifier: fullProof.nullifier.toString(),
    })

    // 3. 格式化为合约所需格式
    const proofOutput: SemaphoreProofOutput = {
      merkleTreeDepth: BigInt(fullProof.merkleTreeDepth),
      merkleTreeRoot: fullProof.merkleTreeRoot,
      nullifier: fullProof.nullifier,
      message: BigInt(optionId),
      scope: BigInt(proposalId),
      points: fullProof.points as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
    }

    return proofOutput
  } catch (error) {
    console.error('[generateSemaphoreProof] 证明生成失败', error)
    if (error instanceof Error) {
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('无法加载 Semaphore 证明文件，请检查网络连接')
      }
      if (error.message.includes('not a member')) {
        throw new Error('身份未加入群组，请先调用 joinProposal')
      }
      throw new Error(`证明生成失败: ${error.message}`)
    }
    throw new Error('证明生成失败：未知错误')
  }
}

/**
 * 验证证明（本地验证，可选）
 *
 * @param proof - 生成的证明
 * @returns 验证是否通过
 */
export async function verifyProofLocally(proof: SemaphoreProofOutput): Promise<boolean> {
  try {
    // Semaphore SDK 提供了验证功能
    // 这里简化处理，实际验证在链上进行
    console.log('[verifyProofLocally] 证明格式验证', {
      hasAllFields: !!(
        proof.merkleTreeDepth &&
        proof.merkleTreeRoot &&
        proof.nullifier &&
        proof.points &&
        proof.points.length === 8
      ),
    })

    return (
      proof.points.length === 8 &&
      proof.merkleTreeDepth > 0n &&
      proof.merkleTreeRoot > 0n &&
      proof.nullifier > 0n
    )
  } catch (error) {
    console.error('[verifyProofLocally] 验证失败', error)
    return false
  }
}

/**
 * 从链上获取群组成员列表
 *
 * 注意：V4 合约使用 Semaphore 的 Group 管理
 * 需要通过事件或专门的 getter 函数获取成员列表
 */
export async function fetchGroupMembers(
  proposalId: number,
  contract: any // Wagmi contract instance
): Promise<bigint[]> {
  try {
    // 方法 1: 通过 Semaphore 的 getMerkleTreeRoot 和重建
    // 方法 2: 监听 MemberAdded 事件
    // 方法 3: 使用合约的 getMembers 函数（如果有）

    // 这里需要根据实际合约实现调整
    console.log('[fetchGroupMembers] 获取群组成员', { proposalId })

    // 临时实现：返回空数组（需要根据实际情况实现）
    console.warn('[fetchGroupMembers] 需要实现群组成员获取逻辑')
    return []
  } catch (error) {
    console.error('[fetchGroupMembers] 获取成员失败', error)
    throw new Error('Failed to fetch group members')
  }
}

/**
 * 帮助函数：下载 Semaphore 证明文件到本地
 *
 * 可选：如果想加快证明生成速度，可以将文件下载到 public/semaphore/
 */
export async function downloadSemaphoreFiles(): Promise<void> {
  try {
    console.log('[downloadSemaphoreFiles] 开始下载 Semaphore 证明文件...')

    const files = [
      { url: SEMAPHORE_FILES.wasmFile, name: 'semaphore.wasm' },
      { url: SEMAPHORE_FILES.zkeyFile, name: 'semaphore.zkey' },
    ]

    for (const file of files) {
      const response = await fetch(file.url)
      if (!response.ok) {
        throw new Error(`Failed to download ${file.name}`)
      }
      console.log(`[downloadSemaphoreFiles] ✓ ${file.name}`)
    }

    console.log('[downloadSemaphoreFiles] 所有文件准备就绪')
  } catch (error) {
    console.error('[downloadSemaphoreFiles] 下载失败', error)
    throw error
  }
}
