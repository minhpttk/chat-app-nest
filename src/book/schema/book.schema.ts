import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



export enum Category {
    ADVANTURE =  "Avanture",
    CLASSICS = "Classsics",
    CRIME = "Crime",
    FANTASTY = "Fantasty"
}

@Schema({
    timestamps : true
})

export class Book {

    @Prop()
    title : string;

    @Prop()
    description : string;
    
    @Prop()
    price : number;

    @Prop()
    author : string;

    @Prop()
    category : Category
}

export const BookSchema = SchemaFactory.createForClass(Book)