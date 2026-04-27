import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface Paddle {
  x: number;
  y: number;
  vy: number;
  speed: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
}

@Component({
  selector: 'app-pong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pong.html',
  styleUrls: ['./pong.scss']
})
export class PongComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pongCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animId?: number;
  private audioCtx?: AudioContext;

  // Constants
  private readonly WIN_SCORE = 5;
  private readonly PADDLE_W = 10;
  private readonly PADDLE_H_RATIO = 0.16;
  private readonly BALL_R_RATIO = 0.012;
  private readonly BASE_BALL_SPEED_RATIO = 0.007;
  private readonly SPEED_INC = 1.04;
  private readonly MAX_SPEED_RATIO = 0.018;
  private readonly AI_REACT_ZONE = 0.55;
  private readonly AI_ERROR_RANGE = 0.04;

  // State
  W = 0;
  H = 0;
  PADDLE_H = 0;
  BALL_R = 0;
  BASE_SPEED = 0;
  gameRunning = false;
  aiMode = false;
  scores = [0, 0];
  rallyCount = 0;
  p2Label = 'PLAYER 2';
  overlayTitle = 'READY PLAYER ONE';
  overlaySubtitle = 'W / S — Left Paddle | ↑ / ↓ — Right Paddle';
  showOverlay = true;
  isEndGame = false;

  p1!: Paddle;
  p2!: Paddle;
  ball: Ball = { x: 0.5, y: 0.5, vx: 0, vy: 0, speed: 0 };
  keys: { [key: string]: boolean } = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
      this.resize();
      this.drawIdle();
      
      // Initialize Audio
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      } catch (e) {
        console.error('AudioContext not supported');
      }
    }
  }

  ngOnDestroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.resize();
      if (!this.gameRunning) this.drawIdle();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.keys[e.code] = true;
    if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS'].includes(e.code)) {
      e.preventDefault();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    this.keys[e.code] = false;
  }

  // Mobile Touch Support
  onTouchMove(e: TouchEvent) {
    if (!this.gameRunning) return;
    e.preventDefault();
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;
      const normY = touchY / rect.height * this.H;

      if (touchX < rect.width / 2) {
        // Left side touch controls P1
        this.p1.y = normY;
      } else if (!this.aiMode) {
        // Right side touch controls P2 (if not AI)
        this.p2.y = normY;
      }
    }
    this.constrainPaddle(this.p1);
    if (!this.aiMode) this.constrainPaddle(this.p2);
  }

  onTouchStart(e: TouchEvent) {
    if (!this.gameRunning) return;
    this.onTouchMove(e);
  }

  private resize() {
    const container = this.canvasRef.nativeElement.parentElement!;
    const maxW = Math.min(window.innerWidth * 0.96, 900);
    const maxH = Math.min(window.innerHeight * 0.55, 500);
    const ratio = 16 / 9;
    let w = maxW, h = maxW / ratio;
    if (h > maxH) { h = maxH; w = h * ratio; }
    this.W = Math.floor(w);
    this.H = Math.floor(h);
    this.canvasRef.nativeElement.width = this.W;
    this.canvasRef.nativeElement.height = this.H;
    this.PADDLE_H = Math.round(this.H * this.PADDLE_H_RATIO);
    this.BALL_R = Math.round(this.W * this.BALL_R_RATIO);
    this.BASE_SPEED = this.W * this.BASE_BALL_SPEED_RATIO;

    if (!this.p1) {
      this.p1 = this.makePaddle(this.PADDLE_W + 12);
      this.p2 = this.makePaddle(this.W - this.PADDLE_W - 12);
    } else {
      this.p1.x = this.PADDLE_W + 12;
      this.p2.x = this.W - this.PADDLE_W - 12;
    }
    this.constrainPaddle(this.p1);
    this.constrainPaddle(this.p2);
  }

  private makePaddle(x: number): Paddle {
    return { x, y: this.H / 2, vy: 0, speed: 0 };
  }

  initGame(vsAI: boolean) {
    if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();
    this.aiMode = vsAI;
    this.p2Label = vsAI ? 'CPU' : 'PLAYER 2';
    this.scores = [0, 0];
    this.p1 = this.makePaddle(this.PADDLE_W + 12);
    this.p2 = this.makePaddle(this.W - this.PADDLE_W - 12);
    this.resetBall(null);
    this.gameRunning = true;
    this.rallyCount = 0;
    this.showOverlay = false;
    this.isEndGame = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.loop();
  }

  private resetBall(scorer: number | null) {
    this.ball.x = this.W / 2;
    this.ball.y = this.H / 2;
    this.rallyCount = 0;
    const dir = (scorer === null) ? (Math.random() < 0.5 ? 1 : -1) : (scorer === 0 ? 1 : -1);
    const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
    this.ball.speed = this.BASE_SPEED;
    this.ball.vx = Math.cos(angle) * this.ball.speed * dir;
    this.ball.vy = Math.sin(angle) * this.ball.speed;
  }

  private loop = () => {
    if (!this.gameRunning) return;
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(this.loop);
  }

  private update() {
    this.movePaddles();
    if (this.aiMode) this.updateAI();
    this.moveBall();
    this.checkWallCollision();
    this.checkPaddleCollision(this.p1);
    this.checkPaddleCollision(this.p2);
    this.checkScoring();
  }

  private movePaddles() {
    const spd = this.H * 0.013;
    if (this.keys['KeyW']) this.p1.y -= spd;
    if (this.keys['KeyS']) this.p1.y += spd;
    if (!this.aiMode) {
      if (this.keys['ArrowUp']) this.p2.y -= spd;
      if (this.keys['ArrowDown']) this.p2.y += spd;
    }
    this.constrainPaddle(this.p1);
    this.constrainPaddle(this.p2);
  }

  private constrainPaddle(p: Paddle) {
    const half = this.PADDLE_H / 2;
    p.y = Math.max(half, Math.min(this.H - half, p.y));
  }

  private updateAI() {
    const spd = this.H * 0.011;
    const bNorm = this.ball.x / this.W;
    if (bNorm > this.AI_REACT_ZONE || this.ball.vx > 0) {
      const targetY = this.ball.y + (Math.random() - 0.5) * this.H * this.AI_ERROR_RANGE * 2;
      if (this.p2.y < targetY - 4) this.p2.y += spd;
      else if (this.p2.y > targetY + 4) this.p2.y -= spd;
    } else {
      if (Math.abs(this.p2.y - this.H / 2) > 5) this.p2.y += (this.H / 2 - this.p2.y) * 0.03;
    }
    this.constrainPaddle(this.p2);
  }

  private moveBall() {
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;
  }

  private checkWallCollision() {
    if (this.ball.y - this.BALL_R <= 0) {
      this.ball.y = this.BALL_R;
      this.ball.vy = Math.abs(this.ball.vy);
      this.soundBounceWall();
    }
    if (this.ball.y + this.BALL_R >= this.H) {
      this.ball.y = this.H - this.BALL_R;
      this.ball.vy = -Math.abs(this.ball.vy);
      this.soundBounceWall();
    }
  }

  private checkPaddleCollision(paddle: Paddle) {
    const half = this.PADDLE_H / 2;
    const px = paddle.x;
    const py = paddle.y;
    const isLeft = px < this.W / 2;
    const ballEdge = isLeft ? this.ball.x - this.BALL_R : this.ball.x + this.BALL_R;
    const hitX = isLeft ? (ballEdge <= px + this.PADDLE_W / 2) : (ballEdge >= px - this.PADDLE_W / 2);

    if (!hitX) return;
    if (this.ball.y < py - half || this.ball.y > py + half) return;
    if (isLeft && this.ball.vx > 0) return;
    if (!isLeft && this.ball.vx < 0) return;

    const relHit = (this.ball.y - py) / half;
    const maxAngle = 65 * (Math.PI / 180);
    const bounceAngle = relHit * maxAngle;

    this.rallyCount++;
    const maxSpd = this.W * this.MAX_SPEED_RATIO;
    this.ball.speed = Math.min(this.ball.speed * this.SPEED_INC, maxSpd);
    this.ball.vx = (isLeft ? 1 : -1) * Math.cos(bounceAngle) * this.ball.speed;
    this.ball.vy = Math.sin(bounceAngle) * this.ball.speed;

    if (isLeft) this.ball.x = px + this.PADDLE_W / 2 + this.BALL_R + 1;
    else this.ball.x = px - this.PADDLE_W / 2 - this.BALL_R - 1;

    this.soundBouncePaddle();
  }

  private checkScoring() {
    if (this.ball.x + this.BALL_R < 0) this.awardPoint(1);
    else if (this.ball.x - this.BALL_R > this.W) this.awardPoint(0);
  }

  private awardPoint(player: number) {
    this.scores[player]++;
    this.soundScore();
    if (this.scores[player] >= this.WIN_SCORE) {
      this.endGame(player);
    } else {
      this.resetBall(player === 0 ? 1 : 0);
    }
  }

  private endGame(winner: number) {
    this.gameRunning = false;
    this.soundWin();
    const names = ['PLAYER 1', this.aiMode ? 'CPU' : 'PLAYER 2'];
    this.overlayTitle = `${names[winner]} WINS!`;
    this.overlaySubtitle = `Final Score ${this.scores[0]} — ${this.scores[1]}`;
    this.showOverlay = true;
    this.isEndGame = true;
  }

  showMainMenu() {
    this.overlayTitle = 'READY PLAYER ONE';
    this.overlaySubtitle = 'W / S — Left Paddle | ↑ / ↓ — Right Paddle';
    this.showOverlay = true;
    this.isEndGame = false;
  }

  exitGame() {
    this.router.navigate(['/games']);
  }

  // Sound Effects
  private beep(freq = 440, dur = 0.07, vol = 0.25, type: OscillatorType = 'square') {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + dur);
    osc.start();
    osc.stop(this.audioCtx.currentTime + dur);
  }

  private soundBounceWall() { this.beep(320, 0.06, 0.18, 'square'); }
  private soundBouncePaddle() { this.beep(480, 0.08, 0.25, 'square'); }
  private soundScore() { this.beep(200, 0.3, 0.3, 'sawtooth'); }
  private soundWin() {
    [600, 750, 900, 1100].forEach((f, i) => setTimeout(() => this.beep(f, 0.18, 0.3, 'triangle'), i * 120));
  }

  // Drawing
  private draw() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.drawBackground();
    this.drawCenterLine();
    this.drawPaddle(this.p1, '#00f5ff');
    this.drawPaddle(this.p2, '#ff2d78');
    this.drawBall();
  }

  private drawIdle() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.drawBackground();
    this.drawCenterLine();
  }

  private drawBackground() {
    const grad = this.ctx.createRadialGradient(this.W / 2, this.H / 2, 0, this.W / 2, this.H / 2, this.W * 0.8);
    grad.addColorStop(0, 'rgba(0,20,40,0.0)');
    grad.addColorStop(1, 'rgba(0,5,15,0.6)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }

  private drawCenterLine() {
    const dash = 12, gap = 10;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([dash, gap]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.W / 2, 0);
    this.ctx.lineTo(this.W / 2, this.H);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private drawPaddle(p: Paddle, color: string) {
    const half = this.PADDLE_H / 2;
    const x = p.x - this.PADDLE_W / 2;
    const y = p.y - half;
    const r = 4;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 18;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    (this.ctx as any).roundRect(x, y, this.PADDLE_W, this.PADDLE_H, r);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = 'rgba(255,255,255,0.25)';
    this.ctx.beginPath();
    (this.ctx as any).roundRect(x + 2, y + 2, this.PADDLE_W - 4, 6, 2);
    this.ctx.fill();
  }

  private drawBall() {
    const steps = 4;
    for (let i = steps; i >= 1; i--) {
      const tx = this.ball.x - this.ball.vx * i * 0.7;
      const ty = this.ball.y - this.ball.vy * i * 0.7;
      const alpha = (1 - i / (steps + 1)) * 0.2;
      this.ctx.beginPath();
      this.ctx.arc(tx, ty, this.BALL_R * (1 - i * 0.1), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      this.ctx.fill();
    }
    this.ctx.shadowColor = '#fff';
    this.ctx.shadowBlur = 16;
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.BALL_R, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  getSpeedPct() {
    const min = this.BASE_SPEED;
    const max = this.W * this.MAX_SPEED_RATIO;
    return Math.min(100, ((this.ball.speed - min) / (max - min)) * 80 + 20) + '%';
  }
}
