# nodeledstripe
Install Raspberry Pi Node LED Stripe

# Install hardware
1) Aquire 3x IRFZ44N Mosfet Transistor 
2) Aquire 3x 10k Ohm Resistors
3) Aquire Protoboard, minimum size = 13x10
4) Aquire 5V LED Stripe with +5V, R, G, B connectors
5) Aquire 5V Power Supply with Connector Jack Adaptor
6) Aquire Soldering Equipment, some wires and stuff
7) Solder this:
[Wiring](/wiring.jpg)

# Install software
1) latest raspberry pi image + touch ssh
2) login, passwd, resize partition with sudo raspi-config
3) sudo apt-get update
4) sudo apt-get upgrade
5) sudo apt-get purge node nodejs npm
6) sudo apt-get install build-essential python-dev unzip wget pigpio pigpiod git
7) curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
8) sudo apt install nodejs
9) Clone this repo.
10) npm i
11) sudo node index.js

