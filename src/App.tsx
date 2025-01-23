import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { message } from 'antd'

const GRID_SIZE = 100
const CELL_SIZE = 8

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = Array(GRID_SIZE).fill(null)
    return rows.map(() => Array(GRID_SIZE).fill(false))
  })

  const [isRunning, setIsRunning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [prevGrid, setPrevGrid] = useState<boolean[][]>()
  const [iterationCount, setIterationCount] = useState(0)

  const toggleCell = (i: number, j: number) => {
    const newGrid = grid.map(row => [...row])
    newGrid[i][j] = !newGrid[i][j]
    setGrid(newGrid)
  }

  const countNeighbors = (grid: boolean[][], i: number, j: number): number => {
    let count = 0
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue
        let ni = i + di
        let nj = j + dj
        // 实现环形边界，当超出边界时从对边进入
        ni = (ni + GRID_SIZE) % GRID_SIZE
        nj = (nj + GRID_SIZE) % GRID_SIZE
        count += grid[ni][nj] ? 1 : 0
      }
    }
    return count
  }

  const nextGeneration = useCallback(() => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => [...row])
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const neighbors = countNeighbors(currentGrid, i, j)
          if (currentGrid[i][j]) {
            newGrid[i][j] = neighbors === 2 || neighbors === 3
          } else {
            newGrid[i][j] = neighbors === 3
          }
        }
      }

      // 检查是否达到稳定状态
      if (prevGrid && JSON.stringify(prevGrid) === JSON.stringify(newGrid)) {
        setIsRunning(false)
        message.info('游戏已达到稳定状态')
      }
      setPrevGrid(currentGrid)
      return newGrid
    })
    setIterationCount(count => count + 1)
  }, [prevGrid])

  useEffect(() => {
    let intervalId: number
    if (isRunning) {
      intervalId = setInterval(nextGeneration, 200)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isRunning, nextGeneration])

  const resetGrid = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false)))
    setPrevGrid(undefined)
    setIsRunning(false)
    setIterationCount(0)
  }

  const randomizeGrid = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => Math.random() > 0.7)
    ))
  }

  const createGosperGliderGun = () => {
    const newGrid = grid.map(row => [...row])
    // 高斯帕机枪的模式
    const pattern = [
      [0, 4], [0, 5], [1, 4], [1, 5], // 左边方块
      [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8],
      [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5],
      [16, 6], [17, 5], // 左边的主要结构
      [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1],
      [22, 5], [24, 0], [24, 1], [24, 5], [24, 6] // 右边的主要结构
    ]

    // 随机选择一个起始位置，确保图案完全在网格内
    const margin = 40 // 确保有足够的空间放置图案
    const startX = Math.floor(Math.random() * (GRID_SIZE - margin))
    const startY = Math.floor(Math.random() * (GRID_SIZE - margin))

    // 将图案放置到网格中
    pattern.forEach(([y, x]) => {
      const newY = (startY + y + GRID_SIZE) % GRID_SIZE
      const newX = (startX + x + GRID_SIZE) % GRID_SIZE
      newGrid[newY][newX] = true
    })

    setGrid(newGrid)
  }

  return (
    <div className="game-container">
      <h1>康威生命游戏</h1>
      <div>迭代次数: {iterationCount}</div>
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`cell ${cell ? 'alive' : ''}`}
                onMouseDown={() => {
                  setIsDragging(true)
                  toggleCell(i, j)
                }}
                onMouseEnter={(e) => {
                  if (isDragging) {
                    toggleCell(i, j)
                  }
                }}
                onMouseUp={() => setIsDragging(false)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '暂停' : '开始'}
        </button>
        <button onClick={resetGrid}>重置</button>
        <button onClick={randomizeGrid}>随机</button>
        <button onClick={createGosperGliderGun}>高斯帕机枪</button>
      </div>
    </div>
  )
}

export default App
