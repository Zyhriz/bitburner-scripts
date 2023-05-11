export async function main(ns) {
	const servers = ns.read("servers.txt").split("\n");
	for(let i = 0; i < servers.length; i++){ns.killall(servers[i]);}
}
