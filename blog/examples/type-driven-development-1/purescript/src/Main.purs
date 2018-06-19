module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console

import WorldCup2 as WorldCup2
import WorldCup3 as WorldCup3

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
main = do
  Console.log "Listing: WorldCup2"
  WorldCup2.main
  Console.log "---"
  Console.log "Listing: WorldCup3"
  WorldCup3.main
