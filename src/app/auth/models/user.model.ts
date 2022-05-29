export class User {
    felhasznaloNev: string;
    email: string;
    telefonSzam: string;

    constructor(felhasznaloNev : string, email:string, telefonSzam: string){
        this.felhasznaloNev=felhasznaloNev;
        this.email = email;
        this.telefonSzam = telefonSzam;
    }
}
