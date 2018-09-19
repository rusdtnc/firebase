export class Reservation {
  constructor(
    public designation: string,
    public debut: string,
    public fin: string,
    public court: string,
    public uidJoueur: string,
    public key: string = null
  ) {}
}
