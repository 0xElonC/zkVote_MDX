/**
 * V7 独立树成员检查模块
 *
 * V7 架构: 每个用户有独立的 Merkle Tree (Group)
 * 通过 getUserGroupId() 检查用户是否已加入提案
 */

import { publicClient } from '../wagmiConfig'
import SimpleVotingV7ABI from '../abi/SimpleVotingV7.json'
import { SIMPLE_VOTING_V7_ADDRESS } from './simpleVotingClient'



/**
 * 检查用户是否已加入提案
 * V7: 通过 getUserGroupId() 查询用户专属 groupId
 *
 * @param proposalId - 提案 ID
 * @param userAddress - 用户地址
 * @returns 是否已加入 (groupId > 0)
 */
export async function checkV7Membership(
  proposalId: number,
  userAddress: string
): Promise<boolean> {
  try {
    console.log('[V7成员检查] 开始检查用户加入状态')
    console.log('[V7成员检查] Proposal ID:', proposalId)
    console.log('[V7成员检查] User Address:', userAddress)

    const userGroupId = (await publicClient.readContract({
      address: SIMPLE_VOTING_V7_ADDRESS,
      abi: SimpleVotingV7ABI as any,
      functionName: 'getUserGroupId',
      args: [BigInt(proposalId), userAddress as `0x${string}`],
    })) as bigint

    console.log('[V7成员检查] User Group ID:', userGroupId.toString())

    // V7: userGroupId = 0 表示未加入, >0 表示已加入
    const hasJoined = userGroupId > 0n

    console.log('[V7成员检查] 加入状态:', hasJoined ? '✅ 已加入' : '❌ 未加入')

    return hasJoined
  } catch (error) {
    console.error('[V7成员检查] 检查失败', error)
    return false
  }
}

/**
 * 获取用户专属 Group 的 Merkle Tree 信息
 * V7: 用于生成 ZK 证明时获取树的根和深度
 *
 * @param proposalId - 提案 ID
 * @param userAddress - 用户地址
 * @returns Merkle Tree 信息 (root, depth, size)
 */
export async function getUserMerkleTreeInfo(
  proposalId: number,
  userAddress: string
): Promise<{
  root: bigint
  depth: bigint
  size: bigint
  groupId: bigint
}> {
  try {
    console.log('[V7树信息] 获取用户 Merkle Tree 信息')
    console.log('[V7树信息] Proposal ID:', proposalId)
    console.log('[V7树信息] User Address:', userAddress)

    const [groupId, root, depth, size] = await Promise.all([
      publicClient.readContract({
        address: SIMPLE_VOTING_V7_ADDRESS,
        abi: SimpleVotingV7ABI as any,
        functionName: 'getUserGroupId',
        args: [BigInt(proposalId), userAddress as `0x${string}`],
      }) as Promise<bigint>,
      publicClient.readContract({
        address: SIMPLE_VOTING_V7_ADDRESS,
        abi: SimpleVotingV7ABI as any,
        functionName: 'getUserMerkleTreeRoot',
        args: [BigInt(proposalId), userAddress as `0x${string}`],
      }) as Promise<bigint>,
      publicClient.readContract({
        address: SIMPLE_VOTING_V7_ADDRESS,
        abi: SimpleVotingV7ABI as any,
        functionName: 'getUserMerkleTreeDepth',
        args: [BigInt(proposalId), userAddress as `0x${string}`],
      }) as Promise<bigint>,
      publicClient.readContract({
        address: SIMPLE_VOTING_V7_ADDRESS,
        abi: SimpleVotingV7ABI as any,
        functionName: 'getUserMerkleTreeSize',
        args: [BigInt(proposalId), userAddress as `0x${string}`],
      }) as Promise<bigint>,
    ])

    console.log('[V7树信息] ✅ 成功获取信息')
    console.log('  - Group ID:', groupId.toString())
    console.log('  - Merkle Root:', root.toString())
    console.log('  - Merkle Depth:', depth.toString())
    console.log('  - Tree Size:', size.toString())

    return {
      groupId,
      root,
      depth,
      size,
    }
  } catch (error) {
    console.error('[V7树信息] 获取失败', error)
    throw error
  }
}
