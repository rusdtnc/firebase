export class Rectangle {
  constructor(public x: number,
              public y: number,
              public fill = 'white') {
  }
}


export class Ligne {
  constructor(public x1: number,
              public x2: number,
              public y1: number,
              public y2: number) {
  }
}

export class Text {
  constructor(public x: number,
              public y: number,
              public value: string,
              public size = 15,
              public weight = 400,
              public fill = 'black') {
  }
}

export class EquipeText extends Text {
  constructor(public idEquipe: number,
              public x: number,
              public y: number,
              public value: string,
              public size = 15,
              public weight = 400,
              public fill = 'black') {
    super(x, y, value, size, weight, fill);
  }
}

