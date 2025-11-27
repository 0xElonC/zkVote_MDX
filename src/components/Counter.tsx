// src/components/Counter.tsx（确保无语法错误，且默认导出）
import { useState } from 'react';

// 定义props类型（可选，但避免TS报错）
interface CounterProps {
  initialCount: number;
}

// 必须加 default！默认导出组件
export default function Counter({ initialCount }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>计数：{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}