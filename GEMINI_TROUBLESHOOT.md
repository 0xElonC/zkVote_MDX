### Gemini API 故障排查指南

如果您看到 404 错误，可能的原因：

#### 1. API Key 格式检查
- ✅ 您的Key：`AIzaSyB5wyqaue__D0uSooTpkufoysF-ttJhGdc`
- ✅ 格式正确（以 AIzaSy 开头）

#### 2. 可能的解决方案

**方案A：使用V1稳定版（已应用）**
```
https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
```

**方案B：如果V1不行，尝试V1Beta**
需要修改 `AIConfig.ts` 第24行：
```typescript
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
```

**方案C：检查API是否启用**
1. 访问：https://aistudio.google.com/
2. 确认 Gemini API 已启用
3. 查看配额是否用尽

#### 3. 测试API是否可用
在浏览器控制台运行：
```javascript
fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyB5wyqaue__D0uSooTpkufoysF-ttJhGdc', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    contents: [{role: 'user', parts: [{text: '你好'}]}]
  })
}).then(r => r.json()).then(console.log)
```

#### 4. 当前降级策略
✅ 如果AI失败，会自动使用本地逻辑
✅ 游戏仍然可以正常运行

---

**已修复的问题**：
1. ✅ API端点从v1beta改为v1
2. ✅ 对话框定位完全重构（按位置智能显示）
3. ✅ 场景容器扩大到500x500px
4. ✅ 玩家圆圈半径增加到180px
