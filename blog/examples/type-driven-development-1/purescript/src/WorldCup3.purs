module WorldCup3 where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console
import Data.Array as Array
import Data.Maybe (Maybe(..))

type Team = { country :: String, numWorldCupTitles :: Int }

teams :: Array Team
teams = [
  { country: "Brazil", numWorldCupTitles: 5 },
  { country: "Germany", numWorldCupTitles: 4 },
  { country: "Italy", numWorldCupTitles: 4 },
  { country: "Uruguay", numWorldCupTitles: 2 },
  { country: "Argentina", numWorldCupTitles: 2 },
  { country: "England", numWorldCupTitles: 1 },
  { country: "Spain", numWorldCupTitles: 1 },
  { country: "France", numWorldCupTitles: 1 }
]

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
main = do
  let maybeSwitzerland = Array.find (\team ->
                           team.country == "Switzerland") teams
  case maybeSwitzerland of
    Just switzerland ->
      Console.log (
        "Switzerland: " <> show switzerland.numWorldCupTitles)
    _ -> Console.log "Switzerland never won a World Cup."

-- Switzerland never won a World Cup.
