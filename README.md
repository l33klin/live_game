# 康威生命游戏

这是一个使用 React 和 TypeScript 实现的康威生命游戏（Conway's Game of Life）。项目采用现代化的前端技术栈，提供了一个交互式的、可视化的生命游戏模拟器。

## 功能特点

- **交互式网格**：通过鼠标点击或拖动来创建/消除细胞
- **环形边界**：网格边界是连续的，当细胞到达边界时会从对边出现
- **实时状态显示**：显示当前迭代次数
- **稳定状态检测**：自动检测并提示当游戏达到稳定状态
- **多种控制选项**：
  - 开始/暂停：控制游戏的运行状态
  - 重置：清空网格
  - 随机：随机生成初始状态
  - 高斯帕机枪：自动生成一个会持续产生滑翔机的图案

## 技术实现

- **前端框架**：React 18
- **开发语言**：TypeScript
- **构建工具**：Vite
- **UI组件**：Ant Design
- **状态管理**：React Hooks (useState, useEffect, useCallback)

### 核心算法

游戏的核心逻辑基于以下规则：
1. 活细胞周围有2-3个活细胞时继续存活
2. 死细胞周围正好有3个活细胞时转为活细胞
3. 其他情况下细胞死亡或保持死亡状态

## 本地运行

### 环境要求

- Node.js (推荐 v16 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆项目到本地：
   ```bash
   git clone https://github.com/l33klin/live_game.git
   cd live_game
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中访问：
   ```
   http://localhost:5173
   ```

### 构建部署

如果需要构建生产版本：

```bash
npm run build
```

构建后的文件将生成在 `dist` 目录中。

## 使用说明

1. 点击网格中的任意位置可以切换细胞的生存状态
2. 按住鼠标并拖动可以快速绘制多个细胞
3. 点击「开始」按钮启动游戏演化
4. 使用「暂停」按钮可以随时暂停游戏
5. 「重置」按钮可以清空网格重新开始
6. 「随机」按钮可以生成随机的初始状态
7. 「高斯帕机枪」按钮可以生成一个经典的会持续产生滑翔机的图案

---

# Conway's Game of Life

This is an implementation of Conway's Game of Life using React and TypeScript. The project utilizes a modern frontend tech stack to provide an interactive, visual simulation of the Game of Life.

## Features

- **Interactive Grid**: Create/remove cells through mouse clicks or drag
- **Toroidal Boundary**: Grid boundaries are continuous; cells wrap around from one edge to the opposite
- **Real-time Status**: Displays current iteration count
- **Stability Detection**: Automatically detects and notifies when the game reaches a stable state
- **Multiple Controls**:
  - Start/Pause: Control the game's running state
  - Reset: Clear the grid
  - Random: Generate random initial state
  - Gosper Glider Gun: Automatically generate a pattern that continuously produces gliders

## Technical Implementation

- **Frontend Framework**: React 18
- **Development Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: Ant Design
- **State Management**: React Hooks (useState, useEffect, useCallback)

### Core Algorithm

The core logic of the game is based on the following rules:
1. A live cell survives if it has 2-3 live neighbors
2. A dead cell becomes alive if it has exactly 3 live neighbors
3. In all other cases, cells die or remain dead

## Local Development

### Requirements

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/l33klin/live_game.git
   cd live_game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit in your browser:
   ```
   http://localhost:5173
   ```

### Build and Deploy

To build for production:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

## Usage Guide

1. Click any position in the grid to toggle cell state
2. Click and drag to quickly draw multiple cells
3. Click the "Start" button to begin the game evolution
4. Use the "Pause" button to pause the game at any time
5. The "Reset" button clears the grid to start over
6. The "Random" button generates a random initial state
7. The "Gosper Glider Gun" button creates a classic pattern that continuously produces gliders
