 /* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Game Scene


class GameScene extends Phaser.Scene {
  // create a shark sprite
  createShark () {
    const sharkXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920
    let sharkXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
    sharkXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const aShark = this.physics.add.sprite(sharkXLocation, -100, 'shark')
    aShark.body.velocity.y = 200
    aShark.body.velocity.x = sharkXVelocity
    this.sharkGroup.add(aShark)
  }
  
  // the constructord
  constructor () {
    super({ key: "gameScene" })

    // creating a variable that holds the background image
    this.background = null
    // creating a variable that holds the mermaid sprite
    this.mermaid = null
    // firing a seashell
    this.fireSeashell = false
    // initializing score to 0
    this.score = 0
    // creating a variable to hold the score text
    this.scoreText = null
    // setting the style for the score text (centred, 65px and colored white)
    this.scoreTextStyle = { font: '65px Times', fill: '#ffffff', align: 'center' }
    // initializing lives to 3
    this.lives = 3
    // creating a variable to hold the lives text
    this.livesText = null
    // setting the style for the lives text (centred, 65px and colored white)
    this.livesTextStyle = { font: '65px Times', fill: '#ffffff', align: 'center' }

    // creating a variable to hold the game over text
    this.gameOverText = null
    // setting the style for the game over text (centred, 65px and colored white)
    this.gameOverTextStyle = { font: '65px Times', fill: '#ffffff', align: 'center' }

    //initializing the variable for sharks created
    this.sharkCreated = false;
  }

  init (data) {
    // setting background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Game Scene')

    // loading image for the ocean background
    this.load.image('oceanBackground', './images/gamebackground.jpg')
    // loading image for the mermaid sprite
    this.load.image('mermaid', './images/mermaidsprite.png')
    // loading the image for the seashell
    this.load.image('seashell', './images/seashell.png')
    // loading the image for the shark
    this.load.image('shark', './images/shark.png')
    
    // loading sound effect for when you shoot the seashell
    this.load.audio('seashellSound', './sounds/seashellsound.wav')
    // loading the sound effect for when the shark is hit by the seashell
    this.load.audio('growl', './sounds/growlsound.wav')
    // loading the sound effect for when the mermaid is hit by the shark
    this.load.audio('lose', './sounds/losesound.wav')
    // loading the sound effect for when the game is over
    this.load.audio('gameOver', './sounds/gameoversound.wav')
  }

  create (data) {
    // setting the coordinates, location and size of background
    this.background = this.add.image(0, 0, 'oceanBackground').setScale(1)
    this.background.setOrigin(0, 0)

    // score counter
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    // lives counter
    this.livesText = this.add.text(400, 10, 'Lives: ' + this.lives.toString(), this.livesTextStyle)
    // mermaid counter
    this.mermaid = this.physics.add.sprite(1920 / 2, 1080 - 220, 'mermaid').setScale(0.5);
    
    // create a group for the seashells
    this.seashellGroup = this.physics.add.group()

    // create a group for the sharks
    this.sharkGroup = this.add.group()
    this.createShark()

    // collisions between seashells and sharks
    this.physics.add.collider(this.seashellGroup, this.sharkGroup, function (seashellCollide, sharkCollide) {
      // shark and seashell disappear when they collide
      sharkCollide.destroy()
      seashellCollide.destroy()
      // growling sound effect plays
      this.sound.play('growl')
      // score increases by 1 when shark gets hit by seashell
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      // new shark appears
      this.createShark()
    }.bind(this))

    // collisions between mermaid and sharks
    this.physics.add.collider(this.mermaid, this.sharkGroup, function (mermaidCollide, sharkCollide) {
      // losing sound effect plays
      this.sound.play('lose')
      // lives decrease by 1 when mermaid comes in contact with shark
      this.lives -= 1
      this.livesText.setText('Lives: ' + this.lives.toString())
      // shark disappears
      sharkCollide.destroy()
      this.mermaid.body.velocity.y = 0
      // new shark appears
      this.createShark()
      // if statement to have game over text appear after 3 lives have been lost
      if (this.lives <= 0) {
        this.sound.play('gameOver')
        mermaidCollide.destroy()
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Oh no! Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        // game over text can be clicked on to restart the game
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
        // resetting the score and lives for new round
        this.score = 0
        this.lives = 3
      }
    }.bind(this))
  }

  update (time, delta) {
    // called 60 times a second, hopefully!
    // left key, right key, space bar, and p key
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    const keyAObj = this.input.keyboard.addKey('A')

    // if a key is pressed, new seashell is created
    if (keyAObj.isDown === true) {
      if (this.sharkCreated === false) {
        this.createShark()
        this.sharkCreated = true
      }
    }

    // if statement to see if p button is no longer being held
    if (keyAObj.isUp === true) {
      this.sharkCreated = false
    }

    // mermaid moves to the left when left key is pressed
    if (keyLeftObj.isDown === true) {
      this.mermaid.x -= 15
      if (this.mermaid.x < 0) {
        // mermaid wraps around
        this.mermaid.x = 1920
      }
    }

    // mermaid moves to the right when right key is pressed
    if (keyRightObj.isDown === true) {
      this.mermaid.x += 15
      if (this.mermaid.x > 1920) {
        // mermaid wraps around
        this.mermaid.x = 0
      }
    }

    // mermaid shoots seashells when spacebar is pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireSeashell === false) {
        // fire seashell
        this.fireSeashell = true   
        const aNewSeashell = this.physics.add.sprite(this.mermaid.x, this.mermaid.y, 'seashell')
        this.seashellGroup.add(aNewSeashell)
        // seashell sound effect plays
        this.sound.play('seashellSound')
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireSeashell = false
    }

    // creating a group for the seashells
    this.seashellGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })

    // relooping the sharks to come back when they go off the screen
    this.sharkGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.y = -10
        item.x = Math.floor(Math.random() * 1920 + 1) 
      }
    })
  }
}

export default GameScene
  