/**
 * 群组成员获取模块
 *
 * 从链上事件获取 Semaphore 群组成员列表，用于构建 Merkle Tree
 */

import { parseAbiItem } from 'viem'
import { publicClient } from '../wagmiConfig'
import { SIMPLE_VOTING_V4_ADDRESS } from './simpleVotingClient'

// 合约部署区块号（或提案创建区块号）
// 从此区块开始查询事件，避免 RPC "eth_getLogs is limited to a 10,000 range" 错误
// 如果不知道确切区块号，使用最近的一个合理起点
const DEPLOYMENT_BLOCK = 9750000n // 约在合约部署前后，可根据实际情况调整

/**
 * MemberJoined 事件定义
 * event MemberJoined(uint256 indexed proposalId, uint256 indexed groupId, uint256 identityCommitment)
 */
const MEMBER_JOINED_EVENT = parseAbiItem(
  'event MemberJoined(uint256 indexed proposalId, uint256 indexed groupId, uint256 identityCommitment)'
)

/**
 * 从链上事件获取指定提案的所有群组成员
 *
 * @param proposalId - 提案 ID
 * @returns 成员的 identityCommitment 数组（按加入顺序）
 */
export async function fetchGroupMembers(proposalId: number): Promise<bigint[]> {
  try {
    console.log('[fetchGroupMembers] 开始获取群组成员', { proposalId })

    // 获取当前区块号
    const latestBlock = await publicClient.getBlockNumber()
    const blockRange = latestBlock - DEPLOYMENT_BLOCK

    console.log('[fetchGroupMembers] 区块范围', {
      from: DEPLOYMENT_BLOCK.toString(),
      to: latestBlock.toString(),
      range: blockRange.toString(),
    })

    // 如果区块范围超过 10000，需要分批查询
    const MAX_RANGE = 9999n
    const allLogs: any[] = []

    if (blockRange > MAX_RANGE) {
      console.log('[fetchGroupMembers] 区块范围过大，开始分批查询...')

      let currentFrom = DEPLOYMENT_BLOCK
      while (currentFrom <= latestBlock) {
        const currentTo = currentFrom + MAX_RANGE > latestBlock ? latestBlock : currentFrom + MAX_RANGE

        console.log(`[fetchGroupMembers] 查询区块 ${currentFrom} 到 ${currentTo}`)

        try {
          const logs = await publicClient.getLogs({
            address: SIMPLE_VOTING_V4_ADDRESS,
            event: MEMBER_JOINED_EVENT,
            args: {
              proposalId: BigInt(proposalId),
            },
            fromBlock: currentFrom,
            toBlock: currentTo,
          })

          allLogs.push(...logs)
          console.log(`[fetchGroupMembers] 本批次获取 ${logs.length} 个事件`)
        } catch (error) {
          console.error(`[fetchGroupMembers] 区块 ${currentFrom}-${currentTo} 查询失败`, error)
          // 继续查询下一批次
        }

        currentFrom = currentTo + 1n
      }

      console.log(`[fetchGroupMembers] 分批查询完成，总计 ${allLogs.length} 个事件`)
    } else {
      // 区块范围在限制内，一次性查询
      const logs = await publicClient.getLogs({
        address: SIMPLE_VOTING_V4_ADDRESS,
        event: MEMBER_JOINED_EVENT,
        args: {
          proposalId: BigInt(proposalId),
        },
        fromBlock: DEPLOYMENT_BLOCK,
        toBlock: 'latest',
      })

      allLogs.push(...logs)
    }

    console.log('[fetchGroupMembers] 获取到事件日志', { count: allLogs.length })

    // 提取 identityCommitment 并按区块号/日志索引排序（保证顺序一致）
    const members = allLogs
      .sort((a, b) => {
        // 首先按区块号排序
        const blockDiff = Number(a.blockNumber) - Number(b.blockNumber)
        if (blockDiff !== 0) return blockDiff

        // 同一区块内按日志索引排序
        return (a.logIndex ?? 0) - (b.logIndex ?? 0)
      })
      .map((log) => {
        if (!log.args.identityCommitment) {
          throw new Error('Missing identityCommitment in event log')
        }
        return log.args.identityCommitment
      })

    console.log('[fetchGroupMembers] 成员列表', {
      count: members.length,
      members: members.map(m => m.toString()),
    })

    return members
  } catch (error) {
    console.error('[fetchGroupMembers] 获取失败', error)
    throw new Error(`Failed to fetch group members: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * 检查指定身份是否已经加入群组
 *
 * @param proposalId - 提案 ID
 * @param identityCommitment - 身份承诺值
 * @returns 是否已加入
 */
export async function checkMembership(
  proposalId: number,
  identityCommitment: bigint
): Promise<boolean> {
  try {
    const members = await fetchGroupMembers(proposalId)
    return members.some((member) => member === identityCommitment)
  } catch (error) {
    console.error('[checkMembership] 检查失败', error)
    return false
  }
}

/**
 * 获取群组成员数量（不获取完整列表，性能更好）
 *
 * @param proposalId - 提案 ID
 * @returns 成员数量
 */
export async function getGroupMemberCount(proposalId: number): Promise<number> {
  try {
    const latestBlock = await publicClient.getBlockNumber()
    const blockRange = latestBlock - DEPLOYMENT_BLOCK
    const MAX_RANGE = 9999n

    if (blockRange > MAX_RANGE) {
      // 分批查询计数
      let totalCount = 0
      let currentFrom = DEPLOYMENT_BLOCK

      while (currentFrom <= latestBlock) {
        const currentTo = currentFrom + MAX_RANGE > latestBlock ? latestBlock : currentFrom + MAX_RANGE

        try {
          const logs = await publicClient.getLogs({
            address: SIMPLE_VOTING_V4_ADDRESS,
            event: MEMBER_JOINED_EVENT,
            args: {
              proposalId: BigInt(proposalId),
            },
            fromBlock: currentFrom,
            toBlock: currentTo,
          })

          totalCount += logs.length
        } catch (error) {
          console.error('[getGroupMemberCount] 区块查询失败', error)
        }

        currentFrom = currentTo + 1n
      }

      return totalCount
    } else {
      // 一次性查询
      const logs = await publicClient.getLogs({
        address: SIMPLE_VOTING_V4_ADDRESS,
        event: MEMBER_JOINED_EVENT,
        args: {
          proposalId: BigInt(proposalId),
        },
        fromBlock: DEPLOYMENT_BLOCK,
        toBlock: 'latest',
      })

      return logs.length
    }
  } catch (error) {
    console.error('[getGroupMemberCount] 获取失败', error)
    return 0
  }
}
