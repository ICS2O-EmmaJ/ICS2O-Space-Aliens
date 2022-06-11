/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
// Created on: June 2022
// This is the Title Scene

class TitleScene extends Phaser.Scene {

  // constructor
  constructor () {
    super({ key: "titleScene" })

    // creating a variable to hold the background image
    this.titleSceneBackgroundImage = null
    // creating a variable to hold the title text
    this.titleSceneText = null
    // setting the style of the title text to 80px, centred and in the color white
    this.titleSceneTextStyle = { font: '80px Times', fill: '#ffffff', align: 'center' }
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log('Title Scene')
    // loading the title scene background image of mermaid silhouette
    this.load.image('titleSceneBackground', '../images/titlebackground.jpg')
  }

  // setting coordinates, location and size of the background image
  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(1.4)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    // specifying what the title text says, where it is and the size
    this.titleSceneText = this.add.text(1400, 500, 'MAGIC MERMAID', this.titleSceneTextStyle).setOrigin(0.5)
  }

  // the amount of time the title scene stays on screen (6 seconds)
  update (time, delta) {
    if (time > 6000) {
      // switching from title scene to menu scene
      this.scene.switch("menuScene")
    }
  }
}

export default TitleScene
  