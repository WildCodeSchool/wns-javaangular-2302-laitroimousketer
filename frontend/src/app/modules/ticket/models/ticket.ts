export class Ticket {
    id: number ;
    title: string ;
    description: string;

    constructor (id: number = 0, title : string = '', description : string = ''){
        this.id = id;
        this.description = description;
        this.title = title;
    }
}
