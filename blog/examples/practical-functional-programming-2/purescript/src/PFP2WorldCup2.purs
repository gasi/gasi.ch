module PFP2WorldCup2 where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console
import Data.Array ((!!), sortBy)
import Data.Array as Array
import Data.Maybe (Maybe(..))
import Data.Ord (compare)

type Team = { numWorldCupTitles :: Int, country :: String }

teams :: Array Team
teams = [
  { numWorldCupTitles: 4, country: "Italy" },
  { numWorldCupTitles: 1, country: "France" },
  { numWorldCupTitles: 2, country: "Uruguay" },
  { numWorldCupTitles: 1, country: "Spain" },
  { numWorldCupTitles: 2, country: "Argentina" },
  { numWorldCupTitles: 4, country: "Germany" },
  { numWorldCupTitles: 1, country: "England" },
  { numWorldCupTitles: 5, country: "Brazil" }
]

sortByNumTitles :: Array Team -> Array Team
sortByNumTitles ts = Array.sortBy
  (\a b -> compare b.numWorldCupTitles a.numWorldCupTitles) ts

sortByCountry :: Array Team -> Array Team
sortByCountry ts = Array.sortBy
  (\a b -> compare a.country b.country) ts

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
main = do
  let teamsByNumTitles = sortByNumTitles teams
      teamsByCountry = sortByCountry teams
      maybeTopTeam = teamsByNumTitles !! 0
  case maybeTopTeam of
    Just topTeam ->
      Console.log ("Top team: " <> topTeam.country <>
        " (" <> show topTeam.numWorldCupTitles <> ")")
    Nothing -> Console.log "No top team found."

-- Top team: Brazil (5)
