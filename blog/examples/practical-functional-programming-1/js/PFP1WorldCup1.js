const teams = [
  { numWorldCupTitles: 5, country: "Brazil" },
  { numWorldCupTitles: 4, country: "Germany" },
  { numWorldCupTitles: 4, country: "Italy" },
  { numWorldCupTitles: 2, country: "Uruguay" },
  { numWorldCupTitles: 2, country: "Argentina" },
  { numWorldCupTitles: 1, country: "England" },
  { numWorldCupTitles: 1, country: "Spain" },
  { numWorldCupTitles: 1, country: "France" }
];

const switzerland = teams.find(
  team => team.country === "Switzerland"
);
console.log("Switzerland: " + switzerland.numWorldCupTitles);

// TypeError: Cannot read property 'numWorldCupTitles'
// of undefined
