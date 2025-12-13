import { readContract, writeContract } from 'wagmi/actions'
import SimpleVotingV7ABI from '../abi/SimpleVotingV7.json'
import { wagmiConfig } from '../wagmiConfig'
import type { SemaphoreProofOutput } from './semaphoreProofGenerator'

const zkVoteAddress = import.meta.env.VITE_ZK_VOTE_PROXY as `0x${string}`

export const SIMPLE_VOTING_V7_ADDRESS = zkVoteAddress

export type SimpleVotingOption = {
  id: bigint
  name: string
  voteCount: bigint
}

export type ProposalInfo = {
  id: number
  title: string
  isActive: boolean
  createdAt?: number
  groupId?: bigint
  optionCount?: number
}

export async function fetchProposal(proposalId: number): Promise<ProposalInfo> {
  // V7: 使用 getProposalInfo 一次性获取所有信息
  const result = await readContract(wagmiConfig, {
    abi: SimpleVotingV7ABI,
    address: SIMPLE_VOTING_V7_ADDRESS,
    functionName: 'getProposalInfo',
    args: [BigInt(proposalId)],
  }) as [bigint, string, bigint, bigint, boolean]

  const [id, title, optionCount, createdAt, isActive] = result

  return {
    id: Number(id),
    title: title,
    isActive: isActive,
    createdAt: Number(createdAt),
    optionCount: Number(optionCount),
  }
}

export async function fetchOptions(proposalId: number): Promise<SimpleVotingOption[]> {
  // V7: 使用 getOptionNames (只返回名称,不含票数)
  const optionNames = (await readContract(wagmiConfig, {
    abi: SimpleVotingV7ABI,
    address: SIMPLE_VOTING_V7_ADDRESS,
    functionName: 'getOptionNames',
    args: [BigInt(proposalId)],
  })) as string[]

  // V7: 将字符串数组转换为 SimpleVotingOption 格式 (voteCount 固定为 0)
  return optionNames.map((name, index) => ({
    id: BigInt(index),
    name,
    voteCount: 0n, // V7 不显示票数
  }))
}

export async function joinProposal(proposalId: number, identityCommitment: bigint) {
  return writeContract(wagmiConfig, {
    abi: SimpleVotingV7ABI,
    address: SIMPLE_VOTING_V7_ADDRESS,
    functionName: 'joinProposal',
    args: [BigInt(proposalId), identityCommitment],
    gas: 500000n, // 明确设置 gas limit，Merkle Tree 操作需要较多 gas
  })
}

export async function submitZkVote(
  proposalId: number,
  proof: SemaphoreProofOutput
) {
  // V7: 确保所有字段都是正确的 bigint 类型
  const semaphoreProof = {
    merkleTreeDepth: typeof proof.merkleTreeDepth === 'bigint'
      ? proof.merkleTreeDepth
      : BigInt(proof.merkleTreeDepth),
    merkleTreeRoot: proof.merkleTreeRoot,
    nullifier: proof.nullifier,
    message: proof.message,
    scope: proof.scope,
    points: proof.points  // 必须是完整的 [bigint, bigint, ...] 数组
  }

  // V7: vote 函数只需要 proposalId 和 proof,不需要 optionId
  return writeContract(wagmiConfig, {
    abi: SimpleVotingV7ABI,
    address: SIMPLE_VOTING_V7_ADDRESS,
    functionName: 'vote',
    args: [
      BigInt(proposalId),
      semaphoreProof
    ],
    gas: 800000n, // ZK 证明验证需要较多 gas
  })
}
