var fs = require("fs")
var argv = process.argv.slice(2)
var from = ""
var to = "eval"
argv.forEach((arg, i)=>{
	if(arg == "from"){
		from = argv[i+1]
	}
	if(arg == "to"){
		to = argv[i+1]
	}
})
var file = fs.readFileSync(from).toString()
var keytxt = fs.readFileSync("key.txt").toString().replace(/\r/g, "")
var key = keytxt.split("\n")
var tosr = !from.endsWith(".sj") || !from.endsWith(".sr") //For if ya can't support a fancy character. 

var froKey = tosr ? 0 :  1
var toKey = tosr ? 1 : 0

file = file.split("\n").reverse().join("\n")
var origin = key[froKey].split("") //Going from origin to target.
var target = key[toKey].split("").reverse()
var map = {}
origin.forEach((char, i)=>map[char]=target[i])
file = file.split("").map(c=>{
	var newC = map[c] || c
	return newC
}).join("")
if(to == "eval"){
	eval(file)
}else{
	fs.writeFileSync(to, file)
}
