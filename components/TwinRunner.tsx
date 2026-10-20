"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

type Obstacle = { x: number; w: number; h: number };
export function TwinRunner({ authEnabled = false }: { authEnabled?: boolean }) {
  return authEnabled ? <SignedInRunner /> : <Runner />;
}
function SignedInRunner() {
  const { user } = useUser();
  return <Runner key={user?.id || "guest"} />;
}
type HighScore = { id: string; name: string; score: number };
function Runner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<HTMLButtonElement>(null);
  const world = useRef({
    y: 0,
    velocity: 0,
    time: 0,
    spawn: 1.1,
    score: 0,
    obstacles: [] as Obstacle[],
    running: false,
    runId: "",
  });
  const [status, setStatus] = useState<"ready" | "running" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [playerName, setPlayerName] = useState("Player");
  const [leaderboard, setLeaderboard] = useState<HighScore[]>([]);
  const player = useRef({ id: "", name: "Player" });
  const saveScore = useRef((value: number) => {
    void value;
  });
  const [savingScore, setSavingScore] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/runner", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (!active) return;
        player.current = data.player;
        setPlayerName(data.player.name);
        setBest(data.best);
        setLeaderboard(data.leaderboard);
        setScoreError(null);
      } catch {
        if (active)
          setScoreError("High scores could not load. You can still play.");
      }
    };
    void load();
    const refresh = window.setInterval(() => {
      if (!document.hidden) void load();
    }, 30000);
    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);
  saveScore.current = async (value: number) => {
    setSavingScore(true);
    setBest((previous) => Math.max(previous, value));
    try {
      const response = await fetch("/api/runner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: value, runId: world.current.runId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setLeaderboard(data.leaderboard);
      setBest(data.best);
      setPlayerName(data.player.name);
      player.current = data.player;
      setScoreError(null);
    } catch {
      setScoreError(
        "Score could not be saved. Please finish another run to retry.",
      );
    } finally {
      setSavingScore(false);
    }
  };
  const jump = useRef(() => {});
  jump.current = () => {
    const game = world.current;
    if (!game.running) {
      Object.assign(game, {
        y: 0,
        velocity: 0,
        time: 0,
        spawn: 1.1,
        score: 0,
        obstacles: [],
        running: true,
        runId: crypto.randomUUID(),
      });
      void fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "game_start",
          path: "/",
          eventId: game.runId,
        }),
        keepalive: true,
      }).catch(() => {});
      setScore(0);
      setStatus("running");
    } else if (game.y === 0) game.velocity = 570;
    surface.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const sprite = new window.Image();
    sprite.src = "/twin-run-sheet.png";
    let frame = 0,
      last = 0,
      lastScore = 0;
    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      last = 0;
    });
    observer.observe(element);
    let paletteTime = -1000;
    let primary = "#c5ff00",
      pink = "#ff00a8",
      muted = "#bbaabb";
    const pause = () => {
      last = 0;
    };
    document.addEventListener("visibilitychange", pause);
    const render = (now: number) => {
      if (!inView || document.hidden) {
        last = 0;
        frame = requestAnimationFrame(render);
        return;
      }
      const dt =
        last && !document.hidden ? Math.min((now - last) / 1000, 0.035) : 0;
      last = now;
      const game = world.current;
      if (now - paletteTime > 1000) {
        const colors = getComputedStyle(element);
        primary = colors.getPropertyValue("--primary").trim() || "#c5ff00";
        pink = colors.getPropertyValue("--cyber-pink").trim() || "#ff00a8";
        muted =
          colors.getPropertyValue("--muted-foreground").trim() || "#bbaabb";
        paletteTime = now;
      }
      const width = Math.min(
          900,
          (900 * (surface.current?.clientWidth || 900)) /
            (element.clientWidth || 900),
        ),
        floor = 210;
      if (game.running) {
        game.time += dt;
        game.score = Math.floor(game.time * 10);
        game.y = Math.max(0, game.y + game.velocity * dt);
        game.velocity -= 1600 * dt;
        if (game.y === 0 && game.velocity < 0) game.velocity = 0;
        const speed = 245 + Math.min(game.time * 3, 160);
        game.spawn -= dt;
        if (game.spawn <= 0) {
          game.obstacles.push({
            x: width + 10,
            w: 24 + Math.random() * 15,
            h: 28 + Math.random() * 20,
          });
          game.spawn = 1.25 + Math.random() * 0.65;
        }
        for (const obstacle of game.obstacles) obstacle.x -= speed * dt;
        game.obstacles = game.obstacles.filter((obstacle) => obstacle.x > -60);
        for (const obstacle of game.obstacles) {
          if (
            obstacle.x < 116 &&
            obstacle.x + obstacle.w > 83 &&
            floor - game.y - 9 > floor - obstacle.h &&
            floor - game.y - 72 < floor
          ) {
            game.running = false;
            setStatus("over");
            setScore(game.score);
            saveScore.current(game.score);
          }
        }
        if (now - lastScore > 100) {
          setScore(game.score);
          lastScore = now;
        }
      }
      context.clearRect(0, 0, 900, 260);
      context.strokeStyle = muted;
      context.globalAlpha = 0.3;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, floor);
      context.lineTo(width, floor);
      context.stroke();
      for (let i = 0; i < 18; i++) {
        const x = (i * 60 - game.time * 70) % width;
        context.fillStyle = muted;
        context.fillRect(x, floor + 13 + (i % 3) * 6, 8, 2);
      }
      context.globalAlpha = 1;
      context.imageSmoothingEnabled = false;
      if (sprite.complete && sprite.naturalWidth) {
        const cell = sprite.naturalWidth / 2;
        const stride =
          game.running && game.y === 0 ? Math.floor(game.time * 9) % 2 : 0;
        const bob = game.running && game.y === 0 && stride === 1 ? 2 : 0;
        context.drawImage(
          sprite,
          stride * cell,
          0,
          cell,
          sprite.naturalHeight,
          50,
          floor - game.y - 96 - bob,
          96,
          96,
        );
      } else {
        context.fillStyle = primary;
        context.fillRect(82, floor - game.y - 60, 36, 60);
      }
      for (const obstacle of game.obstacles) {
        context.fillStyle = pink;
        context.fillRect(
          obstacle.x,
          floor - obstacle.h,
          obstacle.w,
          obstacle.h,
        );
        context.fillStyle = primary;
        context.fillRect(
          obstacle.x + 5,
          floor - obstacle.h + 6,
          obstacle.w - 10,
          3,
        );
      }
      if (!game.running) {
        context.fillStyle = primary;
        context.font = "16px monospace";
        context.textAlign = "center";
        context.fillText(
          game.time ? "NICE RUN. PLAY AGAIN?" : "YOUR TWIN. ONE ENDLESS RUN.",
          width / 2,
          90,
        );
        context.fillStyle = muted;
        context.font = "13px monospace";
        context.fillText("Space / Up / tap to jump", width / 2, 120);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);
  return (
    <section
      id="play"
      className="runner-section"
      aria-labelledby="runner-title"
    >
      <p className="runner-player">
        Playing as <strong>{playerName}</strong>
      </p>
      <div className="runner-top">
        <div>
          <p className="chat-eyebrow">A little side quest</p>
          <h2 id="runner-title">Wanna play a game?</h2>
          <p>Jump over the glitches. Keep your AI Twin running.</p>
        </div>
        <div className="runner-scores">
          <span>
            Score <strong>{score.toString().padStart(4, "0")}</strong>
          </span>
          <span>
            Best <strong>{best.toString().padStart(4, "0")}</strong>
          </span>
        </div>
      </div>
      <button
        ref={surface}
        type="button"
        className="runner-surface"
        aria-label={
          status === "running"
            ? "Jump. Press Space, Arrow Up, or tap."
            : "Start AI Twin runner"
        }
        onClick={() => jump.current()}
        onKeyDown={(event) => {
          if (["ArrowUp", " ", "Enter"].includes(event.key)) {
            event.preventDefault();
            if (!event.repeat) jump.current();
          }
        }}
      >
        <canvas
          ref={canvas}
          width={900}
          height={260}
          role="img"
          aria-label="AI Twin jumping over neon obstacles"
        />
      </button>
      <div className="runner-bottom">
        <p>Space / Up to jump - Tap on mobile</p>
        <button
          type="button"
          className="chat-action"
          onClick={() => jump.current()}
        >
          {status === "running"
            ? "Jump"
            : status === "over"
              ? "Try again"
              : "Let's play"}
        </button>
      </div>
      {savingScore && (
        <output className="runner-player">Saving high score...</output>
      )}
      {scoreError && (
        <p className="runner-score-error" role="alert">
          {scoreError}
        </p>
      )}
      <div className="runner-leaderboard">
        <h3>
          High scores <span>all players</span>
        </h3>
        {leaderboard.length ? (
          <ol>
            {leaderboard.slice(0, 5).map((entry, index) => (
              <li key={entry.id}>
                <span>
                  {index + 1}. {entry.name}
                  {entry.id === player.current.id ? " (you)" : ""}
                </span>
                <strong>{entry.score}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <p>Finish a run to set the first high score.</p>
        )}
      </div>
      <output className="sr-only">
        {status === "over"
          ? `Game over. Score ${score}. Select Try again to restart.`
          : status === "running"
            ? "Game started."
            : "Game ready."}
      </output>
    </section>
  );
}
