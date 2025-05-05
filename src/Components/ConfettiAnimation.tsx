import { useEffect, useRef } from 'react';

interface ConfettiConfig {
  confettiesNumber?: number;
  confettiRadius?: number;
  confettiColors?: string[];
  emojies?: string[];
  svgIcon?: string | null;
}

const defaultConfettiConfig: ConfettiConfig = {
  confettiesNumber: 250,
  confettiRadius: 6,
  confettiColors: [
    "#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"
  ],
  emojies: [],
  svgIcon: null,
};

class Confetti {
  private speed: { x: number; y: number };
  private finalSpeedX: number;
  private rotationSpeed: number;
  private dragCoefficient: number;
  private radius: { x: number; y: number };
  private initialRadius: number;
  private rotationAngle: number;
  private emojiRotationAngle: number;
  private radiusYDirection: "up" | "down";
  private absCos: number;
  private absSin: number;
  private position: { x: number; y: number };
  private initialPosition: { x: number; y: number };
  private color: string | null;
  private emoji: string | null;
  private svgIcon: HTMLImageElement | null;
  private createdAt: number;
  private direction: "left" | "right";

  constructor({ initialPosition, direction, radius, colors, emojis, svgIcon }: {
    initialPosition: { x: number; y: number };
    direction: "left" | "right";
    radius: number;
    colors: string[];
    emojis: string[];
    svgIcon: string | null;
  }) {
    const speedFactor = this.getRandomInRange(0.9, 1.7, 3) * this.getScaleFactor();
    this.speed = { x: speedFactor, y: speedFactor };
    this.finalSpeedX = this.getRandomInRange(0.2, 0.6, 3);
    this.rotationSpeed = emojis.length || svgIcon ? 0.01 : this.getRandomInRange(0.03, 0.07, 3) * this.getScaleFactor();
    this.dragCoefficient = this.getRandomInRange(0.0005, 0.0009, 6);
    this.radius = { x: radius, y: radius };
    this.initialRadius = radius;
    this.rotationAngle = direction === "left" ? this.getRandomInRange(0, 0.2, 3) : this.getRandomInRange(-0.2, 0, 3);
    this.emojiRotationAngle = this.getRandomInRange(0, 2 * Math.PI);
    this.radiusYDirection = "down";

    const angle = direction === "left" ? this.getRandomInRange(82, 15) * (Math.PI / 180) : this.getRandomInRange(-15, -82) * (Math.PI / 180);
    this.absCos = Math.abs(Math.cos(angle));
    this.absSin = Math.abs(Math.sin(angle));

    const offset = this.getRandomInRange(-150, 0);
    const position = {
      x: initialPosition.x + (direction === "left" ? -offset : offset) * this.absCos,
      y: initialPosition.y - offset * this.absSin
    };

    this.position = { ...position };
    this.initialPosition = { ...position };
    this.color = emojis.length || svgIcon ? null : this.getRandomItem(colors);
    this.emoji = emojis.length ? this.getRandomItem(emojis) : null;
    this.svgIcon = null;

    if (svgIcon) {
      const img = new Image();
      img.src = svgIcon;
      img.onload = () => {
        this.svgIcon = img;
      };
    }

    this.createdAt = Date.now();
    this.direction = direction;
  }

  private getRandomInRange(min: number, max: number, precision = 0): number {
    const multiplier = Math.pow(10, precision);
    const randomValue = Math.random() * (max - min) + min;
    return Math.floor(randomValue * multiplier) / multiplier;
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getScaleFactor(): number {
    return Math.log(window.innerWidth) / Math.log(1920);
  }

  draw(context: CanvasRenderingContext2D) {
    const { x, y } = this.position;
    const { x: radiusX, y: radiusY } = this.radius;
    const scale = window.devicePixelRatio;

    if (this.svgIcon) {
      context.save();
      context.translate(scale * x, scale * y);
      context.rotate(this.emojiRotationAngle);
      context.drawImage(this.svgIcon, -radiusX, -radiusY, radiusX * 2, radiusY * 2);
      context.restore();
    } else if (this.color) {
      context.fillStyle = this.color;
      context.beginPath();
      context.ellipse(x * scale, y * scale, radiusX * scale, radiusY * scale, this.rotationAngle, 0, 2 * Math.PI);
      context.fill();
    } else if (this.emoji) {
      context.font = `${radiusX * scale}px serif`;
      context.save();
      context.translate(scale * x, scale * y);
      context.rotate(this.emojiRotationAngle);
      context.textAlign = "center";
      context.fillText(this.emoji, 0, radiusY / 2);
      context.restore();
    }
  }

  updatePosition(deltaTime: number, currentTime: number) {
    const elapsed = currentTime - this.createdAt;

    if (this.speed.x > this.finalSpeedX) {
      this.speed.x -= this.dragCoefficient * deltaTime;
    }

    this.position.x += this.speed.x * (this.direction === "left" ? -this.absCos : this.absCos) * deltaTime;
    this.position.y = this.initialPosition.y - this.speed.y * this.absSin * elapsed + 0.00125 * Math.pow(elapsed, 2) / 2;

    if (!this.emoji && !this.svgIcon) {
      this.rotationSpeed -= 1e-5 * deltaTime;
      this.rotationSpeed = Math.max(this.rotationSpeed, 0);

      if (this.radiusYDirection === "down") {
        this.radius.y -= deltaTime * this.rotationSpeed;
        if (this.radius.y <= 0) {
          this.radius.y = 0;
          this.radiusYDirection = "up";
        }
      } else {
        this.radius.y += deltaTime * this.rotationSpeed;
        if (this.radius.y >= this.initialRadius) {
          this.radius.y = this.initialRadius;
          this.radiusYDirection = "down";
        }
      }
    }
  }

  isVisible(canvasHeight: number): boolean {
    return this.position.y < canvasHeight + 100;
  }
}

const ConfettiAnimation = ({ config = {} }: { config?: ConfettiConfig }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetti[]>([]);
  const lastUpdatedRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };

    const addConfetti = () => {
      const { confettiesNumber, confettiRadius, confettiColors, emojies, svgIcon } = {
        ...defaultConfettiConfig,
        ...config,
      };

      const baseY = (5 * window.innerHeight) / 7;
      for (let i = 0; i < (confettiesNumber || 250) / 2; i++) {
        confettiRef.current.push(new Confetti({
          initialPosition: { x: 0, y: baseY },
          direction: "right",
          radius: confettiRadius || 6,
          colors: confettiColors || defaultConfettiConfig.confettiColors!,
          emojis: emojies || [],
          svgIcon: svgIcon || null,
        }));
        confettiRef.current.push(new Confetti({
          initialPosition: { x: window.innerWidth, y: baseY },
          direction: "left",
          radius: confettiRadius || 6,
          colors: confettiColors || defaultConfettiConfig.confettiColors!,
          emojis: emojies || [],
          svgIcon: svgIcon || null,
        }));
      }
    };

    const loop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdatedRef.current;
      lastUpdatedRef.current = currentTime;

      if (!canvas || !context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current = confettiRef.current.filter((item) => {
        item.updatePosition(deltaTime, currentTime);
        item.draw(context);
        return item.isVisible(canvas.height);
      });

      requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();
    addConfetti();
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ConfettiAnimation; 