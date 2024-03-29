/* This file requires a servers.txt to exist, preferably without
a leading newline. Check my github if you need to make one. ;)
*/
export async function main(ns) {
	const file = ns.args[0];
	const servers = ns.read("servers.txt").split("\n");
	for(let i = 0; i < servers.length; i++){
		ns.scp(file,servers[i]);
		if(ns.args[1] == "run")
		{
			let threads = Math.floor((ns.getServerMaxRam(servers[i])-ns.getServerUsedRam(servers[i]))/ns.getScriptRam(file));
			if(threads <= 0){continue;}
			if(ns.getHackingLevel()<ns.getServerRequiredHackingLevel(servers[i])){continue;}
			ns.exec(file,servers[i],threads);
		}
	}
}
