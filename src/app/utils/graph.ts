export class Single {
  constructor(
     public name = '',
     public value =''
  ) { }
}

export class Multi {
  constructor(
    public name = '',
    public series: Single[] = []
  ) { }
}
