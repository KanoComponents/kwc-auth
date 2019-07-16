const verbs = ['lively', 'psychic', 'friendly', 'french', 'international', 'elastic', 'karate', 'party', 'famous', 'hairy', 'old', 'lazer', 'volcanic', 'electric', 'sneaky', 'new', 'hissy', 'mediating', 'haunted', 'tough', 'twinkling', 'wrinkly', 'sweet', 'boiling', 'antlered', 'striped', 'spotty', 'unfortunate', 'folky', 'beautiful', 'moody', 'peacefull', 'indignant', 'bone', 'chill', 'heartbroken', 'sweet', 'worldly', 'faulty', 'partying', 'natural', 'cheeky', 'cheerful', 'chilled', 'chunky', 'cold-hearted', 'snuggling', 'colossal', 'comforting', 'grouchy', 'comic', 'compassionate', 'complex', 'considerate', 'contemporary', 'broken', 'moral', 'crazed', 'elegant', 'fancy', 'dazzling', 'magnificent', 'quaint', 'skinny', 'blue', 'red', 'green', 'fluorescent', 'icy', 'silly', 'grumpy', 'crashing', 'deafening', 'rhythmic', 'fresh', 'juicy', 'excellent', 'magnificent', 'wonderful', 'glorious', 'marvellous', 'brilliant', 'supreme', 'outstanding', 'prodigious', 'dazzling', 'remarkable', 'formidable', 'fine', 'premier', 'prime', 'unsurpassed', 'unequalled', 'unparalleled', 'unrivalled', 'unbeatable', 'peerless', 'matchless', 'singular', 'unique', 'transcendent', 'best', 'greatest', 'worthiest', 'pre-eminent', 'perfect', 'faultless', 'flawless', 'ace', 'stellar'];
const nouns = ['berry', 'squad', 'dog', 'dragon', 'patrolman', 'deer', 'hyena', 'pup', 'bug', 'louse', 'queen', 'master', 'toaster', 'legend', 'sandwich', 'lettuce', 'kitty', 'grandma', 'chef', 'cake', 'president', 'night', 'band', 'earth', 'newt', 'kitty', 'cat', 'oxygen', 'wombat', 'koala', 'croc', 'robot', 'lizard', 'king', 'octopus', 'knight', 'mango', 'mammoth', 'aardvark', 'alligator', 'alien', 'android', 'sprouts','apple','apricot','artichoke','asian-pear','asparagus','atemoya','avocado','bamboo-shoots','banana','bean-sprouts','beans','beets','belgian-endive','bell-peppers','bitter-melon','blackberries','blueberries','bok-choy','boniato','boysenberries','broccoflower','broccoli','brussels-sprouts','cabbage','cactus-pear','cantaloupe','carambola','carrots','casaba-melon','cauliflower','celery','chayote','cherimoya','cherries','coconuts','collard-greens','corn','cranberries','cucumber','dates','dried-plums','eggplant','endive','escarole','feijoa','fennel','figs','garlic','gooseberries','grapefruit','grapes','beans','onions','greens','guava','hominy','melon','lettuce','artichoke','jicama','kale','kiwifruit','kohlrabi','kumquat','leeks','lemons','lettuce','limes','longan','loquat','lychee','madarins','malanga','mandarin','mangos','mulberries','mushrooms','napa','nectarines','okra','onion','oranges','papayas','parsnip','peaches','pears','peas','peppers','persimmons','pineapple','plantains','plums','pomegranate','potatoes','prickly-pear','prunes','pummelo','pumpkin','quince','radicchio','radishes','raisins','raspberries','cabbage','rhubarb','lettuce','rutabaga','shallots','peas','spinach','sprouts','squash','strawberries','sweet-potato','tangelo','tangerines','tomatillo','tomato','turnip','fruit','chestnuts','watercress','watermelon','waxed-beans','yams','yuca','zucchini','squash','dog','puppy','turtle','rabbit','parrot','cat','kitten','goldfish','mouse','fish','hamster','cow','rabbit','ducks','shrimp','pig','goat','crab','deer','bee','sheep','fish','turkey','dove','chicken','horse','crow','peacock','dove','sparrow','goose','stork','pigeon','turkey','hawk','bald-eagle','raven','parrot','flamingo','seagull','ostrich','swallow','black-bird','penguin','robin','swan','owl','woodpecker','squirrel','dog','chimpanzee','ox','lion','panda','walrus','otter','mouse','kangaroo','goat','horse','monkey','cow','koala','mole','elephant','leopard','hippopotamus','giraffe','fox','coyote','hedgehong','sheep','deer','giraffe','woodpecker','camel','starfish','koala','alligator','owl','tiger','bear','blue-whale','coyote','chimpanzee','raccoon','lion','arctic-wolf','crocodile','dolphin','elephant','squirrel','snake','kangaroo','hippopotamus','elk','fox','gorilla','bat','hare','toad','frog','deer','rat','badger','lizard','mole','hedgehog','otter','reindeerseal','octopus','shark','seahorse','walrus','starfish','whale','penguin','jellyfish','squid','lobster','pelican','clams','seagull','dolphin','shells','sea-urchin','cormorant','otter','pelican','coral','moth','bee','butterfly','spider','ant','dragonfly','fly','mosquito','grasshopper','beetle','cockroach','centipede','worm','louse','aircraft','airplane','ambulance','auto','automobile','balloon','barge','bus','bicycle','battleship','boat','cab','car','cart','chariot','clunker','convertible','convoy','crane','cruiser','camper','carriage','catamaran','chopper','coach','wagon','coupe','cutter','carrier','chairlift','combine','cycle','driver','elevator','engine','ferry','fireboat','frigate','galleon','glider','gridlock','handcar','haul','helicopter','hull','hydrofoil','harvester','hybrid','hovercraft','hearse','jeep','jet','journey','kayak','ketch','lifeboat','lorry','motor','motorcycle','motorboat','narrowboat','oar','oxcart','paddle','passenger','propeller','pilot','parachute','plane','ride','ragtop','rocket','rudder','railroad','rover','riverboat','raft','railway','rowboat','rv','sail','scull','ship','sailboat','schooner','seaplane','segway','shuttle','satellite','scooter','sedan','sled','steamboat','surrey','sledge','snowmobile','spaceship','stroller','steamship','suv','snowplow','speedcar','subway','subcompact','submarine','taxi','tire','train','trolley','tank','tracks','tram','truck','tanker','tractor','trailer','tricycle','tugboat','unicycle','umiak','van','vessel','vespa','vehicle','wagon','warship','wheelchair','wheel','yacht','yawl','zamboni','zeppelin'];

function randomFromArray<T>(a : T[]) {
    return a[Math.floor(Math.random() * a.length)];
}

export function generateVerb() {
    return randomFromArray(verbs);
}
export function generateNoun() {
    return randomFromArray(nouns);
}


