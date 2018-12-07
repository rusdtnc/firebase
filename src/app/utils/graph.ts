export class Conf {
  static readonly viewVd = [300, 150];

  static readonly view = [700, 300];

  static readonly showXAxis = true;
  static readonly showYAxis = true;
  static readonly gradient = false;
  static readonly showLegend = true;
  static readonly legendTitle = 'Legend';
  static readonly legendPosition = 'right';
  static readonly showXAxisLabel = false;
  static readonly tooltipDisabled = false;
  static readonly xAxisLabel = 'Country';
  static readonly showYAxisLabel = false;
  static readonly yAxisLabel = 'GDP Per Capita';
  static readonly showGridLines = false;
  static readonly innerPadding = '10%';
  static readonly barPadding = 8;
  static readonly groupPadding = 16;
  static readonly roundDomains = false;
  static readonly maxRadius = 10;
  static readonly minRadius = 3;
  static readonly showSeriesOnHover = true;
  static readonly roundEdges: boolean = true;
  static readonly animations: boolean = true;
  static readonly xScaleMin: any;
  static readonly xScaleMax: any;
  static readonly yScaleMin: number;
  static readonly yScaleMax: number;
  static readonly showDataLabel = false;
}

export const configGraph: Conf = new Conf();

export class Single {
  constructor(
     public name: string,
     public value: number
  ) { }
}

export class Multi {
  constructor(
    public name = '',
    public series: Single[] = []
  ) { }
}
