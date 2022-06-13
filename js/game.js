/* global Phaser */

// Created by: Emma Janani
// Created on: June 2022
// This is the Phaser3 configuration file

// scene import statements
import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import InstructionScene from './instructionScene.js'
import GameScene from './gameScene.js'

// create the new scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const instructionScene = new InstructionScene()
const gameScene = new GameScene()

// Start Phaser Game
const config = {
  type: Phaser.AUTO,
  width: 1920, 
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  // set background color to white
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config)

// setting the order to load scenes (splash scene, title scene, menu scene, then game scene)
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("instructionScene", instructionScene)
game.scene.add("gameScene", gameScene)

// the start scene
game.scene.start("splashScene")

