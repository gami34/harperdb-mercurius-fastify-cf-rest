import { randNumber, randBook } from "@ngneat/falso";

const book1 = randBook();
const book2 = randBook();
const book3 = randBook();
const book4 = randBook();
const book5 = randBook();
const book6 = randBook();

export const booksdata = [
    { id: "1", name: book1.title, genre: book1.category, authorId: "1" },
    { id: "2", name: book2.title, genre: book2.category, authorId: "2" },
    { id: "3", name: book3.title, genre: book3.category, authorId: "3" },
    { id: "4", name: book4.title, genre: book4.category, authorId: "3" },
    { id: "5", name: book5.title, genre: book5.category, authorId: "3" },
    { id: "6", name: book6.title, genre: book6.category, authorId: "3" },
];

export const authorsdata = [
    { id: "1", name: book1.author, age: randNumber({ min: 21, max: 53 }) },
    { id: "2", name: book2.title, age: randNumber({ min: 21, max: 53 }) },
    { id: "3", name: book3.title, age: randNumber({ min: 21, max: 53 }) },
];
