# nodeledstripe
Install Raspberry Pi Node LED Stripe

Everything on your own risk. You can damage your hardware with this.

# Install hardware
1) Aquire Raspberry Pi
2) Aquire 3x IRFZ44N Mosfet Transistor 
3) Aquire 3x 10k Ohm Resistors
4) Aquire Protoboard, minimum size = 13x10
5) Aquire 5V LED Stripe with +5V, R, G, B connectors
6) Aquire 5V Power Supply with Connector Jack Adaptor
7) Aquire Soldering Equipment, some wires and stuff
8) Solder this: [Wiring](/wiring.png)
9) Double check all connections and solderings for broken connections or short circuits. Be careful.
9) Connect Raspberry Pi and LED Stripe as shown. Be careful.

# Install software
1) latest raspberry pi image + touch ssh
2) login, passwd, resize partition with sudo raspi-config
3) sudo apt-get update
4) sudo apt-get upgrade
5) sudo apt-get purge node nodejs npm
6) sudo apt-get install build-essential python-dev unzip wget pigpio pigpiod git
7) curl -sL https://deb.nodesource.com/setup_12.x | sudo bash - # This might be different on your system, some Pis only support older versions. (e.g. uname -m = armv6l needs to download the tarball instead) More info: https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/
8) sudo apt install nodejs
9) Clone this repo.
10) npm i
11) sudo node index.js

