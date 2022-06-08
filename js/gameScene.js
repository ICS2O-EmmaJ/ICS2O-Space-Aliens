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
  // create a shark
  createShark () {
    const sharkXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920
    let sharkXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
    sharkXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const aShark = this.physics.add.sprite(sharkXLocation, -100, 'shark').setScale(0.1)
    aShark.body.velocity.y = 200
    aShark.body.velocity.x = sharkXVelocity
    this.sharkGroup.add(aShark)
  }
  
   /**
    * This method is the constructor. 
    */
  constructor () {
    super({ key: "gameScene" })

    this.background = null
    this.mermaid = null
    this.fireSeashell = false
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
    this.load.image('oceanBackground', '../images/gamebackground.jpg')
    this.load.image('mermaid', '../images/mermaidsprite.png')
    this.load.image('seashell', '../images/seashell.png')
    this.load.image('shark', '../images/shark.png')
    // sound
    this.load.audio('seashell', '../sounds/seashellsound.wav')
    this.load.audio('growl', '../sounds/growlsound.wav')
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create (data) {
    this.background = this.add.image(0, 0, 'oceanBackground').setScale(1)
    this.background.setOrigin(0, 0)

    this.mermaid = this.physics.add.sprite(1920 / 2, 1080 - 220, 'mermaid').setScale(0.35)

    // create a group for the seashells
    this.seashellGroup = this.physics.add.group()

    // create a group for the sharks
    this.sharkGroup = this.add.group()
    this.createShark()

    // collisions between seashells and sharks
    this.physics.add.collider(this.seashellGroup, this.sharkGroup, function (seashellCollide, sharkCollide) {
      sharkCollide.destroy()
      seashellCollide.destroy()
      this.sound.play('growl')
      this.createShark()
    }.bind(this))
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
      this.mermaid.x -= 15
      if (this.mermaid.x < 0) {
        this.mermaid.x = 1920
      }
    }

    if (keyRightObj.isDown === true) {
      this.mermaid.x += 15
      if (this.mermaid.x > 1920) {
        this.mermaid.x = 0
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireSeashell === false) {
        // fire seashell
        this.fireSeashell = true
        const aNewSeashell = this.physics.add.sprite(this.mermaid.x, this.mermaid.y, 'seashell').setScale(0.15)
        this.seashellGroup.add(aNewSeashell)
        this.sound.play('seashell')
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireSeashell = false
    }

    this.seashellGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene
  