/** @param {NS} ns */
export async function main(ns) {
	const home = ns.getHostname();
	const securityThreshold = ns.getServerMinSecurityLevel(home)*1.2;
	const balThreshold = ns.getServerMaxMoney(home)*0.8;
	while(true)
	{
		if(ns.getServerSecurityLevel(home) > securityThreshold){await ns.weaken(home);}
		else if(ns.getServerMoneyAvailable(home) < balThreshold){await ns.grow(home);}
		else {await ns.hack(home);}
	}
}
