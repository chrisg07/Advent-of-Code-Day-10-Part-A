const fs = require('fs')
var HeightMap = require('./HeightMap.ts')

fs.readFile('input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	const entries = data.split(/\r?\n/).map(line => line.trim());
	const heightMap = new HeightMap(entries);
	console.log('answer: ', heightMap.answer)
})