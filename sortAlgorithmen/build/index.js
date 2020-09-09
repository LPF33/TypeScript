"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumbersCollection_1 = require("./NumbersCollection");
var CharactersCollection_1 = require("./CharactersCollection");
var LinkedList_1 = require("./LinkedList");
//Sorting the NumbersCollection
//prettier-ignore
var numbersCollection = new NumbersCollection_1.NumbersCollection([94, 3, -4, 2, 55, -100, 44, 32, 44, 44, 45, 500]);
numbersCollection.bubbleSort();
console.log(numbersCollection.data);
//Sorting the CharactersColletion
var charactersCollection = new CharactersCollection_1.CharactersCollection("zXdddkssdeedhH");
charactersCollection.bubbleSort();
console.log(charactersCollection.data);
//Sorting the LinkedList
var linkedList = new LinkedList_1.LinkedList();
linkedList.add(500);
linkedList.add(5);
linkedList.add(-4);
linkedList.add(4);
linkedList.add(99);
linkedList.bubbleSort();
linkedList.print();
