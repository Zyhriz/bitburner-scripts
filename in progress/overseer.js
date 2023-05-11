/* This file relies on every server having a "hack.js", "weaken.js", and
"grow.js". It runs on the home, or any other bought server with enough
memory, and constantly executes those 3 files with maximum threads on
every server you have root access on.
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateServer(serverName) {
	
}

export async function main(ns) {
	const securityThreshold = 1.2; // The max security above the minimum
	const balanceThreshold = 0.8; // The minimum money below the max
	const servers = ns.read("servers.txt").split("\n");
	const updateMS = 400; // Time, in ms, between updates.
	while(true)
	{
		await sleep(updateMS);
		ns.print("Updating...");
		for(let i = 0; i < servers.length; i++)
		{
			if(!ns.hasRootAccess(servers[i])){continue;}
			updateServer(servers[i]);
		}
	}
}