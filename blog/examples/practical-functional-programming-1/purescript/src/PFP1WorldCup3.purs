module PFP1WorldCup3 where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console
import Data.Array as Array
import Data.Maybe (Maybe(..))

type Team = { numWorldCupTitles :: Int, country :: String }
-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
teams :: Array Team
-- ^^^^^^^^^^^^^^^^
teams = [
  { numWorldCupTitles: 5, country: "Brazil" },
  { numWorldCupTitles: 4, country: "Germany" },
  { numWorldCupTitles: 4, country: "Italy" },
  { numWorldCupTitles: 2, country: "Uruguay" },
  { numWorldCupTitles: 2, country: "Argentina" },
  { numWorldCupTitles: 1, country: "England" },
  { numWorldCupTitles: 1, country: "Spain" },
  { numWorldCupTitles: 1, country: "France" }
]

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
main = do
  let maybeSwitzerland = Array.find (\team ->
                           team.country == "Switzerland") teams
  case maybeSwitzerland of
    Just switzerland ->
      Console.log (
        "Switzerland: " <> show switzerland.numWorldCupTitles)
    _ -> Console.log "Switzerland has never won a World Cup."

-- Switzerland has never won a World Cup.
