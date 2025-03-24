// Récupérer les éléments du DOM
const output = document.getElementById('output');
const input = document.getElementById('input');

// Fonction pour afficher une ligne dans le terminal
function printLine(text) {
    output.innerHTML += `<div>${text}</div>`;
    output.scrollTop = output.scrollHeight; // Faire défiler vers le bas
}

// Catalogue d'exploits pour Metasploit
const exploits = [
    { name: 'exploit/unix/webapp/php_cgi_arg_injection', description: 'PHP CGI Argument Injection' },
    { name: 'exploit/windows/smb/ms17_010_eternalblue', description: 'EternalBlue SMB Remote Code Execution' },
    { name: 'exploit/linux/http/apache_mod_cgi_bash_env', description: 'Apache mod_cgi Bash Environment Variable Injection' },
    { name: 'exploit/multi/http/struts2_code_exec', description: 'Apache Struts 2 Remote Code Execution' },
    { name: 'exploit/windows/ftp/filezilla_server_user', description: 'FileZilla Server FTP User Password Disclosure' },
];

// Fonction pour simuler des commandes
function simulateCommand(command) {
    const args = command.trim().split(' ');
    const cmd = args[0];
    const params = args.slice(1);

    switch (cmd) {
        case 'nmap':
            if (params.includes('-help')) {
                printLine('Nmap 7.94SVN ( https://nmap.org )');
                printLine('Usage: nmap [Scan Type(s)] [Options] {target specification}');
                printLine('TARGET SPECIFICATION:');
                printLine('  Can pass hostnames, IP addresses, networks, etc.');
                printLine('  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254');
                printLine('  -iL <inputfilename>: Input from list of hosts/networks');
                printLine('  -iR <num hosts>: Choose random targets');
                printLine('  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks');
                printLine('  --excludefile <exclude_file>: Exclude list from file');
                printLine('HOST DISCOVERY:');
                printLine('  -sL: List Scan - simply list targets to scan');
                printLine('  -sn: Ping Scan - disable port scan');
                printLine('  -Pn: Treat all hosts as online -- skip host discovery');
                printLine('  -PS/PA/PU/PY[portlist]: TCP SYN/ACK, UDP or SCTP discovery to given ports');
                printLine('  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes');
                printLine('  -PO[protocol list]: IP Protocol Ping');
                printLine('  -n/-R: Never do DNS resolution/Always resolve [default: sometimes]');
                printLine('  --dns-servers <serv1[,serv2],...>: Specify custom DNS servers');
                printLine('  --system-dns: Use OS\'s DNS resolver');
                printLine('  --traceroute: Trace hop path to each host');
                printLine('SCAN TECHNIQUES:');
                printLine('  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans');
                printLine('  -sU: UDP Scan');
                printLine('  -sN/sF/sX: TCP Null, FIN, and Xmas scans');
                printLine('  --scanflags <flags>: Customize TCP scan flags');
                printLine('  -sI <zombie host[:probeport]>: Idle scan');
                printLine('  -sY/sZ: SCTP INIT/COOKIE-ECHO scans');
                printLine('  -sO: IP protocol scan');
                printLine('  -b <FTP relay host>: FTP bounce scan');
                printLine('PORT SPECIFICATION AND SCAN ORDER:');
                printLine('  -p <port ranges>: Only scan specified ports');
                printLine('    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080,S:9');
                printLine('  --exclude-ports <port ranges>: Exclude the specified ports from scanning');
                printLine('  -F: Fast mode - Scan fewer ports than the default scan');
                printLine('  -r: Scan ports sequentially - don\'t randomize');
                printLine('  --top-ports <number>: Scan <number> most common ports');
                printLine('  --port-ratio <ratio>: Scan ports more common than <ratio>');
                printLine('SERVICE/VERSION DETECTION:');
                printLine('  -sV: Probe open ports to determine service/version info');
                printLine('  --version-intensity <level>: Set from 0 (light) to 9 (try all probes)');
                printLine('  --version-light: Limit to most likely probes (intensity 2)');
                printLine('  --version-all: Try every single probe (intensity 9)');
                printLine('  --version-trace: Show detailed version scan activity (for debugging)');
                printLine('SCRIPT SCAN:');
                printLine('  -sC: equivalent to --script=default');
                printLine('  --script=<Lua scripts>: <Lua scripts> is a comma separated list of');
                printLine('           directories, script-files or script-categories');
                printLine('  --script-args=<n1=v1,[n2=v2,...]>: provide arguments to scripts');
                printLine('  --script-args-file=filename: provide NSE script args in a file');
                printLine('  --script-trace: Show all data sent and received');
                printLine('  --script-updatedb: Update the script database.');
                printLine('  --script-help=<Lua scripts>: Show help about scripts.');
                printLine('           <Lua scripts> is a comma-separated list of script-files or');
                printLine('           script-categories.');
                printLine('OS DETECTION:');
                printLine('  -O: Enable OS detection');
                printLine('  --osscan-limit: Limit OS detection to promising targets');
                printLine('  --osscan-guess: Guess OS more aggressively');
                printLine('TIMING AND PERFORMANCE:');
                printLine('  Options which take <time> are in seconds, or append \'ms\' (milliseconds),');
                printLine('  \'s\' (seconds), \'m\' (minutes), or \'h\' (hours) to the value (e.g. 30m).');
                printLine('  -T<0-5>: Set timing template (higher is faster)');
                printLine('  --min-hostgroup/max-hostgroup <size>: Parallel host scan group sizes');
                printLine('  --min-parallelism/max-parallelism <numprobes>: Probe parallelization');
                printLine('  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <time>: Specifies');
                printLine('      probe round trip time.');
                printLine('  --max-retries <tries>: Caps number of port scan probe retransmissions.');
                printLine('  --host-timeout <time>: Give up on target after this long');
                printLine('  --scan-delay/--max-scan-delay <time>: Adjust delay between probes');
                printLine('  --min-rate <number>: Send packets no slower than <number> per second');
                printLine('  --max-rate <number>: Send packets no faster than <number> per second');
                printLine('FIREWALL/IDS EVASION AND SPOOFING:');
                printLine('  -f; --mtu <val>: fragment packets (optionally w/given MTU)');
                printLine('  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys');
                printLine('  -S <IP_Address>: Spoof source address');
                printLine('  -e <iface>: Use specified interface');
                printLine('  -g/--source-port <portnum>: Use given port number');
                printLine('  --proxies <url1,[url2],...>: Relay connections through HTTP/SOCKS4 proxies');
                printLine('  --data <hex string>: Append a custom payload to sent packets');
                printLine('  --data-string <string>: Append a custom ASCII string to sent packets');
                printLine('  --data-length <num>: Append random data to sent packets');
                printLine('  --ip-options <options>: Send packets with specified ip options');
                printLine('  --ttl <val>: Set IP time-to-live field');
                printLine('  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address');
                printLine('  --badsum: Send packets with a bogus TCP/UDP/SCTP checksum');
                printLine('OUTPUT:');
                printLine('  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt kIddi3,');
                printLine('     and Grepable format, respectively, to the given filename.');
                printLine('  -oA <basename>: Output in the three major formats at once');
                printLine('  -v: Increase verbosity level (use -vv or more for greater effect)');
                printLine('  -d: Increase debugging level (use -dd or more for greater effect)');
                printLine('  --reason: Display the reason a port is in a particular state');
                printLine('  --open: Only show open (or possibly open) ports');
                printLine('  --packet-trace: Show all packets sent and received');
                printLine('  --iflist: Print host interfaces and routes (for debugging)');
                printLine('  --append-output: Append to rather than clobber specified output files');
                printLine('  --resume <filename>: Resume an aborted scan');
                printLine('  --noninteractive: Disable runtime interactions via keyboard');
                printLine('  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML');
                printLine('  --webxml: Reference stylesheet from Nmap.Org for more portable XML');
                printLine('  --no-stylesheet: Prevent associating of XSL stylesheet w/XML output');
                printLine('MISC:');
                printLine('  -6: Enable IPv6 scanning');
                printLine('  -A: Enable OS detection, version detection, script scanning, and traceroute');
                printLine('  --datadir <dirname>: Specify custom Nmap data file location');
                printLine('  --send-eth/--send-ip: Send using raw ethernet frames or IP packets');
                printLine('  --privileged: Assume that the user is fully privileged');
                printLine('  --unprivileged: Assume the user lacks raw socket privileges');
                printLine('  -V: Print version number');
                printLine('  -h: Print this help summary page.');
                printLine('EXAMPLES:');
                printLine('  nmap -v -A scanme.nmap.org');
                printLine('  nmap -v -sn 192.168.0.0/16 10.0.0.0/8');
                printLine('  nmap -v -iR 10000 -Pn -p 80');
                printLine('SEE THE MAN PAGE (https://nmap.org/book/man.html) FOR MORE OPTIONS AND EXAMPLES');
            }  else if (params.includes('-sV') && params.includes('192.168.1.0/24')) {
                printLine('Starting Nmap 7.94SVN ( https://nmap.org )');
                printLine('Nmap scan report for 192.168.1.1');
                printLine('PORT   STATE SERVICE VERSION');
                printLine('22/tcp open  ssh     OpenSSH 7.6p1');
                printLine('80/tcp open  http    Apache httpd 2.4.29');
                printLine('Nmap scan report for 192.168.1.2');
                printLine('PORT   STATE SERVICE VERSION');
                printLine('22/tcp open  ssh     OpenSSH 7.6p1');
                printLine('80/tcp open  http    Apache httpd 2.4.29');
                printLine('Nmap scan report for 192.168.1.3');
                printLine('PORT   STATE SERVICE VERSION');
                printLine('22/tcp open  ssh     OpenSSH 7.6p1');
                printLine('80/tcp open  http    Apache httpd 2.4.29');
                printLine('Nmap done: 256 IP addresses (3 hosts up) scanned in 5.23 seconds');
            } else {
                printLine('Commande Nmap non reconnue. Tapez "nmap -help" pour voir les options.');
            }
            break;

            case 'searchsploit':
                if (params[0] === 'Apache' && params[1] === '2.4.29') {
                    printLine('---------------------------------------------- ---------------------------------');
                    printLine(' Exploit Title                                |  Path');
                    printLine('---------------------------------------------- ---------------------------------');
                    printLine('Apache + PHP < 5.3.12 / < 5.4.2 - cgi-bin Rem | php/remote/29290.c');
                    printLine('Apache + PHP < 5.3.12 / < 5.4.2 - Remote Code | php/remote/29316.py');
                    printLine('Apache 2.4.17 < 2.4.38 - \'apache2ctl graceful | linux/local/46676.php');
                    printLine('Apache CXF < 2.5.10/2.6.7/2.7.4 - Denial of S | multiple/dos/26710.txt');
                    printLine('Apache mod_ssl < 2.8.7 OpenSSL - \'OpenFuck.c\' | unix/remote/21671.c');
                    printLine('Apache mod_ssl < 2.8.7 OpenSSL - \'OpenFuckV2. | unix/remote/47080.c');
                    printLine('Apache mod_ssl < 2.8.7 OpenSSL - \'OpenFuckV2. | unix/remote/764.c');
                    printLine('Apache OpenMeetings 1.9.x < 3.1.0 - \'.ZIP\' Fi | linux/webapps/39642.txt');
                    printLine('Apache Tomcat < 5.5.17 - Remote Directory Lis | multiple/remote/2061.txt');
                    printLine('Apache Tomcat < 6.0.18 - \'utf8\' Directory Tra | multiple/remote/6229.txt');
                    printLine('Apache Tomcat < 6.0.18 - \'utf8\' Directory Tra | unix/remote/14489.c');
                    printLine('Apache Tomcat < 9.0.1 (Beta) / < 8.5.23 / < 8 | jsp/webapps/42966.py');
                    printLine('Apache Tomcat < 9.0.1 (Beta) / < 8.5.23 / < 8 | windows/webapps/42953.txt');
                    printLine('Apache Xerces-C XML Parser < 3.1.2 - Denial o | linux/dos/36906.txt');
                    printLine('Webfroot Shoutbox < 2.32 (Apache) - Local Fil | linux/remote/34.pl');
                    printLine('---------------------------------------------- ---------------------------------');
                    printLine('Shellcodes: No Results');
                } else {
                    printLine('Usage: searchsploit <terme>');
                }
                break;

        case 'msfconsole':
            printLine('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
            printLine('MMMMMMMMMMM                MMMMMMMMMM');
            printLine('MMMNl  MMMMM             MMMMM  JMMMM');
            printLine('MMMNl  MMMMMMMN       NMMMMMMM  JMMMM');
            printLine('MMMNl  MMMMMMMMMNmmmNMMMMMMMMM  JMMMM');
            printLine('MMMNI  MMMMMMMMMMMMMMMMMMMMMMM  jMMMM');
            printLine('MMMNI  MMMMMMMMMMMMMMMMMMMMMMM  jMMMM');
            printLine('MMMNI  MMMMM   MMMMMMM   MMMMM  jMMMM');
            printLine('MMMNI  MMMMM   MMMMMMM   MMMMM  jMMMM');
            printLine('MMMNI  MMMNM   MMMMMMM   MMMMM  jMMMM');
            printLine('MMMNI  WMMMM   MMMMMMM   MMMM#  JMMMM');
            printLine('MMMMR  ?MMNM             MMMMM .dMMMM');
            printLine('MMMMNm `?MMM             MMMM` dMMMMM');
            printLine('MMMMMMN  ?MM             MM?  NMMMMMN');
            printLine('MMMMMMMMNe                 JMMMMMNMMM');
            printLine('MMMMMMMMMMNm,            eMMMMMNMMNMM');
            printLine('MMMMNNMNMMMMMNx        MMMMMMNMMNMMNM');
            printLine('MMMMMMMMNMMNMMMMm+..+MMNMMNMNMMNMMNMM');
            printLine('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
            printLine('       =[ metasploit v6.3.0-dev      ]');
            printLine('+ -- --=[ 2291 exploits - 1205 auxiliary - 404 post       ]');
            printLine('+ -- --=[ 867 payloads - 45 encoders - 11 nops            ]');
            printLine('+ -- --=[ 9 evasion                                       ]');
            printLine('');
            printLine('msf6 > Tapez "search <terme>" pour rechercher des exploits.');
            printLine('MMMN$                           vMMMM');
            if (params[0] === 'search') {
                const searchTerm = params.slice(1).join(' ');
                if (searchTerm) {
                    printLine(`Recherche d'exploits pour : ${searchTerm}`);
                    const results = exploits.filter(exploit =>
                        exploit.name.includes(searchTerm) || exploit.description.includes(searchTerm)
                    );
                    if (results.length > 0) {
                        results.forEach(exploit => {
                            printLine(`${exploit.name} - ${exploit.description}`);
                        });
                    } else {
                        printLine('Aucun exploit trouvé.');
                    }
                } else {
                    printLine('Usage: search <terme>');
                }
            } else {
                printLine('Starting Metasploit Framework...');
                printLine('msf6 > Tapez "search <terme>" pour rechercher des exploits.');
            }
            break;

        case 'cat':
            if (params[0] === 'server_dump.php') {
                printLine('<?php');
                printLine('// server_dump.php');
                printLine('echo "Lien vers l\'autre serveur : https://exemple.com";');
                printLine('?>');
            } else {
                printLine('Fichier non trouvé.');
            }
            break;

        case 'help':
            printLine('Commandes disponibles :');
            printLine('- nmap : Simuler un scan Nmap');
            printLine('- msfconsole : Simuler une attaque Metasploit');
            printLine('- help : Afficher cette aide');
            break;

        default:
            printLine(`Commande inconnue : ${command}`);
            break;
    }
}

// Gérer la saisie de l'utilisateur
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value;
        printLine(`$ ${command}`); // Afficher la commande tapée
        simulateCommand(command);  // Simuler la commande
        input.value = '';         // Effacer l'entrée
    }
});