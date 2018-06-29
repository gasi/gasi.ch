interface Team {
  numWorldCupTitles: number;
  country: string;
}

const teams: Array<Team> = [
  { numWorldCupTitles: 4, country: "Italy" },
  { numWorldCupTitles: 1, country: "France" },
  { numWorldCupTitles: 2, country: "Uruguay" },
  { numWorldCupTitles: 1, country: "Spain" },
  { numWorldCupTitles: 2, country: "Argentina" },
  { numWorldCupTitles: 4, country: "Germany" },
  { numWorldCupTitles: 1, country: "England" },
  { numWorldCupTitles: 5, country: "Brazil" }
];

const sortByNumTitles = (teams: Array<Team>): Array<Team> =>
  teams.sort(
    (a: Team, b: Team) =>
      b.numWorldCupTitles - a.numWorldCupTitles
  );

const sortByCountry = (teams: Array<Team>) =>
  teams.sort((a: Team, b: Team) =>
    a.country.localeCompare(b.country)
  );

const teamsByNumTitles = sortByNumTitles(teams);
const teamsByCountry = sortByCountry(teams);

// ... somewhere else

const topTeam = teamsByNumTitles[0];
console.log(
  `Top team: ${topTeam.country} (${topTeam.numWorldCupTitles})`
);
// Top team: Argentina (2)

export {}; // HACK: https://stackoverflow.com/a/41975448/125305
