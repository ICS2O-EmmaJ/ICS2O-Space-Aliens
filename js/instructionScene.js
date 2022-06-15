/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Instruction Scene

class InstructionScene extends Phaser.Scene {
  
  // constructor
  constructor () {
    super({ key: "instructionScene" })

    // creating a variable to hold the background image
    this.instructionSceneBackgroundImage = null
    // creating a variable to hold the back button
    this.backButton = null
    // creating a variable to hold the forward button
    this.forwardButton = null
    // creating a variable to hold the instruction text
    this.instructionSceneText = null
    // setting the style of the instruction text to 200px, centred and in the color white
    this.instructionSceneTextStyle = { font: '200px Times', fill: '#000000', align: 'center' }
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Instruction Scene')
    // loading the instruction scene background image of underwater landscape
    this.load.image('instructionSceneBackground', './images/instructionbackground.jpg')
    // loading the image of the blue back button
    this.load.image('backButton', './images/backbutton.png')
    // loading the image of the blue forward button
    this.load.image('forwardButton', './images/forwardbutton.png')
    // loading the audio for when the button is clicked
    this.load.audio('click', './sounds/clicksound.wav')
  }

  create (data) {
    // setting coordinates, location and scale of background image
    this.instructionSceneBackgroundImage = this.add.sprite(0, 0, 'instructionSceneBackground').setScale(1)
    this.instructionSceneBackgroundImage.x = 1920 / 2
    this.instructionSceneBackgroundImage.y = 1080 / 2

    // setting coordinates, location and scale of back button
    this.backButton = this.add.sprite(300, 210, 'backButton').setScale(0.2)
    // making the button clickable
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on('pointerdown', () => this.clickButton())
  

    // setting coordinates, location and scale of forward button
    this.forwardButton = this.add.sprite(1600, 210, 'forwardButton').setScale(0.2)
    // making the button clickable
    this.forwardButton.setInteractive({ useHandCursor: true })
    this.forwardButton.on('pointerdown', () => this.clickSecondButton())

    // adding text for the instructions of the game
    this.instructionSceneText = this.add.text(1000, 300, 'Welcome to MAGIC MERMAID! Use the left and \nright arrow keys to move the mermaid and avoid the \nshark. You can use the spacebar to shoot seashells at \nthe shark. If you come in contact with the shark, you \nwill lose a life. If you shoot at a shark you will earn \na point. The game will end if you lose all 3 lives! \nYou can click the "a" key to make more sharks appear.', this.instructionSceneTextStyle).setOrigin(0.5).setScale(0.2)
  }

  update (time, delta) {
  }

  // when the back button is clicked the scene switches back to the menu scene
  clickButton () {
    this.sound.play('click')
    this.scene.start('menuScene')
  }
  
  // when the forward button is clicked the scene switches to the game scene
  clickSecondButton () {
    this.sound.play('click')
    this.scene.start('gameScene')
  }
}

export default InstructionScene
  