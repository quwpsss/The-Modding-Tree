let modInfo = {
	name: "The Danus Tree",
	id: "8318",
	author: "Danus",
	pointsName: "Pencils",
	modFiles: ["layers/prestige.js", "layers/kirill.js", "layers/money.js", "layers/waiting.js","tree.js", "layers/dimitron.js", "layers/oscar.js", "layers/dota.js", "layers/yuldash.js", "layers/rage.js", ],

	discordName: "2dollars",
	discordLink: "https://discord.gg/SvdurxWVPp",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.9.2",
	name: "Rage part 2"
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.9.2</h3><br>
		- Rage part 2.<br>
	<h3>v0.9.1</h3><br>
		- fixed bugs.<br>
	<h3>v0.9</h3><br>
		- Added Rage.<br>
		- Added Immortal Draft.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade("p", 11)) gain = gain.times(2)
	if (hasUpgrade("o", 11)) gain = gain.times(10)
	if (hasUpgrade('k', 11)) gain = gain.times(2)
	if (hasUpgrade('d', 11)) gain = gain.times(5)
	gain = gain.times(buyableEffect("k", 11))
	if (hasUpgrade('k', 12)) gain = gain.times(2)
	if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12))
	if (hasUpgrade("p", 31)) gain = gain.times(upgradeEffect("p", 31))
	if (hasUpgrade("k", 14)) gain = gain.times(upgradeEffect("k", 14))
	if (hasUpgrade("p", 14)) gain = gain.times(5)
	if (hasUpgrade("d", 14)) gain = gain.times(1e100)
	if (hasUpgrade("m", 12)) gain = gain.times(upgradeEffect("m", 12))
	if (hasUpgrade("m", 34)) gain = gain.times(upgradeEffect("m", 34))
	if (hasUpgrade("p", 33)) gain = gain.pow(1.1)
	if (hasUpgrade("d", 12)) gain = gain.pow(1.01)
	if (hasUpgrade("w", 23)) gain = gain.pow(15)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1eeeeeeeeee9"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}