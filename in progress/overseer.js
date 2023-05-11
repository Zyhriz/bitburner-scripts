/* This file relies on every server having a "hack.js", "weaken.js", and
"grow.js". It runs on the home, or any other bought server with enough
memory, and constantly executes those 3 files with maximum threads on
every server you have root access on.
*/

const securityThreshold = 1.2; // The max security above the minimum
const balanceThreshold = 0.8; // The minimum money below the max

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateServer(serverName) {
	var filesRunning = ns.ps(serverName);
	for(let i = 0; i < filesRunning.length; i++)
	{
		let fname = filesRunning[i].filename;
		if(fname=="hack.js"||fname=="grow.js"||fname=="weaken.js"){continue;}
		let fmem = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
		if(ns.getServerSecurityLevel(serverName)>ns.getServerMinSecurityLevel(serverName)*securityThreshold)
		{
			ns.exec("weaken.js",serverName,Math.floor(fmem/1.8));
		}
		else if(ns.getServerMoneyAvailable(serverName) < ns.getServerMaxMoney(serverName)*balanceThreshold)
		{
			ns.exec("grow.js",serverName,Math.floor(fmem/1.8));
		}
		else
		{
			ns.exec("hack.js",serverName,Math.floor(fmem/1.75));
		}
	}
}

export async function main(ns) {
	const servers = ns.read("servers.txt").split("\n");
	const updateMS = 5000; // Time, in ms, between updates.
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
