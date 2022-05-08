# Wallet - API server
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org) 

  - [Topic](#topic)
  - [Quick Start](#quick-start)
    - [Installation](#installation)
    - [Build Project](#build-project)
    - [Run Server in DEV](#run-server-in-dev)
    - [Run Server in Production](#run-server-in-production)
    - [Run Test Case](#run-test-case)
    - [Run Test Case Coverage](#run-test-case-coverage)
  - [API Documents](#api-documents)
  - [Query Example](#example)
    - [1. Generate a HD SegWit Address](#1-generate-a-hd-segwit-address)
    - [2. Generate a multi-sig P2SH Address](#2-generate-a-multi-sig-p2sh-address)

---

## Topic:
### An API server wrote in Typescript that supports the following operations:
- 1. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
- 2. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys can be specified


---
## Quick Start

## Installation
```sh
git clone https://github.com/billcheuk/wallet-api.git
cd wallet-api
yarn install
```

## Build Project
```sh
yarn build
```

## Run Server in DEV
```sh
yarn dev
# open browser at http://localhost:3000/api-doc
# Access API-Server at http://localhost:3000/api/v1
```

## Run Server in Production 
```sh
yarn start
# open browser at http://localhost:80/api-doc
# Access API-Server at http://localhost:80/api/v1
```

## Run Test Case
```sh
yarn test
```

## Run Test Case Coverage
```sh
yarn coverage
```

---
## API Documents
- DEV: http://localhost:3000/api-doc
- PROD: http://localhost:80/api-doc

---
## Example
### 1. Generate a HD SegWit Address
- curl post /api/v1/p2wpkh
```sh
curl -X 'POST' \
  'http://localhost:3000/api/v1/p2wpkh' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'seed=bb432495b8d81951b25ff3ba2d6dde9f30680cdaad66d71053454fa507668cd98d5c0b73bb2c509d68d65cb879110623be324e0f76bd0a7af122991f99cd7089&path=m%2F44'\''%2F0'\''%2F0'\''%2F0%2F0'
```
- response
```json
{
  "p2pkh": "1epDksx7dxpjF1dU82YNHpCiy9XYXqGz1",
  "p2wpkh": "bc1qqunvanrnp0r5n0t5ml3dfnk4pdpxfs7wzdkyqj"
}
```

### 2. Generate a multi-sig P2SH Address
- curl post /api/v1/p2sh
```sh
curl -X 'POST' \
  'http://localhost:3000/api/v1/p2sh' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "m": 2,
  "pubKeys": [
    "0491bba2510912a5bd37da1fb5b1673010e43d2c6d812c514e91bfa9f2eb129e1c183329db55bd868e209aac2fbc02cb33d98fe74bf23f0c235d6126b1d8334f86",
    "04865c40293a680cb9c020e7b1e106d8c1916d3cef99aa431a56d253e69256dac09ef122b1a986818a7cb624532f062c1d1f8722084861c5c3291ccffef4ec6874",
    "048d2455d2403e08708fc1f556002f1b6cd83f992d085097f9974ab08a28838f07896fbab08f39495e15fa6fad6edbfb1e754e35fa1c7844c41f322a1863d46213"
  ]
}'
```

- response
```json
{
  "address": "3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC"
}
```
