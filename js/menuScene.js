/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
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
    // creating a variable to hold the menu scene text
    this.menuSceneText = null
    // setting the style of the menu text to 200px, centred and in the color white
    this.menuSceneTextStyle = { font: '200px Times', fill: '#ffffff', align: 'center' }
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Menu Scene')
    // loading the menu scene background image of coral reef landscape
    this.load.image('menuSceneBackground', '../images/menubackground.jpg')
    // loading the image of the blue start button
    this.load.image('startButton', '../images/startbutton.webp')
  }

  create (data) {
    // setting coordinates, location and scale of background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(0.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // setting coordinates, location and scale of start button
    this.startButton = this.add.sprite(1600, 200, 'startButton').setScale(0.7)
    // making the button clickable
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

    // adding text for the instructions of the game
    this.menuSceneText = this.add.text(1000, 300, 'Welcome to MAGIC MERMAID! Use the left and right \narrow keys to move the mermaid and avoid the shark. \nYou can use the spacebar to shoot seashells at the \nshark. If you come in contact with the shark, you \nwill lose a life. If you shoot at a shark you will \nearn a point. The game will end if you lose all 4 \nlives!', this.titleSceneTextStyle).setOrigin(0.5).setScale(1.5)
  }

  update (time, delta) {
  }

  // when the start button is clicked the scene switches and the game begins
  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene
  