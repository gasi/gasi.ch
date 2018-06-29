module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Console as Console

import PFP2WorldCup1 as PFP2WorldCup1
import PFP2WorldCup2 as PFP2WorldCup2

main :: forall eff. Eff (console :: CONSOLE | eff) Unit
main = do
  Console.log "Listing: PFP2WorldCup1"
  PFP2WorldCup1.main
  Console.log "Listing: PFP2WorldCup2"
  PFP2WorldCup2.main
