# 贪吃蛇游戏

一个使用HTML5 Canvas、CSS3和原生JavaScript实现的经典贪吃蛇游戏。

## 功能特点

- 响应式设计
- 键盘控制（支持方向键和WASD）
- 分数系统
- 游戏难度随分数增加而提高
- 游戏结束提示
- 重新开始功能

## 如何运行

1. 克隆仓库到本地：
```bash
git clone https://github.com/louis7765/snake-game.git
```

2. 进入项目目录：
```bash
cd snake-game
```

3. 使用任意HTTP服务器运行项目，例如Python的内置服务器：
```bash
python -m http.server 8000
```

4. 在浏览器中访问：
```
http://localhost:8000
```

## 游戏操作说明

- 点击"开始游戏"按钮开始
- 使用方向键或WASD控制蛇的移动
- 吃到红色食物可以增加分数（每个食物10分）
- 每吃到一个食物，蛇的移动速度会稍微加快
- 撞到墙壁或自己会导致游戏结束
- 游戏结束后可以点击"重新开始"按钮再次游戏

## 技术栈

- HTML5 Canvas
- CSS3
- 原生JavaScript（ES6+）

## 许可证

MIT License