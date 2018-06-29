const numbers = [1, 2, 3];

// OK: Mutation
console.log("Reversed numbers:", numbers.reverse());
console.log("Original numbers:", numbers);
// Reversed numbers: [3, 2, 1]
// Original numbers: [3, 2, 1] // Unexpected!

// Not OK: Reassignment
numbers = [5, 4, 6];
// TypeError: Assignment to constant variable.
