/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
// Created on: June 2022
// This is the Splash Scene 

class SplashScene extends Phaser.Scene {

  // Constructor
  constructor () {
    super({ key: 'splashScene' })
    // Variable to hold the splashs scene background image
    this.splashSceneBackgroundImage = null
  }

  // Setting the splash scene background color to dark blue
  init (data) {
    this.cameras.main.setBackgroundColor("#365b9c")
  }


  preload() {
    console.log("Splash Scene")
    // Importing image of the Immaculata Crest
    this.load.image('splashSceneBackground', './images/immaculatacrest.jpeg')
  }

  // Setting coordinates, location and scale of Immaculata Crest
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2)
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  // the amount of time the splash scene stays on screen (3.5 seconds)
  update (time, delta) {
    if (time > 3500) {
      // switching from splash scene to title scene
      this.scene.switch("titleScene")
    }
  }
}

export default SplashScene
  