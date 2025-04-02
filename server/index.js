const express = require('express');
const path = require('path');
const app = express();

const logRoutes = (req, res, next) => {
	const time = new Date().toLocaleString();
	console.log(`${req.method}: ${req.originalUrl} - ${time}`);
	next();
};
const filePath = path.join(__dirname, '../app/dist');

const serveStatic = express.static(filePath);
app.use(logRoutes);
app.use(serveStatic);

const getPicture = (req, res, next) => {
	res.send({
		src: 'https://imgs.search.brave.com/yK3Jvpl7mmWMp1cU8NMIYa1QM7Ompxez13fXmt4T3dU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/LmFsYnVtb2Z0aGV5/ZWFyLm9yZy8zNzV4/MC9hbGJ1bS90cmls/b2d5LmpwZw',
	});
};

const getJoke = (req, res, next) => {
	const joke = {
		setup: 'There is water filling up the seat!',
		punchline: 'It must be the water.',
	};
	res.send(joke);
};

const rollDie = (req, res, next) => {
	let quantity = parseInt(req.query.quantity, 10);
	if (isNaN(quantity) || quantity < 1) {
		quantity = 1;
	}
	const rolls = [];
	for (let i = 0; i < quantity; i++) {
		let roll = Math.floor(Math.random() * 6) + 1;
		rolls.push(roll);
	}

	res.json({ rolls });
};

app.get('/api/picture', getPicture);
app.get('/api/joke', getJoke);
app.get('/api/rollDie', rollDie);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
