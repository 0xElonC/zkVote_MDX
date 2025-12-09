import { readContract, writeContract } from 'wagmi/actions'
import SimpleVotingV4ABI from '../abi/SimpleVotingV4.json'
import { wagmiConfig } from '../wagmiConfig'
import type { SemaphoreProofOutput } from './semaphoreProofGenerator'

const zkVoteAddress = import.meta.env.VITE_ZK_VOTE_PROXY as `0x${string}`

export const SIMPLE_VOTING_V4_ADDRESS = zkVoteAddress

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
  // V4: 使用 getProposalInfo 一次性获取所有信息
  const result = await readContract(wagmiConfig, {
    abi: SimpleVotingV4ABI,
    address: SIMPLE_VOTING_V4_ADDRESS,
    functionName: 'getProposalInfo',
    args: [BigInt(proposalId)],
  }) as [bigint, string, bigint, bigint, bigint, boolean]

  const [id, title, groupId, optionCount, createdAt, isActive] = result

  return {
    id: Number(id),
    title: title,
    isActive: isActive,
    createdAt: Number(createdAt),
    groupId: groupId,
    optionCount: Number(optionCount),
  }
}

export async function fetchOptions(proposalId: number): Promise<SimpleVotingOption[]> {
  const options = (await readContract(wagmiConfig, {
    abi: SimpleVotingV4ABI,
    address: SIMPLE_VOTING_V4_ADDRESS,
    functionName: 'getOptions',
    args: [BigInt(proposalId)],
  })) as SimpleVotingOption[]

  return (options as SimpleVotingOption[]) ?? []
}

export async function joinProposal(proposalId: number, identityCommitment: bigint) {
  return writeContract(wagmiConfig, {
    abi: SimpleVotingV4ABI,
    address: SIMPLE_VOTING_V4_ADDRESS,
    functionName: 'joinProposal',
    args: [BigInt(proposalId), identityCommitment],
  })
}

export async function submitZkVote(
  proposalId: number,
  optionId: number,
  proof: SemaphoreProofOutput
) {
  return writeContract(wagmiConfig, {
    abi: SimpleVotingV4ABI,
    address: SIMPLE_VOTING_V4_ADDRESS,
    functionName: 'vote',
    args: [
      BigInt(proposalId),
      BigInt(optionId),
      proof.merkleTreeDepth,
      proof.merkleTreeRoot,
      proof.nullifier,
      proof.points,
    ],
  })
}
