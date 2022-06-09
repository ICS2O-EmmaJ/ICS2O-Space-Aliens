/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
// Created on: June 2022
// This is the Menu Scene

/** 
  * This class is the Menu Scene.
  */
class MenuScene extends Phaser.Scene {
   /**
    * This method is the constructor. 
    */
  constructor () {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.menuSceneText = null
    this.menuSceneTextStyle = { font: '200px Times', fill: '#ffffff', align: 'center' }
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
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', '../images/menubackground.jpg')
    this.load.image('startButton', '../images/startbutton.webp')
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(0.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1600, 200, 'startButton').setScale(0.7)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

    this.menuSceneText = this.add.text(1000, 300, 'Welcome to MAGIC MERMAID! Use the left and right \narrow keys to move the mermaid and avoid the shark. \nYou can use the spacebar to shoot seashells at the \nshark. If you come in contact with the shark, you \nwill lose a life. If you shoot at a shark you will \nearn a point. You will also earn a point if you \ncollect treasure chests!', this.titleSceneTextStyle).setOrigin(0.5).setScale(1.5)
  }

  /** 
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   *  @param {number} time - The current time.
   *  @param {number} delta - The delta time in ms since the last frame.
   */
  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene
  