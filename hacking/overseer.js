/* This file relies on every server having a "hack.js", "weaken.js", and
"grow.js". It runs on the home, or any other bought server with enough
memory, and constantly executes those 3 files with maximum threads on
every server you have root access on, in attempts to drain every server
on its own device.

Oh, this is important: All hack.js, weaken.js, and grow.js are, are just
ns.<wtv the file name says it does>(ns.getHostname());
No other fancy stuff. That increases memory.
*/

const securityThreshold = 1.2; // The max security above the minimum
const balanceThreshold = 0.8; // The minimum money below the max

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateServer(ns,serverName) {
	if(ns.getServerMaxMoney(serverName) == 0){return;}
	let fmem = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
	if(fmem < 1.8)
	{
		ns.print(serverName+" doesn't have enough free memory. Moving on...");
		return;
	}
	if(ns.getServerSecurityLevel(serverName)>ns.getServerMinSecurityLevel(serverName)*securityThreshold)
	{
		ns.exec("weaken.js",serverName,Math.floor(fmem/1.8));
		ns.toast("Weakening "+serverName+" in: "+(ns.getHackTime(serverName)/1000).toFixed(0)+"s","info",6000);
	}
	else if(ns.getServerMoneyAvailable(serverName) < ns.getServerMaxMoney(serverName)*balanceThreshold)
	{
		ns.exec("grow.js",serverName,Math.floor(fmem/1.8));
		ns.toast("Growing "+serverName+" in: "+(ns.getHackTime(serverName)/1000).toFixed(0)+"s","info",6000);
	}
	else
	{
		if(ns.getHackingLevel() < ns.getServerRequiredHackingLevel(serverName)){return;}
		ns.toast("Hacking "+serverName+" in: "+(ns.getHackTime(serverName)/1000).toFixed(0)+"s","success",8000);
		ns.exec("hack.js",serverName,Math.floor(fmem/1.75));
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
			if(servers[i] == "home"){continue;}
			if(ns.hasRootAccess(servers[i]) == false){continue;}
			updateServer(ns,servers[i]);
		}
	}
}