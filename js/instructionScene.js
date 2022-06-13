/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Emma Janani
// Created on: June 2022
// This is the Instruction Scene

class InstructionScene extends Phaser.Scene {
  
  // constructor
  constructor () {
    super({ key: 'instructionScene' })
  }

  init (data) {
    // setting the background color to white
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
  
  }

  // setting coordinates, location and size of the background image
  create (data) {
    
  }

  // the amount of time the title scene stays on screen (6 seconds)
  update (time, delta) {
    
  }
}

export default InstructionScene
  