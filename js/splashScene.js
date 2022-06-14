/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Splash Scene 

class SplashScene extends Phaser.Scene {

  // constructor
  constructor () {
    super({ key: 'splashScene' })
    // variable to hold the splashs scene background image
    this.splashSceneBackgroundImage = null
  }

  // setting the splash scene background color to dark blue to match the Immaculata crest
  init (data) {
    this.cameras.main.setBackgroundColor("#365b9c")
  }


  preload() {
    console.log("Splash Scene")
    // importing image of the Immaculata Crest
    this.load.image('splashSceneBackground', './images/immaculatacrest.jpeg')
  }

  // setting coordinates, location and scale of Immaculata crest
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
  