// Spits out a list of every server in a "servers.txt"
// Very basic, I'm aware, but it's the first thing I've written since I got back to BitBurner. Go easy on me.
var servers = [];

export async function main(ns) {
	if(ns.fileExists("servers.txt")){ns.clear("servers.txt");}
	advScan(ns,"home");
	for(var j = 0; j < servers.length; j++){ns.write("servers.txt", servers[j]+"\n", "a");}
}

async function advScan(ns,serverName) {
	let thisScan = ns.scan(serverName);
	for(var i = 0; i < thisScan.length; i++)
	{
		if(servers.indexOf(thisScan[i]) == -1)
		{
			servers.push(thisScan[i]);
			advScan(ns,thisScan[i]);
		}
	}
}
