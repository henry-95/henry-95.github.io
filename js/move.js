export default class Move {

  constructor(name, soundfile, speed) {
    this.name = name;
    this.sound = new Howl({
      src: [soundfile],
      rate: speed,
      html5: true
    });
  }
  announce() {
    this.sound.play();
  }

  name() {
    return name;
  }
}

export class Combo {
  constructor(arrayOfMoves) {
  }
}