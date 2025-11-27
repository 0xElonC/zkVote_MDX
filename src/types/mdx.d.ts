declare module '*.mdx' {
    import type { MDXProps } from '@mdx-js/react';
    // MDX 文件默认导出 React 组件，支持传递 MDXProps（含 components、props 等）
    export default function MDXContent(props: MDXProps): JSX.Element;
    // 若 MDX 文件中有命名导出（如变量、组件），可在此扩展类型
    // 示例：export const title: string;
    // 示例：export function CustomComponent(): JSX.Element;
}