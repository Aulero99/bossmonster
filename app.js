const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'tank',
        damage: 5,
        maxHealth: 100,
        damageTaken: 0,
        level: 1,
        avatar: 'https://pbs.twimg.com/media/CqnP8yuVIAE-yGq.png:large'
    },
    {
        name: 'Flint Ironstag',
        type: 'aggro',
        damage: 10,
        maxHealth: 50,
        damageTaken: 0,
        level: 1,
        avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F64%2F15%2Fd3%2F6415d32fde1d3dadb654a4fc023c8b5f.png&f=1&nofb=1&ipt=a4dfca89fc398ae79e34f56065a1d427b60d969778b55bef1105fdfa3fb184e6&ipo=images'
    },
    {
        name: 'John Evergood',
        type: 'healer',
        damage: 5,
        maxHealth: 50,
        damageTaken: 0,
        level: 1,
        avatar: 'https://img.itch.zone/aW1hZ2UvMzc3NjMzLzE4OTA1NTkucG5n/347x500/wM1Aic.png'
    }
]

const bosses = [
    {
        name: 'Slimey Boy',
        avatar: 'assets/images/slimey-boy.png',
        damageTaken: 0,
        maxHealth: 100,
        damage: 5,
        reward: 5
    },
    {
        name: 'Creepy Bats',
        avatar: 'assets/images/bat.png',
        damageTaken: 0,
        maxHealth: 300,
        damage: 7,
        reward: 10
    },
    {
        name: 'Young Wolf',
        avatar: 'assets/images/wolf.png',
        damageTaken: 0,
        maxHealth: 900,
        damage: 20,
        reward: 10
    },
    {
        name: 'Shambling Skeleton',
        avatar: 'assets/images/skeleton.png',
        damageTaken: 0,
        maxHealth: 2500,
        damage: 40,
        reward: 10
    },
    {
        name: 'Nether Phantom',
        avatar: 'assets/images/phantom.png',
        damageTaken: 0,
        maxHealth: 7500,
        damage: 60,
        reward: 10
    },
    {
        name: 'Howling Werewolf',
        avatar: 'assets/images/werewolf.png',
        damageTaken: 0,
        maxHealth: 15000,
        damage: 120,
        reward: 10
    },
    {
        name: 'Dangerous Golem',
        avatar: 'assets/images/golem.png',
        damageTaken: 0,
        maxHealth: 50000,
        damage: 300,
        reward: 15
    },
    {
        name: 'Badass Dragon',
        avatar: 'assets/images/holy-dragon.png',
        damageTaken: 0,
        maxHealth: 100000,
        damage: 500,
        reward: 1000
    }
]

let damageOutput = 1
let currentBossIndex = 0
let money = 0

let attackBossInterval = setInterval(damageBoss, 1500)
let bossRetaliatesInterval = setInterval(bossAttacks, 3000)


// This function imports data from the Heros array and 
// templates it for the DOM then writes it to the page
function heroTemplate(){
    let template = ''

    heroes.forEach(h =>
    template += `

<div id="" class="col-12 col-md-6 col-lg-3 p-3 hero-container container-fluid">
    <div id="${h.name}" class="hero-card row">
        <div class="col-8">
            <div for="hero title" class="title d-flex flex-row">
                <h4 for="name" class="name">
                ${h.name}
                </h4>
            </div>
        <div for="info" class="stats">
            <div class="hitpoints d-flex flex-row">
                <p>HP: </p>
                <p id="${h.name} Health"></p>
            </div>
            <div class="level d-flex flex-row">
                <p>LVL:</p>
                <p>${h.level}</p>
            </div>
                <div class="level d-flex flex-row">
                <p>DMG:</p>
                <p>${h.damage}</p>
            </div>
        </div>
        </div>
        <div for="avatar" class="avatar col-4">
            <img src='${h.avatar}'>
        </div>
    </div>
</div>
    
 
    `)

    document.getElementById('heroBoardHTM').innerHTML = template

    for (let i = 0; i < heroes.length; i++) {
        drawHeroHealth(i) 
    }
}

function drawHeroHealth(index) {
    let hero = heroes[index]
    let hp = hero.maxHealth - hero.damageTaken

    if (hp <= 0){
        hp = 0
    }

    document.getElementById(hero.name + ' Health').innerText = hp
}

