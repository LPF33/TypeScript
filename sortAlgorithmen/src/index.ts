import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

//Sorting the NumbersCollection
//prettier-ignore
const numbersCollection = new NumbersCollection([94, 3, -4, 2, 55,-100,44,32,44,44,45,500]);
numbersCollection.bubbleSort();
console.log(numbersCollection.data);

//Sorting the CharactersColletion
const charactersCollection = new CharactersCollection("zXdddkssdeedhH");
charactersCollection.bubbleSort();
console.log(charactersCollection.data);

//Sorting the LinkedList
const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(5);
linkedList.add(-4);
linkedList.add(4);
linkedList.add(99);
linkedList.bubbleSort();
linkedList.print();
