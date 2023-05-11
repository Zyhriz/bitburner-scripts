/* Like the majority of my files on this topic, this file relies on a
servers.txt existing. If you need one made, check my github. ;)

Oh, and yes, I know there's like 5 cracking files. I don't know what
they're called, hence why there's only 1 thing in there so far. I'll
update this as I get through the game (or actually just get a router).
*/
export async function main(ns) {
	const servers = ns.read("servers.txt").split("\n");
	var crackers = 0;
	if(ns.fileExists("bruteSSH.exe")){crackers++;}
	for(let i = 0; i < servers.length; i++)
	{
		if(ns.getServerNumPortsRequired(servers[i]) > crackers){continue;}
    ns.brutessh(servers[i]);
		ns.nuke(servers[i]);
	}
}
