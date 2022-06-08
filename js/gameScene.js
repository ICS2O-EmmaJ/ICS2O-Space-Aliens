/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
// Created on: June 2022
// This is the Game Scene

/** 
  * This class is the Game Scene.
  */
class GameScene extends Phaser.Scene {
   /**
    * This method is the constructor. 
    */
  constructor () {
    super({ key: "gameScene" })

    this.background = null
    this.ship = null
    this.fireMissile = false
  }

  /**
   * Can be defined on your own Scenes.
   * This method is called by the Scene Manager when the scene starts,
   *   before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log('Game Scene')

    // images
    this.load.image('starBackground', '../images/gamebackground.jpg')
    this.load.image('ship', '../images/mermaidsprite.png')
    this.load.image('missile', '../images/seashellmissile.png')
    // sound
    this.load.audio('seashell', '../sounds/seashellsound.wav')
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create (data) {
    this.background = this.add.image(0, 0, 'starBackground').setScale(1)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 220, 'ship').setScale(0.35)

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()
  }

  /** 
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   *  @param {number} time - The current time.
   *  @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
    // called 60 times a second, hopefully!

    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.15)
        this.missileGroup.add(aNewMissile)
        this.sound.play('seashell')
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene
  