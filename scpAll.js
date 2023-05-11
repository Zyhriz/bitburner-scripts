/* This file requires a servers.txt to exist, preferably without
a leading newline. Check my github if you need to make one. ;)
*/
export async function main(ns) {
	const file = ns.args[0];
	const servers = ns.read("servers.txt").split("\n");
	for(let i = 0; i < servers.length; i++){ns.scp(file,servers[i]);}
}
