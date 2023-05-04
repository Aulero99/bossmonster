const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        maxHealth: 100,
        damageTaken: 0,
        level: 6,
        gold: 0,
        avatar: 'https://pbs.twimg.com/media/CqnP8yuVIAE-yGq.png:large'
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        maxHealth: 50,
        damageTaken: 0,
        level: 6,
        gold: 0,
        avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F64%2F15%2Fd3%2F6415d32fde1d3dadb654a4fc023c8b5f.png&f=1&nofb=1&ipt=a4dfca89fc398ae79e34f56065a1d427b60d969778b55bef1105fdfa3fb184e6&ipo=images'
    },
    {
        name: 'John Evergood',
        type: 'human',
        damage: 10,
        maxHealth: 50,
        damageTaken: 0,
        level: 6,
        gold: 0,
        avatar: 'https://img.itch.zone/aW1hZ2UvMzc3NjMzLzE4OTA1NTkucG5n/347x500/wM1Aic.png'
    }
]

const bosses = [
    {
        name: 'Slimey Boy',
        avatar: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/01437ffdf25c995.png',
        damageTaken: 0,
        maxHealth: 100,
        damage: 5,
        level: 1
    },
    {
        name: 'Dangerous Golem',
        avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fterraria_gamepedia%2Fimages%2Fc%2Fce%2FGolem.png%2Frevision%2Flatest%2Fscale-to-width-down%2F212%3Fcb%3D20200602094604&f=1&nofb=1&ipt=af45f688c876eb817f19e772832292ca75ee098b3328448a4cf4015fc5e139c0&ipo=images',
        damageTaken: 0,
        maxHealth: 1000,
        damage: 50,
        level: 50
    },
    {
        name: 'Badass Dragon',
        avatar: 'https://vignette.wikia.nocookie.net/terrabattle/images/9/99/8-Bit_Holy_Dragon.png/revision/latest?cb=20170615183413',
        damageTaken: 0,
        maxHealth: 10000,
        damage: 500,
        level: 100
    }
]

let damageOutput = 1
let currentBossIndex = 0


// This function imports data from the Heros array and 
// templates it for the DOM then writes it to the page
function heroTemplate(){
    let template = ''
    heroes.forEach(d =>
    template += `
    <div id="" class="col-6 col-md-4 p-3 hero-container">
                    <div class="hero-card">
                        <div for="hero title" class="title d-flex flex-row">
                            <h4 for="name" class="name">
                                ${d.name}
                            </h4>
                            <div for="avatar" class="avatar">
                                <img src='${d.avatar}'>
                            </div>
                        </div>
                        <div for="info" class="stats">
                            <div class="hitpoints d-flex flex-row">
                                <p>HP: </p>
                                <p>${d.maxHealth}</p>
                            </div>
                            <div class="gold d-flex flex-row">
                                <p>GOLD:</p>
                                <p>${d.gold}</p>
                            </div>
                            <div class="level d-flex flex-row">
                                <p>LVL:</p>
                                <p>${d.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
    `)

    document.getElementById('heroBoardHTM').innerHTML = template
    heroDamageOutput()
}

// This function imports data from the boss array and 
// templates it for the DOM then writes it to the page
// the parameter is the index of the boss being written
// damage is the amount being dealt to boss
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

function drawBossHealth(){
    let currentBoss = bosses[currentBossIndex]
    let healthBar = ((currentBoss.maxHealth - currentBoss.damageTaken)/currentBoss.maxHealth)*100
    document.getElementById('healthBarHTM').style.width = `${healthBar}%`;
}

// damages boss then rolls over to the next boss on defeat
function damageBoss(){
    bosses[currentBossIndex].damageTaken += damageOutput
    drawBossHealth()

    // NOTE probable issue in function below but it works currently
    if (bosses[currentBossIndex].damageTaken >= bosses[currentBossIndex].maxHealth) {
        bosses[currentBossIndex].damageTaken = bosses[currentBossIndex].maxHealth
        currentBossIndex++
        bossTemplate()
    }
}

// This function imports damage date from hero array 
// and sets the damage ouput variable to that number
function heroDamageOutput(){
    damageOutput = 0
    heroes.forEach(h => damageOutput += h.damage)
}

function resetGame(){

    for (let i=0; i<heroes.length; i++){
        heroes[i].damageTaken = 0
    }

    for (let i=0; i<bosses.length; i++){
        bosses[i].damageTaken = 0
    }
    
    currentBossIndex = 0

    heroTemplate()
    bossTemplate()
    heroDamageOutput()
}

heroTemplate()
bossTemplate()

setInterval(damageBoss, 1500)

