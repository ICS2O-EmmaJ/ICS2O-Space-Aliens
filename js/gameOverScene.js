/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Game Over Scene

class GameOverScene extends Phaser.Scene {
  
  // constructor
  constructor () {
    super({ key: "gameOverScene" })

    // creating a variable to hold the background image
    this.gameOverSceneBackgroundImage = null
    // creating a variable to hold the restart button
    this.restartButton = null
    // creating a variable to hold the level two button
    this.levelTwoButton = null
    // creating a variable to hold the game over text
    this.gameOverSceneText = null
    // setting the style of the instruction text to 200px, centred and in the color white
    this.gameOverSceneTextStyle = { font: '200px Times', fill: '#000000', align: 'center' }
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Game Over Scene')
    // loading the game over scene background image of underwater landscape
    this.load.image('gameOverSceneBackground', './images/gameoverbackground.jpg')
    // loading the image of the restart button
    this.load.image('restartButton', './images/restartbutton.ico')
    // loading the image of the level 2 button
    this.load.image('levelTwoButton', './images/leveltwobutton.png')
    // loading the audio for when the button is clicked
    this.load.audio('click', './sounds/clicksound.wav')
  }

  create (data) {
    // setting coordinates, location and scale of background image
    this.gameOverSceneBackgroundImage = this.add.sprite(0, 0, 'gameOverSceneBackground').setScale(1)
    this.gameOverSceneBackgroundImage.x = 1920 / 2
    this.gameOverSceneBackgroundImage.y = 1080 / 2

    // setting coordinates, location and scale of restart button
    this.restartButton = this.add.sprite(300, 210, 'restartButton').setScale(0.8)
    // making the button clickable
    this.restartButton.setInteractive({ useHandCursor: true })
    this.restartButton.on('pointerdown', () => this.clickButton())

    // setting coordinates, location and scale of level two button
    this.levelTwoButton = this.add.sprite(1600, 250, 'levelTwoButton').setScale(0.5)
    // making the button clickable
    this.levelTwoButton.setInteractive({ useHandCursor: true })
    this.levelTwoButton.on('pointerdown', () => this.clickSecondButton())

    // adding game over text to the scene 
    this.gameOverSceneText = this.add.text(980, 400, 'Oh no! You got hit by the shark! \nClick the restart button to play again, \nor click the level 2 button for a harder game. \n(Caution: Dangerous Waters Ahead!)', this.gameOverSceneTextStyle).setOrigin(0.5).setScale(0.3)
  }

  update (time, delta) {
  }

  // when the restart button is clicked the scene switches back to the game scene and restarts
  clickButton () {
    this.sound.play('click')
    this.scene.start('gameScene')
  }
  
  // when the level two button is clicked the scene switches to the level two scene
  clickSecondButton () {
    this.sound.play('click')
    this.scene.start('levelTwoScene')
  }
}

export default GameOverScene
