module.exports = class HeightMap {
	openingSymbols = ['(', '{', '[', '<']
	closingSymbols = [')', '}', ']', '>']
	scoreCard = [3, 1197, 57, 25137]
	corruptedLines = new Array<string>()
	incompleteLines = new Array<string>()
	illegalCharacters = new Array<string>()
	answer = 0
	
  constructor(lines) {
		for (let [index, entry] of lines.entries()) {
			if (entry) {
				this.parseLine(entry)
			}
		}
		console.log(this.illegalCharacters)
		console.log('answer:', this.answer)
  }

	parseLine(line) {
		let incompleteChunks = new Array<string>()
		const chars = line.split('')
		for (let char of chars) {
			if (this.isOpeningSymbol(char)) {
				incompleteChunks.unshift(char)
			} else {
				// try to close chunk
				const openChunk = incompleteChunks.shift()
				const openChunkIndex = this.openingSymbols.indexOf(openChunk ? openChunk : '')
				if (this.closingSymbols[openChunkIndex] !== char) {
					// corrupted
					const closingChunkIndex = this.closingSymbols.indexOf(char ? char : '')
					this.illegalCharacters.push(char)
					this.answer += this.scoreCard[closingChunkIndex]
					console.log(`Expected '${this.closingSymbols[openChunkIndex]}' but found '${char}'' instead. Added ${this.scoreCard[openChunkIndex]} score from index ${openChunkIndex}`)
					this.corruptedLines.push(line)
				}
			}
		}
	}

	isOpeningSymbol(char: string): boolean {
		return this.openingSymbols.indexOf(char) >= 0
	}
}
