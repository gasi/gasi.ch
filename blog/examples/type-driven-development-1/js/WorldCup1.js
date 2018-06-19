const teams = [
  { country: 'Brazil', numWorldCupTitles: 5 },
  { country: 'Germany', numWorldCupTitles: 4 },
  { country: 'Italy', numWorldCupTitles: 4 },
  { country: 'Uruguay', numWorldCupTitles: 2 },
  { country: 'Argentina', numWorldCupTitles: 2 },
  { country: 'England', numWorldCupTitles: 1 },
  { country: 'Spain', numWorldCupTitles: 1 },
  { country: 'France', numWorldCupTitles: 1 }
];

const switzerland = teams.find(
  team => team.country === 'Switzerland'
);
console.log('Switzerland: ' + switzerland.numWorldCupTitles);

// TypeError: Cannot read property 'numWorldCupTitles'
// of undefined
