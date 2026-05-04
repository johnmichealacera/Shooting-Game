const main = document.getElementById("main");
const score = document.getElementById("score");
const levelLabel = document.getElementById("level");
const finalScore = document.getElementById("final-score");
const boom = document.getElementById("myAudio");
const game = document.getElementById("gameover");
const background = document.getElementById("background");
const start = document.getElementById("start");
const playAgain = document.getElementById("play-again");
const startOverlay = document.getElementById("start-overlay");
const gameOverOverlay = document.getElementById("game-over-overlay");
const app = document.getElementById("app");

let count;
let level = 1;
let flightSpeed = 50;
let spawnTime = 3000;
let gameState;
/** @type {ReturnType<typeof setInterval> | null} */
let spawnIntervalId = null;

const clearSpawnTimer = () => {
	if (spawnIntervalId !== null) {
		clearInterval(spawnIntervalId);
		spawnIntervalId = null;
	}
};

const startSpawnTimer = () => {
	clearSpawnTimer();
	spawnIntervalId = setInterval(showBird, spawnTime);
};

const setOverlays = (phase) => {
	if (phase === "menu") {
		startOverlay.classList.remove("hidden");
		startOverlay.setAttribute("aria-hidden", "false");
		gameOverOverlay.classList.add("hidden");
		gameOverOverlay.setAttribute("aria-hidden", "true");
		app.classList.remove("is-playing");
	} else if (phase === "playing") {
		startOverlay.classList.add("hidden");
		startOverlay.setAttribute("aria-hidden", "true");
		gameOverOverlay.classList.add("hidden");
		gameOverOverlay.setAttribute("aria-hidden", "true");
		app.classList.add("is-playing");
	} else if (phase === "gameover") {
		startOverlay.classList.add("hidden");
		startOverlay.setAttribute("aria-hidden", "true");
		gameOverOverlay.classList.remove("hidden");
		gameOverOverlay.setAttribute("aria-hidden", "false");
		app.classList.remove("is-playing");
	}
};

const beginGame = () => {
	gameState = "playing";
	flightSpeed = 50;
	spawnTime = 6000;
	level = 1;
	levelLabel.textContent = String(level);
	setOverlays("playing");
	count = 0;
	score.textContent = String(count);
	main.innerHTML = "";
	background.play();
	background.loop = true;
	startSpawnTimer();
};

const showBird = () => {
	if (gameState !== "playing") return;

	let position;
	const bird = document.createElement("img");
	bird.src = "bird.gif";
	bird.alt = "";
	bird.style.position = "absolute";

	const w = Math.max(1, main.clientWidth);
	const h = Math.max(1, main.clientHeight);
	const birdSize = Math.min(80, Math.max(32, Math.round(h * 0.16)));
	bird.style.height = `${birdSize}px`;
	bird.style.width = `${birdSize}px`;

	const pad = 6;
	const topMax = Math.max(pad, h - birdSize - pad);
	bird.style.top = `${pad + Math.random() * topMax}px`;

	/* Start just past the right edge so birds enter smoothly on any screen width */
	position = Math.round(w + Math.max(120, w * 0.2));
	bird.style.right = `${position}px`;
	main.appendChild(bird);

	const flight = () => {
		if (!bird.isConnected || gameState !== "playing") {
			clearInterval(flightIntervalId);
			return;
		}
		if (Array.from(main?.children ?? []).find((child) => child.style.right === "0px")) {
			main.innerHTML = "";
			background.pause();
			clearSpawnTimer();
			gameState = "gameOver";
			game.play();
			if (finalScore) finalScore.textContent = String(count);
			setOverlays("gameover");
			playAgain?.focus();
			clearInterval(flightIntervalId);
			return;
		}
		bird.style.right = position + "px";
		position--;
	};
	const flightIntervalId = setInterval(flight, flightSpeed);
};

main.addEventListener("click", (ev) => {
	if (ev.target.nodeName === "IMG") {
		boom.play();
		ev.target.remove();
		count++;
		score.textContent = String(count);
		if (count % 10 === 0 && gameState === "playing") {
			spawnTime = spawnTime <= 0 ? 0 : spawnTime - level * 100;
			level++;
			levelLabel.textContent = String(level);
			flightSpeed = flightSpeed === 0 ? 0 : flightSpeed - level;
			startSpawnTimer();
		}
	}
});

main.addEventListener("mouseover", (ev) => {
	if (ev.target.nodeName === "IMG") {
		ev.target.style.cursor = "crosshair";
	}
});

start.addEventListener("click", () => {
	beginGame();
});

playAgain.addEventListener("click", () => {
	beginGame();
});

const loadResources = () => {
	background.preload = "auto";
	boom.preload = "auto";
	game.preload = "auto";
};

loadResources();
