/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Second Game Over Scene

class SecondGameOverScene extends Phaser.Scene {
  
  // constructor
  constructor () {
    super({ key: "secondGameOverScene" })

    // creating a variable to hold the background image
    this.secondGameOverSceneBackgroundImage = null
    // creating a variable to hold the restart button
    this.restartButton = null
    // creating a variable to hold the menu button
    this.menuButton = null
    // creating a variable to hold the game over text
    this.gameOverSceneText = null
    // setting the style of the instruction text to 200px, centred and in the color white
    this.gameOverSceneTextStyle = { font: '200px Times', fill: '#ffffff', align: 'center' }
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Second Game Over Scene')
    // loading the game over scene background image of underwater landscape
    this.load.image('secondGameOverSceneBackground', './images/secondgameoverbackground.jpg')
    // loading the image of the restart button
    this.load.image('homeButton', './images/homebutton.png')
    // loading the image of the level 2 button
    this.load.image('restartButton', './images/restartbutton.ico')
    // loading the audio for when the button is clicked
    this.load.audio('click', './sounds/clicksound.wav')
  }

  create (data) {
    // setting coordinates, location and scale of background image
    this.gameOverSceneBackgroundImage = this.add.sprite(0, 0, 'secondGameOverSceneBackground').setScale(2)
    this.gameOverSceneBackgroundImage.x = 1920 / 2
    this.gameOverSceneBackgroundImage.y = 1080 / 2

    // setting coordinates, location and scale of home button
    this.homeButton = this.add.sprite(300, 210, 'homeButton').setScale(0.8)
    // making the button clickable
    this.homeButton.setInteractive({ useHandCursor: true })
    this.homeButton.on('pointerdown', () => this.clickButton())

    // setting coordinates, location and scale of restart button
    this.restartButton = this.add.sprite(1600, 210, 'restartButton').setScale(0.8)
    // making the button clickable
    this.restartButton.setInteractive({ useHandCursor: true })
    this.restartButton.on('pointerdown', () => this.clickSecondButton())

    // adding game over text to the scene 
    this.gameOverSceneText = this.add.text(980, 400, 'You got attacked by the seamonsters! \nClick the home button to go back to the \nmain menu, or click the restart button to \nplay again.', this.gameOverSceneTextStyle).setOrigin(0.5).setScale(0.3)
  }

  update (time, delta) {
  }

  // when the home button is clicked the scene switches back to the game scene and restarts
  clickButton () {
    // clicking sound plays when button is clicked
    this.sound.play('click')
    this.scene.start('menuScene')
  }
  
  // when the restart button is clicked the scene switches to the level two scene to play again
  clickSecondButton () {
    // clicking sound plays when button is clicked
    this.sound.play('click')
    this.scene.start('levelTwoScene')
  }
}

export default SecondGameOverScene
