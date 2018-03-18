
//Create a Pixi Application
let app = PIXI.autoDetectRenderer(500, 500, { 
	antialias: true,    // default: false
	transparent: false, // default: false
	resolution: 1       // default: 1
  }
);
console.log(`app`, app)

var container
var emitter
var lastupdate
var elapsed

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.Stage = new PIXI.Container()
app.Stage.width = 500
app.Stage.height = 500

PIXI.loader
  .add("./particle.png", {crossOrigin: '*'})
  .load(setup);

function setup() {
	particle()
	gameLoop()
}

function createImage() {
	let sprite = new PIXI.Sprite(PIXI.loader.resources["./particle.png"].texture);
	app.Stage.addChild(sprite)
	createImage()
}

function gameLoop() {

	updateParticle()

	app.render(app.Stage)

	requestAnimationFrame(() => gameLoop())
}
function updateParticle() {
	var now = Date.now();
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
}

function particle() {

	container = new PIXI.Container()
	app.Stage.addChild(container)

	const pixitext = new PIXI.Text("Test Text!", {fill: 0xaaaaaa})
	container.addChild(pixitext)

	// Create a new emitter
	emitter = new PIXI.particles.Emitter(
		// container
		container,
		// particle
		[PIXI.Texture.fromImage('particle.png')],
		// emitt
		{
			alpha: {
				list: [
					{
						value: 0.8,
						time: 0
					},
					{
						value: 0.1,
						time: 1
					}
				],
				isStepped: false
			},
			scale: {
				list: [
					{
						value: 1,
						time: 0
					},
					{
						value: 0.3,
						time: 1
					}
				],
				isStepped: false
			},
			color: {
				list: [
					{
						value: "fb1010",
						time: 0
					},
					{
						value: "f5b830",
						time: 1
					}
				],
				isStepped: false
			},
			speed: {
				list: [
					{
						value: 200,
						time: 0
					},
					{
						value: 100,
						time: 1
					}
				],
				isStepped: false
			},
			startRotation: {
				min: 0,
				max: 360
			},
			rotationSpeed: {
				min: 0,
				max: 0
			},
			lifetime: {
				min: 0.5,
				max: 0.5
			},
			frequency: 0.008,
			spawnChance: 1,
			particlesPerWave: 1,
			emitterLifetime: 0.31,
			maxParticles: 1000,
			pos: {
				x: 0,
				y: 0
			},
			addAtBack: false,
			spawnType: "circle",
			spawnCircle: {
				x: 0,
				y: 0,
				r: 10
			}
		}
	);

	elapsed = Date.now();

	// Click on the canvas to trigger
	window.addEventListener('mouseup', function(e){
		if(!emitter) return;
		emitter.emit = true;
		emitter.resetPositionTracking();
		//emitter.updateOwnerPos(e.offsetX || e.layerX, e.offsetY || e.layerY);
		emitter.updateOwnerPos(0, 0);
		console.log(`emitter.parent`, emitter.parent)
		console.log(`container.children.length`, container.children.length)
	});
}