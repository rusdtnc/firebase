export const primary = '#00503c';
export const secondary = '#c85a19';

export const bgPrimary = '#b8cec8';

export class ColorUtils {

  public static readonly colors = {
    un: {
      primary: '#00503c',
      secondary: '#e5edeb'
    },
    deux: {
      primary: '#c85a19',
      secondary: '#f9eee8'
    },
    trois: {
      primary: '#FF847C',
      secondary: '#e5edeb'
    },
    quatre: {
      primary: '#F7DB4F',
      secondary: '#e5edeb'
    },
    cinq: {
      primary: '#2F9599',
      secondary: '#e5edeb'
    },
    six: {
      primary: '#355C7D',
      secondary: '#e5edeb'
    },
    sept: {
      primary: '#6C5B7B',
      secondary: '#e5edeb'
    },
    huit: {
      primary: '#2A363B',
      secondary: '#e5edeb'
    }
  };

  public static getColorForCourt(court: string): any {
    if(court === '1') {
      return this.colors.un;
    }
    if(court === '2') {
      return this.colors.deux;
    }
    if(court === '3') {
      return this.colors.trois;
    }
    if(court === '4') {
      return this.colors.quatre;
    }
    if(court === '5') {
      return this.colors.cinq;
    }
    if(court === '6') {
      return this.colors.six;
    }
    if(court === '7') {
      return this.colors.sept;
    }
    if(court === '8') {
      return this.colors.huit;
    }

  }
}
