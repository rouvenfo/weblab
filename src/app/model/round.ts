export class Round {
    RUNDE_ID: number;
    BEZ: string;

    constructor(roundId: number, desc: string){
      this.RUNDE_ID = roundId;
      this.BEZ = desc;
    }

    static getRounds(sort_group: boolean): Round[]{
      if(sort_group){
        return new Array<Round>(new Round(1, "Gruppenphase"), new Round(2, "K.O. Phase"));
      }
      else{
        return new Array<Round>(new Round(0, "Runde 1"), new Round(1, "Runde 2"), new Round(2, "Runde 3"), 
            new Round(17, "Achtelfinale"), new Round(18, "Viertelfinale"), new Round(19, "Halbfinale"), new Round(20, "Finale"));
      }
    }
  }