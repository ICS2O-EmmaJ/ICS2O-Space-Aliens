/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Menu Scene

class MenuScene extends Phaser.Scene {

  // the constructor
  constructor () {
    super({ key: 'menuScene' })

    // creating a variable to hold the menu background image
    this.menuSceneBackgroundImage = null
    // creating a variable to hold the start button
    this.startButton = null
    // creating a variable to hold the instruction button
    this.instructionButton = null
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Menu Scene')
    // loading the menu scene background image of coral reef landscape
    this.load.image('menuSceneBackground', './images/menubackground.jpg')
    // loading the image of the blue start button
    this.load.image('startButton', './images/startbutton.webp')
    // loading the image of the blue instruction button
    this.load.image('instructionButton', './images/instructionbutton.png')
  }

  create (data) {
    // setting coordinates, location and scale of background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(0.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // setting coordinates, location and scale of instruction button
    this.instructionButton = this.add.sprite(300, 210, 'instructionButton').setScale(0.4)
    // making the button clickable
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickSecondButton())
    
    // setting coordinates, location and scale of start button
    this.startButton = this.add.sprite(1600, 200, 'startButton').setScale(0.7)
    // making the button clickable
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

  }

  update (time, delta) {
  }

  // when the instruction button is clicked the scene switches to the instructions
  clickSecondButton () {
    this.scene.start('instructionScene')
  }
  
  // when the start button is clicked the scene switches and the game begins
  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene
  