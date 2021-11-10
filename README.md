# Roulette
Roulette is a casino game named after the French word meaning little wheel which was likely developed from the Italian game Biribi. In the game, a player may choose to place a bet on a single number, various groupings of numbers, the color red or black, whether the number is odd or even, or if the numbers are high (19–36) or low (1–18).

To determine the winning number, a croupier spins a wheel in one direction, then spins a ball in the opposite direction around a tilted circular track running around the outer edge of the wheel. The winnings are then paid to anyone who has placed a successful bet.
Source: https://en.wikipedia.org/wiki/Roulette

# Rules for playing roulette
○ Dealer opens a game
○ Multiple players can bet on which number the ball will land
○ Dealer closes the game and throws the ball

# Rewards
○ Players who bet on the correct number will get double the bet amount as reward
○ Other players lose the money to the casino

# Stack
- Language: Node Js 12.x+
- DB: Mongo 4.x+

# Steps to run
- git clone https://github.com/nirmalrevhari/roulette.git
- cd roulette
- npm install
- node server.js
# API's
- API Dump: /Insomnia_API_Collection.json

- Base path: /api/v1
- User
    - Register:             /users/register
    - Enter casino:         /users/:id/enterCasino
    - Recharge balance:     /users/:id/recharge
    - List bettable games:  /users/:id/listGames
    - Bet on game:          /users/:id/bet
- Casino
    - Register:             /casino/register
    - Recharge balance:     /casino/:id/recharge
- Dealer
    - Add:                  /dealer
    - List:                 /dealer/list/:casinoId
    - Start game:           /dealer/:id/startGame
    - Stop game:            /dealer/:id/stopGame
    - Throw ball:           /dealer/:id/throwBall