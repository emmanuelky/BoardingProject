// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/boarding', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let games = [
  {
    name: "Risk",
    genre: "War",
    _event: users[0]._id,
    description:
      "The game board is a map of 6 continents divided into 42 territories. Each continent is a different color and exists of 4 to 12 territories. The numbers along the bottom (southern) edge of the board indicate the number of armies you will receive for a set of cards you trade in."
  },
  {
    name: "Pictionary",
    genre: "Guessing",
    _event: users[0]._id,
    description:
      'Pictionary is a charades-inspired word-guessing game invented by Robert Angel. The game consists in Each team moves a piece on a game board formed by a sequence of squares. Each square has a letter or shape identifying the type of picture to be drawn on it. The objective is to be the first team to reach the last space on the board. To achieve this a player must guess the word or phrase being drawn by their partner, or if the player lands on an "all play" square, one player from each team attempts to illustrate the same concept simultaneously, with the two teams racing to guess first. The first player to land and guess correctly at the finish wins.'
  },
  {
    name: "Dixit",
    genre: "Storytelling",
    _event: users[0]._id,
    description:
      "Each player starts the game with six random cards. Players then take turns being the storyteller. The player whose turn it is to be storyteller looks at the six images in his or her hand. From one of these, he or she makes up a sentence or phrase that might describe it and says it out loud (without showing the card to the other players). Each other player then selects from among their own six cards the one that best matches the sentence given by the storyteller. Then, each player gives their selected card to the storyteller, without showing it to the others. The storyteller shuffles his or her chosen card with the cards received from the other players, and all cards are then dealt face up. The players (except for the storyteller) then secretly guess which picture was the storyteller's, using numbered voting chips."
  },
  {
    name: "Scrabble",
    genre: "Word",
    _event: users[0]._id,
    description:
      'The game is played by two to four players on a square board with a 15×15 grid of cells (individually known as "squares"), each of which accommodates a single letter tile. In official club and tournament games, play is between two players or, occasionally, between two teams each of which collaborates on a single rack. The board is marked with "premium" squares, which multiply the number of points awarded: eight dark red "triple-word" squares, 17 pale red "double-word" squares, of which one, the center square (H8), is marked with a star or other symbol; 12 dark blue "triple-letter" squares, and 24 pale blue "double-letter" squares. In 2008, Hasbro changed the colors of the premium squares to orange for TW, red for DW, blue for DL, and green for TL, but the original premium square color scheme is still preferred for Scrabble boards used in tournaments'
  },
  {
    name: "Monopoly",
    genre: "Economic Simulation",
    _event: users[0]._id,
    description:
      "Monopoly is a board game in which players roll two six-sided dice to move around the game board, buying and trading properties, and developing them with houses and hotels. Players collect rent from their opponents, with the goal being to drive them into bankruptcy. Money can also be gained or lost through Chance and Community Chest cards, and tax squares; players can end up in jail, which they cannot move from until they have met one of several conditions. The game has numerous house rules, and hundreds of different editions exist, as well as many spin-offs and related media. Monopoly has become a part of international popular culture, having been licensed locally in more than 103 countries and printed in more than 37 languages."
  },
  {
    name: "Trivial Pursuit",
    genre: "Trivia",
    _event: users[0]._id,
    description:
      "The object of the game is to move around the board by correctly answering trivia questions. Questions are split into six categories, with each one having its own color to readily identify itself; in the classic version of Trivial Pursuit, these are Geography (blue), Entertainment (pink), History (yellow), Arts & Literature (originally brown, later purple), Science & Nature (green), and Sports & Leisure (orange). The game includes a board, playing pieces, question cards, a box, small plastic wedges to fit into the playing pieces, and a die."
  },
  {
    name: "Hoity Toity",
    genre: "Auction",
    _event: users[0]._id,
    description:
      "The players in the game represent the members of the pretentious Antique Club. Their goal in life is to have a better collection of old stuff than every other member in the club. There are two options every turn: 1) to the Auction House to bid on an antique, or 2) to a manor house to participate in a competitive exhibit. The outcome of the players actions depends on the choices and card play of the other players in the same location. The game therefore includes a considerable bluffing component."
  },
  {
    name: "Pandemic",
    genre: "Cooperative",
    _event: users[0]._id,
    description:
      "The goal of Pandemic is for the players, in their randomly selected roles, to work cooperatively to stop the spread of four diseases and cure them before a pandemic occurs. Pandemic setup consists of a game board representing a network connecting 48 cities on the map of the earth, two decks of cards (Player cards and Infection cards), four colors of cubes (each representing a different disease), six Research Stations, and a pawn for each player. The Player cards include cards with each city name (the same as those on the board); Special Event cards, which can be played at specific times to take beneficial actions; and Epidemic cards. Infection cards consist of one card for each city on the board and a color of the disease that will start there. At the start of the game, Infection cards are randomly drawn to populate the board with infections, from 1 to 3 cubes for a number of cities."
  },
  {
    name: "Pitch Car",
    genre: "Dexterity",
    _event: users[0]._id,
    description:
      "PitchCar is a dexterity game where large, wooden, puzzle-like pieces are used to construct a race track that looks very similar to a slot car track when finished. But instead of using electrons, players use finger-flicks to send small pucks around the track, a la Carrom."
  },
  {
    name: "Mastermind",
    genre: "Deduction",
    _event: users[0]._id,
    description:
      "The two players decide in advance how many games they will play, which must be an even number. One player becomes the codemaker, the other the codebreaker. The codemaker chooses a pattern of four code pegs. Duplicates and blanks are allowed depending on player choice, so the player could even choose four code pegs of the same color or four blanks. In the instance that blanks are not elected to be a part of the game, the codebreaker may not use blanks in order to establish the final code. The chosen pattern is placed in the four holes covered by the shield, visible to the codemaker but not to the codebreaker."
  },
  {
    name: "Cleopatra and the Society of Architects",
    genre: "Educational",
    _event: users[0]._id,
    description:
      "Players take turns collecting resources or building pieces of the temple, thereby earning talents. The game can be played by 3-5 players, and takes about an hour to play."
  },
  {
    name: "Shadows over Camelot",
    genre: "Fantasy",
    _event: users[0]._id,
    description:
      "Shadows over Camelot is a cooperative board game, a genre in which players work together in order to try to defeat a game system which itself is moving the game toward defeat for all the players. However, there is a chance that one knight is secretly a traitor, plotting the downfall of the others loyal to Camelot. The existence of the traitor turns a fairly simple game system into a hotbed of paranoia and accusation."
  },
  {
    name: "Diplomacy",
    genre: "Negotiation",
    _event: users[0]._id,
    description:
      'Diplomacy proceeds by seasons, beginning in the year 1901, with each year divided into two main seasons: the "Spring" and "Autumn/Fall" moves. Each season is further divided into negotiation and movement phases, followed by retreat or disband adjustments and an end-of-the-year Winter phase of new builds or removals following the Autumn adjustments.'
  },
  {
    name: "Balloon Cup",
    genre: "Non competitive",
    _event: users[0]._id,
    description:
      "In Balloon Cup, the players compete in several short balloon flights (hops) to collect the colored cubes associated with each hop. Four landscape cards – two plains alternating with two mountains – are laid out, and 1, 2, 3, or 4 cubes in assorted colors (gray, blue, green, yellow, red) are added to these cards. From a hand of eight balloon cards, you must try to pass each landscape by adding cards matching the colored blocks onto their side of table, although winds (and cunning) may occasionally cause them to play on their opponents side – a move that can really ruin the opponents plans."
  },
  {
    name: "Dots and Boxes",
    genre: "Paper and Pencil",
    _event: users[0]._id,
    description:
      "For most novice players, the game begins with a phase of more-or-less randomly connecting dots, where the only strategy is to avoid adding the third side to any box. This continues until all the remaining (potential) boxes are joined together into chains – groups of one or more adjacent boxes in which any move gives all the boxes in the chain to the opponent. At this point, players typically take all available boxes, then open the smallest available chain to their opponent. For example, a novice player faced with a situation like position 1 in the diagram on the right, in which some boxes can be captured, may take all the boxes in the chain, resulting in position 2. But, with their last move, they have to open the next, larger chain, and the novice loses the game."
  },
  {
    name: "Ricochet Robot",
    genre: "Puzzle",
    _event: users[0]._id,
    description:
      "The board consists of four double-sided quarters, each with a hole in a corner; these corners meet in the middle of the board, where a plastic piece with four stubs holds them in place.Board quarters can be permuted and flipped over to give 96 different board arrangements. There are also 17 chips, 16 with a symbol on a colored background and one multicolored corresponding exactly to a field on the board. At the beginning of play, four colored robots (also matching the colored fields) are placed randomly on the board and one of the chips is turned over."
  },
  {
    name: "Backgammon",
    genre: "Race",
    _event: users[0]._id,
    description:
      "To start the game, each player rolls one die, and the player with the higher number moves first using the numbers shown on both dice. If the players roll the same number, they must roll again. Both dice must land completely flat on the right-hand side of the gameboard. The players then take alternate turns, rolling two dice at the beginning of each turn."
  },
  {
    name: "Carcassonne",
    genre: "Tile",
    _event: users[0]._id,
    description:
      "The game board is a medieval landscape built by the players as the game progresses. The game starts with a single terrain tile face up and 71 others shuffled face down for the players to draw from. On each turn a player draws a new terrain tile and places it adjacent to tiles that are already face up. The new tile must be placed in a way that extends features on the tiles it touches: roads must connect to roads, fields to fields, and cities to cities."
  },
  {
    name: "Catan",
    genre: "Eurogame",
    _event: users[0]._id,
    description:
      "The players in the game represent settlers establishing colonies on the island of Catan. Players build settlements, cities, and roads to connect them as they settle the island. The game board, which represents the island, is composed of hexagonal tiles (hexes) of different land types, which are laid out randomly at the beginning of each game.[4] Newer editions of the game began to depict a fixed layout in their manual, which has been proven by computer simulations to be fairly even-handed,[citation needed] and recommend this to be used by beginners. In 2016, editions of the game were released with a conventional fixed layout board in this configuration, the hexes of which cannot be rearranged."
  },
  {
    name: "Cluedo",
    genre: "Murder mystery",
    _event: users[0]._id,
    description:
      "On the game plan is the floor plan of a house with nine rooms and the hallway. In this house is Dr. med. Black (also Count Eutin) has been murdered and all players take over the role of a detective in the course of the game . At the beginning, one card is drawn face-down from the stacks of cards of suspects, murder tools, and murder rooms. These must be determined during the game. All other cards are distributed to the other players. These can now by skillful combined suspicion, which they always present to the other players, learn which card they have. This requires everyone to draw conclusions about the correct killer, the murder weapon and the crime scene. The one who can answer these three questions correctly first has won. Who, however, oneraises false accusation , retires. There are a total of 324 different solution combinations with six suspects, six weapons and nine rooms."
  },
  {
    name: "Connect Four",
    genre: "Captain's Mistress",
    _event: users[0]._id,
    description:
      "gameplay example (right), shows the first player starting Connect Four by dropping one of his/her yellow discs into the center column of an empty game board. The two players then alternate turns dropping one of their discs at a time into an unfilled column, until the second player, with red discs, achieves a diagonal four in a row, and wins the game. For games where the board fills up before either player achieves four in a row, then the games are a draw."
  },
  {
    name: "Battleship",
    genre: "Guessing",
    _event: users[0]._id,
    description:
      "The game is played on four grids, two for each player. The grids are typically square – usually 10×10 – and the individual squares in the grid are identified by letter and number. On one grid the player arranges ships and records the shots by the opponent. On the other grid the player records their own shots. Before play begins, each player secretly arranges their ships on their primary grid. Each ship occupies a number of consecutive squares on the grid, arranged either horizontally or vertically. The number of squares for each ship is determined by the type of the ship. The ships cannot overlap (i.e., only one ship can occupy any given square in the grid). The types and numbers of ships allowed are the same for each player. These may vary depending on the rules."
  },
  {
    name: "Battleship",
    genre: "Guessing",
    _event: users[0]._id,
    description:
      "The game is played on four grids, two for each player. The grids are typically square – usually 10×10 – and the individual squares in the grid are identified by letter and number. On one grid the player arranges ships and records the shots by the opponent. On the other grid the player records their own shots. Before play begins, each player secretly arranges their ships on their primary grid. Each ship occupies a number of consecutive squares on the grid, arranged either horizontally or vertically. The number of squares for each ship is determined by the type of the ship. The ships cannot overlap (i.e., only one ship can occupy any given square in the grid). The types and numbers of ships allowed are the same for each player. These may vary depending on the rules."
  },
  {
    name: "Guess who?",
    genre: "Guessing",
    _event: users[0]._id,
    description:
      "Each player starts the game with a board that includes cartoon images of 24 people and their first names with all the images standing up. Each player selects a card of their choice from a separate pile of cards containing the same 24 images. The object of the game is to be the first to determine which card one's opponent has selected. Players alternate asking various yes or no questions to eliminate candidates, such as Does your person wear glasses? The player will then eliminate candidates (based on the opponent's response) by flipping those images down until all but one is left."
  },
  {
    name: "Blokus",
    genre: "Strategy",
    _event: users[0]._id,
    description:
      "In the two-player game, each player has two sets of 21 pieces ( polyominos ) made up of small squares. One player has blue and red stones, the other yellow and green ones. Each shape, consisting of 1-5 squares, occurs exactly once in each color: 1 square, 1 domino, 2 triominos, 5 quadraminos and 12 pentominos. The board consists of 20 × 20 square pits into which the game pieces fit exactly."
  },
  {
    name: "Dominoes",
    genre: "Tile",
    _event: users[0]._id,
    description:
      "The player with the highest double leads with that double, for example double-six. If no one has it, the next-highest double is called: double-five?, then double-four?, etc. until the highest double in any of the players' hands is played. If no player has an opening double, the next heaviest domino in the highest suit is called - six-five?, six-four?. In some variants, players take turns picking dominoes from the stock until an opening double is picked and played. In other variants, the hand is reshuffled and each player picks seven dominoes. After the first hand, the winner (or winning team) of the previous hand is allowed to pick first and begins by playing any domino in his or her hand."
  },
  {
    name: "Chess",
    genre: "Strategy",
    _event: users[0]._id,
    description:
      "Chess is a two-player strategy board game played on a chessboard, which is a checkered gameboard with 64 squares arranged in an eight-by-eight grid. It is one of the world's most popular games, played by millions of people worldwide in homes, parks, clubs, online, by correspondence, and in tournaments. It relies on using strategies and tactics to win, so there is a lot of brain power involved."
  }
];

  User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})