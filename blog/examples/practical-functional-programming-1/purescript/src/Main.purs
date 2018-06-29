module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console

import PFP1WorldCup2 as PFP1WorldCup2
import PFP1WorldCup3 as PFP1WorldCup3

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
main = do
  Console.log "Listing: PFP1WorldCup2"
  PFP1WorldCup2.main
  Console.log "---"
  Console.log "Listing: PFP1WorldCup3"
  PFP1WorldCup3.main