// This function imports data from the boss array and 
// templates it for the DOM then writes it to the page
function bossTemplate(){
    let template = ''
    let currentBoss = bosses[currentBossIndex]
    template += `
    <div class="col-12 boss-container" onclick="damageBoss(${currentBossIndex})">
        <div class="card boss-card">
            <div class="health">
            <div id="healthBarHTM" class="remaining"></div>
            </div>
            <h1 class="name">
                ${currentBoss.name}
            </h1>
            <div class="avatar">
                <img src="${currentBoss.avatar}">
            </div>
        </div>
    </div>
    `

    document.getElementById('bossBoardHTM').innerHTML = template
    drawBossHealth()
}

// Draws the health of the current boss to the 
// boss area
function drawBossHealth(){
    let currentBoss = bosses[currentBossIndex]
    let healthBar = ((currentBoss.maxHealth - currentBoss.damageTaken)/currentBoss.maxHealth)*100

    if (healthBar<0){
        healthBar = 0
    }

    document.getElementById('healthBarHTM').style.width = `${healthBar}%`;
}

// damages boss then rolls over to the next indexed boss on defeat
// Checks to see if final boss is defeated then ends the game if
// it has
function damageBoss(){
    let levelUp = bosses[currentBossIndex].reward
    let damage = bosses[currentBossIndex].damageTaken
    let health = bosses[currentBossIndex].maxHealth
    bosses[currentBossIndex].damageTaken += damageOutput
    drawBossHealth()

    if (damage >= health) {
        
        currentBossIndex++
        randomHeroLevelUp(levelUp)

        if(bosses.length <= currentBossIndex){
            console.log('You have defeated all the monsters');
            window.alert('You have slain all the monsters!')
            currentBossIndex = bosses.length - 1
            stopGame()
        }else{
            bossTemplate()
        }
    }
}

function bossAttacks(){
    // Spits out a random number from 0-N where N is the heroes length
    let victim = Math.floor(Math.random()*heroes.length)


    let healthCheck = heroes[victim].maxHealth - heroes[victim].damageTaken
        if(healthCheck <= 0){
            victim--
            if (victim<0){victim = 0}
        }

    let bossDamage = bosses[currentBossIndex].damage

    
    heroes[victim].damageTaken += bossDamage
    
    drawHeroHealth(victim)
    heroDamageOutput()
}

// This function imports damage date from hero array 
// and sets the damage output variable to that number
function heroDamageOutput(){
    damageOutput = 0
    for (let i = 0; i < heroes.length; i++){
        if(heroes[i].maxHealth>=heroes[i].damageTaken){
            damageOutput += heroes[i].damage
        }
    }

    if (damageOutput <= 0){
        console.log('defeat')
        window.alert('You have been slain by the monsters!')
        stopGame()
        return
    }
}

// sets all the boss damage taken to 0
function resetBosses(){
    for (let i=0; i<bosses.length; i++){
        bosses[i].damageTaken = 0
    }
    bossTemplate()
}

function resetHeroes(){
    for (let i=0; i<heroes.length; i++){
        heroes[i].damageTaken = 0
        heroes[i].level = 1
        
        // For each type of hero, sets that hero
        // back to the base values of its
        // starting level
        switch(heroes[i].type) {
            case 'tank':
                heroes[i].maxHealth = 100
                heroes[i].damage = 5
            break
            case 'aggro':
                heroes[i].maxHealth = 50
                heroes[i].damage = 10
            break
            default:
                heroes[i].maxHealth = 50
                heroes[i].damage = 5
        }
    }
    heroTemplate()
}

function randomHeroLevelUp(times){
    let target = undefined

    for (let i = 0; i < times; i++){
    target = Math.floor(Math.random()*heroes.length)
    if (heroes[target].maxHealth - heroes[target].damageTaken > 0){
        heroLevelUpCases(target)
    }
    
    }
}

function heroLevelUpCases(index) {
    
    switch(heroes[index].type) {
        case 'tank':
            heroes[index].level++
            heroes[index].maxHealth += 90
            heroes[index].damage += 5
        break
        case 'aggro':
            heroes[index].level++
            heroes[index].maxHealth += 30
            heroes[index].damage += 11
        break
        default:
            heroes[index].level++
            heroes[index].maxHealth += 40
            heroes[index].damage += 6

    }

    heroTemplate()
}

// resets all damage dealt and rolls back to
// the first index of the boss
function resetGame(){
    stopGame()
    currentBossIndex = 0
    attackBossInterval = setInterval(damageBoss, 1500)
    bossRetaliatesInterval = setInterval(bossAttacks, 3000)


    resetHeroes()
    resetBosses()
    heroDamageOutput()
}

function stopGame(){
    clearInterval(attackBossInterval)
    clearInterval(bossRetaliatesInterval)
}

heroTemplate()
bossTemplate()
heroDamageOutput()
