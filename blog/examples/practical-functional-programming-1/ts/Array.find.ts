import "./Maybe";

type find<A> = (
  predicate: (needle: A) => boolean
) => (array: Array<A>) => Maybe<A>;

// const find: find<number> = (
//   predicate: (needle: number) => boolean
// ) => (array: Array<number>) => {
//   const value = array.find(predicate);
//   if (!value) {
//     return { type: 'Nothing' };
//   }

//   return { type: 'Just', value };
// };
