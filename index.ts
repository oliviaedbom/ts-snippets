let title: string = 'Some Title';
let content: string = 'Some Content';

const weather = 'sunyy';
const report = `Welcome to this weather report, todag is going to be ${weather}`

let someDecimalNumber: number = 42;
let someBinaryNumber: number = 0b101010; // => 42

//We commonly use string[] or number[], etc. when an array only contains 1 type of object.
let fruit: string [] = ['apple', 'orange', 'banana'];

//We start to use the alternative Array<string | number> if an array can contain multiple types of objects.
//This method of <string> is referred to as an “angle bracket notation”
This method of <string> is referred to as an “angle bracket notation”
let garageObjects: Array<string | numbers > = ['wrench', 42, 'hammer'];


//When we want to work with arrays that contain a specific list of object types we use a Tuple type.
let couchDetails: [string, number, boolean]
couchDetails = ['brown', 40, true]; // Success!
couchDetails = ['red', 40, 'something']; // will fail, the 3rd element should be a boolean
couchDetails = ['gray', 20, false, 3]; // will fail, there should only be 3 elements in the array

//An enum is basically a list of predefined constants. Like shirt sizes:
enum Sizes {
    Small,
    Medium,
    Large,
}
Sizes.Small; // is 0
Sizes.Medium; // is 1
Sizes.Large; // is 2

//You can make an Enum start at a different count like this:
enum Companies {
    Google = 1;
    Facebook,
    Twitter,
}

Companies.Google; // is 1
Companies.Facebook; // is 2
Companies.Twitter; // is 3

//You can also assign other values to Enums
enum Companies {
    Instagram = 'Instagram',
    Blocket = 'Blocket',
    Tiktok = 'Tiktok',
  }
  
  Companies.Instagram; // is 'Instgram'
  Companies.Blocket; // is 'Blocket'
  Companies.Tiktok; // is 'Tiktok'



  //We normally don’t really use object, as it’s better to use either Enumerables or “interfaces”.

//Any
  /**
   * As the name suggests, the any-type is pretty much anything you want. 
   * With Any you can temporarily skip type-safety. 
   * If you are working on a new project, you should probably put a rule in your tsconfig to block the use of the any-object. 
   * If you are working on translating an old project from JavaScript to Typescript, 
   * you can’t really get away from using any types here and there from time to time.
   */
   let anyThing: any = 42; // assigned a number

   anyThing = 'some string'; // can be reassigned to a string
   anyThing = false; // can be reassigned to a boolean

//Void
   /**
    * void is when you expect something to be completely devoid of anything. 
    * Having a variable be void would be pretty useless, but void is pretty common in functions. 
    * Sometimes you want the result of a function to not return anything.
    */

function doSomething(): void {
    console.log('I write to console, but return nothing'):
    return;
}
doSomething();



//null and undefined these types are very much like each other:
let anUndefinedVariable: undefined = undefined;
let aNullVariable: null = null;
let something: null = undefined;

let someString: string; // null until I actually assigned something

//So by default all of the types we’ve seen so far can be null and undefined. This results into the below being a totally fine thing:
let someOtherString: string = null;
/**
 * While variables can be empty when we assign them, we probably don’t want to specifically assign null to our string later. 
 * This is why it’s smart to make a rule in your project’s tsconfig to block reassigning variables with null.
 */



//you won’t actually have to type the type annotation. When you write something like this:
let aFruit = 'apple';
//The type-system will be smart and assume that whatever you’ll assign to that fruit later will probably also be a string

//This also counts for default variables in functions:
const fruitLength = (fruit = 'Apple') => {
    return fruit.length;
}
/**
 * The assignment of = 'Apple' here tells the type-system that fruit will most likely always be a string. 
 * Aditionally since you’re only returning one variable (the length of the fruit), 
 * which happens to come from a native JavaScript feature, the type-system will assume that your function always returns numbers
 */

//Typescript uses the best common type inference strategy to determine types. When you provide it with an array like this:
someArray = [1, 2, 'someString', 3];
/*
It will infer the type Array<number | string>, since using that would be more common than using a tuple ([number, number, string, number]). 
When mixing and matching object like array above, it’s probably not a bad idea to not let type interface do its magic for you. 
Being “explicit” is often better than being “implicit”.
 */

//Interfaces is better then object
interface Animal {
    kind: string;
    weight: number;
}
let dog: Animal;
dog = {
    kind: 'mammal',
    weight: 10,
}; //succeeds

dog = {
    kind: true,
    weight: 10,
}; //fails, kind should be string

//Additionally you can also use a type alias to achieve the same:
type AnimalTwo {
    kind: string;
    weight: number;
}

let dogtwo: Animal;

dog = {
    kind: 'mammal',
    weight: 10,
}; // succeeds

dog = {
    kind: true,
    weight: 10,
}; // fails, kind should be a string

//If you want to make an interface for an object you’ll only use once in one function, 
//it’s often best to just use an inline notation approach:
let doggis: {
    kind: string;
    weight: number;
};

doggis = {
    kind: 'mammal',
    weight: 10,
}; // succeeds

doggis = {
    kind: true,
    weight: 10,
}; // fails, kind should be a string

/**
 * There can be situations where the generic type of an object doesn’t matter, 
 * but the relationship between the given object and the returned objects should be enforced. 
 * That’s when we start using Generics. Below an example:
 */

 const fillArray = <T>(len: number, element: T) => {
    return new Array<T>(len).fill(elem);
 }
 
 const newArray = fillArray<string>(3, 'hi'); // => ['hi', 'hi', 'hi']
 
 newArray.push('bye'); // succeeds
 newArray.push(true); // fails, only strings can be added to the array

//In the above example the generic type <T> gets assigned to <String>, 
//but we could have written fillArray<Number>(3, 10) to create a filled array that would only allowed numbers.



//Sometimes we would allow objects to have 2 different types. This is when we use the Union notation.
//A union notation works like this:
let someValue: string | number = 'hello';
someValue = 10 // succeeds;
someValue = false // fails, only strings or numbers can be assigned.

//While in union types we would allow the use of only 1 type at the same time, Intersection types can be used to mix and match 2 types together.
interface Tree {
    height: number;
    kind: string;
  }
  
  interface House {
    colour: string;
  }
  
  let treeHouse: Tree & House;
  
  treeHouse.kind = 'Oak';
  treeHouse.height = 60;
  treeHouse.colour = 'Blue';
  treeHouse.name = 'The Fort' // fails, name does not exist on types Tree and House.

  /*
  Optional typeSay you’re building a function, but you’d be okay if a parameter is missing sometimes, That’s when optional types are used.*/
  function getTrainTrip(line: number, reservedSeatNumber?: number): void {
    if (reservedSeatNumber) {
      console.log(`
      Welcome onboard of train ${line}.
      You have seat number ${reservedSeatNumber}.
      `)
    } else {
      console.log(`
      Welcome on board of train ${line}.
      You did not reserve a seat, please find a free seat in cariage 3
      `)
    }
  }

/**
 * When specifying a list of parameters in a function, it’s a best practice to put the optional parameters last.
        You can also define optional variables in interfaces:
 */
interface Tree {
    height: number;
    kind: string;
    colour?: string;
}



/*    What about promises?

Promises are a bit special. A promise starts off and will then resolve with a result after a while. 
How would you apply Type-safety to that? The function below will return a Promise that in time will return a string
*/

function iWillWait(): Promise<string> {
    new Promise((resolve) => {
      // timeout of 2000 miliseconds resolving our promise with "Hello!"
      setTimeout( () => resolve('Hello!'), 2000 )
    })
}


