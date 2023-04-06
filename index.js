let main = document.getElementById('main');
let score = document.getElementById('score');
let boom = document.getElementById("myAudio");
let game = document.getElementById('gameover'); 
let background = document.getElementById('background'); 
let start = document.getElementById('start');
let count;
let birdInterval;

function showBird(){
	if(main.childElementCount<20){
		let bird = document.createElement('img');
		let position = 1500;
		bird.src = 'bird.webp';
		bird.style.height = '80px';
		bird.style.width = '80px';
		bird.style.position = 'absolute';
    const screenSize = document.documentElement.clientWidth || window.innerWidth;
      if (screenSize <= 480) {
        bird.style.top = Math.random()*300+'px';
      } else {
        bird.style.top = Math.random()*650+'px';
      }
		bird.style.right = position+'px';
		main.appendChild(bird);
		
		let birdFlight = setInterval(flight, 10);
		function flight(){
				if(main?.children[0]?.style?.right === '0px'){
					clearInterval(birdFlight);
					clearInterval(birdInterval);
					main.innerHTML = "";
					background.pause();
					start.style.display = 'block';
					alert('You did not shoot all the birds. Game over.');
				}
				else{
					bird.style.right = position+'px';
					position--;
				}
			}
	}
	else{
		clearInterval(birdInterval);
	}
}
start.addEventListener('click', function(){
	start.style.display = 'none';
	count = 0;
	background.play();
	background.loop = true;
	birdInterval = setInterval(showBird, 2000);
	
});
	
main.addEventListener('click', function(ev){
	if(ev.target.nodeName === 'IMG'){
		boom.play();
		ev.target.remove();
		count++;
		score.innerHTML = `Score is ${count}`;
		if(count === 20){
			main.innerHTML = "";
			score.innerHTML = '';
			background.pause();
			game.play();
			const willPlayAgain = confirm('Congrats on clearing the game, play again?');
			if (!willPlayAgain) {
				start.style.display = 'block';
				background.pause();
				clearInterval(birdInterval);
			} else {
				start.click();
			}
		}
	}
});

main.addEventListener('mouseover', function(ev){
	if(ev.target.nodeName === 'IMG'){
		ev.target.style.cursor = 'crosshair';
	}
});