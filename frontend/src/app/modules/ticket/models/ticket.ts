import { Category } from "./category";

export class Ticket {
    id: number;
    title: string;
    description: string;
    category: Category;
    

    constructor (id: number = 0, title : string = '', description : string = '', category : Category){
        this.id = id;
        this.description = description;
        this.title = title;
        this.category = category;
    }

}
