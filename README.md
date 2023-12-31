# NFT tickets for your events, powered by the solana blockchain

![Landing page](https://github.com/dustyapi/solana-ticketing-system/assets/88740093/c4ef69f6-020d-4d5e-ad7c-dbdbb926b0d1)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)

## Overview

The title explains most of what this project is about; however, I'll add some backstory to this.

Last year, right around the time hackout2022 concluded, I visited Lollapalooza, where, to my excitement (me being a crypto nerd), I found a stall by [budx.lemonade.social](https://budx.lemonade.social/) where they were minting NFTs, and each NFT let you claim a free beer from their stand.

Pretty sweet.

The system, however, was pretty bugged. The NFT minting itself was free, and on top of that, there was no authentication as you were minting the NFT. Me and my friends ended up abusing that system and getting a couple of free beers thanks to it ;)

This year, about a month ago, I figured out how I could put together a system that mints NFTs as the tickets and, on top of it, adds functionality to let the user generate QR codes for such mini events where the user can redeem freebies with it, and hackout2023 seemed like a pretty nice opportunity to implement it, so here we are XD

## Why a blockchain based ticketing system


Adoption issues aside, there is a huge market for aftermarket sales of tickets.

A ticket that you for an event like Lollapalooza or rather lets say a IND v PAK cricket match almost always has reselling potential.

The barrier to this reselling is that you don't know the person who you could buy such a ticket from or who you could sell it to. This potential is one nft marketplace away from being unlocked if the tickets are blockchain based, and ofcourse the org that builds the system gets a cut from the additional transactions.

So by using NFTs for tickets we achieve the following
1. Ability to eventually re-sell tickets in a trust less manner, and since fair market conditions can be provided the price will be more reasonable for the general public.
2. Retaining the ticket as a digital collectible forever.
3. Added utiity can be provied because the above, for example merch if you attend all x types of events in a chain of events.


## Features

- Each ticket is associated with a unique QR code, and once the QR code is scanned, the NFT itself can be transferred to another user (via sale on some marketplace). However, the original user won't have the ability to generate a new QR code using that same NFT.

- To protect against spam, especially in the case of highly popular events, the smart contract in use automatically detects and blocks spamming attempts. It also imposes a non-refundable fee on spammers!

- Due to the project being on solana, the tx cost is pretty much zero. And whatever cost that does go into minting the nft, it can be recovered by burning the NFT later if the buyer wishes to do so!


## Usage

Frontend (NextJS)

```bash
git clone https://github.com/dustyapi/solana-ticketing-system
cd ./frontend
npm i && npm run dev 
```
For the qr code scanning app (Expo+ReactNative)
```bash
cd ./scanner-app 
npm i && npx expo
```
## Smart-contracts and Starter kits I used

This repository utilises the open source smartcontract developed by the team at @metaplex called candymachine for the fair minting of NFTs.

1. https://github.com/metaplex-foundation/candy-machine-ui (UI STARTER KIT)
2. https://docs.metaplex.com/programs/candy-machine/overview (SMARTCONTRACT)


## Demo

dApp UI

https://github.com/dustyapi/solana-ticketing-system/assets/88740093/296abfe6-6efe-47d9-a7a8-0256515182a8



Ticket scanning app UI

https://github.com/dustyapi/solana-ticketing-system/assets/88740093/ea7f24fa-c6a0-498b-8821-af238fc8699a



