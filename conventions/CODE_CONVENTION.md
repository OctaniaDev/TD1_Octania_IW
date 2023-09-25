## __Naming variables__  

First the name must be explicit.
For example if the variable is used to get
the temperature of the city, the variable can be:
- ``cityTemperature``  

### __For HTML__
- Always in lowercase
- Words are separeted by '_' 
example: ``my_variable``  

### __For POO (or prototypes)__
- First word in lowercase
- Next ones with the first letter in uppercase
example: ``myVariable``  

## __Naming functions and constants__  

### __For constants__
- ``const myConstant``  

### __For functions__
Like the variables.
- ``function myFunction()``
- ``let myFunction = ()``  

## __Write code__
Some standards for writing functions, indentations, etc.

### __Out of functions__
- If you are using a bloc of code few times, make a function (even if it is a code of one ligne)
- A function must only do one thing (not display at the same time as an algorithme is running, for example)
- After (better before) having finished a function, write what it does, what it receives in parameter and  
what it returns (the JsDoc) and **check that it does only one thing**  

### __Inside functions__
```js
function myFunction(myVariable) {
    if(myVariable == 1)
      console.log("test")
}
function myFunction(myVariable) {
    if(myVariable != 1) return;
    console.log("test");
}
```  

- After the parentheses type a space before typing braces
- reverse the condition if it creates an indentation that can be avoided (example above)
- If there is only one instruction in a 'if' conditions don't types braces
- A function must have a maximum of three indentations in it (don't count the braces of the function itself)
- If the function only does one thing (without 'if' conditions) it is better to do an arrow function (see below)  

```js
let myArrowFunction = parameter => parameter * 2
let myArrowFunction = (parameter) => { return parameter * 2 }
```  

Both functions do the same thing. The first is easier to write.
- If there is only one parameter, no need to type parentheses
- If the function only returns a value, no need for the word 'return'  

## __Some Tips__

- Try as much as possible to have readable and clean code
- Do not hesitate to make newlines and leave blank lines in your functions
(for example a function which must declare 2, 3 variables before executing a for loop,
you can make a white line between these 2 function blocks).
- Organize your functions and variables so that you understand the order of importance (or sequence) of each block of code
- Try to always declare your variables at the start of the function and not in a for loop for example (even if you only use it in the loop)  

## __JS DOC__
The js doc is important to be able to understand what certain blocks of code do  

```js
/**
 * a function that return a string representation
 * of an object in the factory
 * @param {int} number 
 * @param {string} libelle 
 * @param {string[]} data
 * @returns {string}
 */
function toString(number, libelle, data) {
    return libelle, ' n°', number, ' ', date[0]
}
```  

In the braces you must only type the type of the parameters and the return (if it is returning something)
