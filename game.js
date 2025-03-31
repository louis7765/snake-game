class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.gameLoop = null;
        this.speed = 150;
        
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    generateFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
        const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
        return {x, y};
    }

    drawSquare(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }

    drawGame() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制蛇
        this.snake.forEach((segment, index) => {
            this.drawSquare(segment.x, segment.y, index === 0 ? '#4CAF50' : '#45a049');
        });
        
        // 绘制食物
        this.drawSquare(this.food.x, this.food.y, '#ff0000');
        
        // 更新分数
        document.querySelector('.score').textContent = `分数: ${this.score}`;
    }

    moveSnake() {
        const head = {...this.snake[0]};
        
        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
            this.speed = Math.max(50, this.speed - 5);
        } else {
            this.snake.pop();
        }
        
        // 检查游戏结束条件
        if (this.checkCollision(head)) {
            this.endGame();
            return;
        }
        
        this.snake.unshift(head);
        this.drawGame();
    }

    checkCollision(head) {
        // 检查是否撞墙
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            return true;
        }
        
        // 检查是否撞到自己
        return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        const directions = {
            'arrowup': 'up',
            'arrowdown': 'down',
            'arrowleft': 'left',
            'arrowright': 'right',
            'w': 'up',
            's': 'down',
            'a': 'left',
            'd': 'right'
        };
        
        if (directions[key] && 
            !(this.direction === 'up' && directions[key] === 'down') &&
            !(this.direction === 'down' && directions[key] === 'up') &&
            !(this.direction === 'left' && directions[key] === 'right') &&
            !(this.direction === 'right' && directions[key] === 'left')) {
            this.direction = directions[key];
        }
    }

    startGame() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        this.snake = [{x: 10, y: 10}];
        this.direction = 'right';
        this.score = 0;
        this.speed = 150;
        this.food = this.generateFood();
        
        this.gameLoop = setInterval(() => this.moveSnake(), this.speed);
        document.getElementById('startBtn').textContent = '重新开始';
    }

    endGame() {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        alert(`游戏结束！\n你的得分是: ${this.score}`);
        document.getElementById('startBtn').textContent = '开始游戏';
    }
}

// 当页面加载完成后初始化游戏
window.onload = () => {
    new SnakeGame();
};