// AI配置文件 - 用于接入AI API
export interface AIConfig {
  provider: 'openrouter' | 'gemini' | 'groq' | 'local';
  apiKey?: string;
  model?: string;
}

// 默认使用本地简单AI（当前实现）
const DEFAULT_CONFIG: AIConfig = {
  provider: 'local'
};

let currentConfig: AIConfig = DEFAULT_CONFIG;

export const setAIConfig = (config: Partial<AIConfig>) => {
  currentConfig = { ...currentConfig, ...config };
};

export const getAIConfig = (): AIConfig => currentConfig;

// OpenRouter API调用函数
export const callOpenRouterAPI = async (prompt: string, apiKey: string): Promise<string> => {
  try {
    // 使用OpenRouter的免费模型：nex-agi/deepseek-v3.1-nex-n1:free (支持中文的免费模型)
    const model = 'nex-agi/deepseek-v3.1-nex-n1:free';
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ZK Pixel Werewolf'
        },
        body: JSON.stringify({
          model: model,
          messages: [{
            role: 'user',
            content: prompt
          }],
          max_tokens: 300, // 增加到300以获得完整输出
          temperature: 0.9
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenRouter API Error Details:', JSON.stringify(errorData, null, 2));
      throw new Error(`OpenRouter API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    // 优先使用content，如果为空则使用reasoning（某些模型会把回复放在reasoning里）
    let resultText = data.choices?.[0]?.message?.content;
    
    if (!resultText || resultText.trim() === '') {
      resultText = data.choices?.[0]?.message?.reasoning;
    }
    
    if (!resultText || resultText.trim() === '') {
      console.error('OpenRouter Response Structure:', JSON.stringify(data, null, 2));
      throw new Error('OpenRouter返回内容为空');
    }
    
    return resultText.trim();
  } catch (error) {
    console.error('OpenRouter API调用失败:', error);
    throw error;
  }
};

// 构建狼人杀AI Prompt
export const buildWerewolfPrompt = (context: {
  role: string;
  day: number;
  players: string[];
  deadPlayers: string[];
  dialogueHistory: string[];
  myKnowledge: string;
  botName?: string;
}) => {
  return `你现在正在玩狼人杀游戏，你的名字是${context.botName || '玩家'}。

【游戏状态】
第${context.day}天
存活玩家：${context.players.join('、')}
已死亡：${context.deadPlayers.length > 0 ? context.deadPlayers.join('、') : '无'}

【你的身份】
${context.role}
${context.myKnowledge}

【完整讨论记录】
${context.dialogueHistory.length > 0 ? context.dialogueHistory.join('\n') : '暂无对话，你是第一个发言的人'}

【重要要求】
1. 你必须完全进入${context.role}的角色，以第一人称发言
2. 仔细阅读上面的讨论记录，分析其他玩家的发言
3. 你的发言应该回应、质疑或支持其他玩家的观点，而不是孤立的独白
4. 如果有人质疑你，你需要为自己辩护
5. 如果有人可疑，你可以指出他们发言中的矛盾或问题
6. 根据前面的讨论推进话题，展现逻辑推理能力
7. 不要说"我是AI"、"我需要思考"等AI助手的话
8. 直接输出你要说的话，不要有任何前缀或解释

现在轮到你发言了，请根据上面的讨论内容做出回应：`;
};
