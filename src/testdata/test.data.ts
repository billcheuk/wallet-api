export const testData = {
    masterSeed:
        'bb432495b8d81951b25ff3ba2d6dde9f30680cdaad66d71053454fa507668cd98d5c0b73bb2c509d68d65cb879110623be324e0f76bd0a7af122991f99cd7089',
    invalidmasterSeedTooShort: 'bb432495b8d81951b25ff3ba2d6dde9f30623be324e0',
    invalidmasterSeedTooLong:
        'bb432495b8d81951b25ff3ba2d6dde9f30680cb73bb2c509d68d65cb879110623be324e0f76bd0a7af122991f99cd7089bb432495b8d81951b25ff3ba2d6dde9f30680cdaad66d71053454fa507668cd98d5c0b73bb2c509d68d65cb879110623be324e0f76bd0a7af122991f99cd7089',
    hdPath: "m/44'/0'/0'/0/0",
    invalidHDPathNotStartWithM: "/44'/0'/0'/0/0",
    invalidHDPathNotNumber: "m/44'/q'/0'/0/0",
    childKey: {
        privateKey: 'f1ebbbb043bd7aaf03ca4a5f18c547a368ab15afa99d186560a711980a249b92',
        publicKey: '032bcf4e88a2467034c8f8db0923492006aca885771077b251897f4a656b094c54',
    },
    p2pkhAddress: '1epDksx7dxpjF1dU82YNHpCiy9XYXqGz1',
    p2wpkhAddress: 'bc1qqunvanrnp0r5n0t5ml3dfnk4pdpxfs7wzdkyqj',

    m: 2,
    publicKeys: [
        '0491bba2510912a5bd37da1fb5b1673010e43d2c6d812c514e91bfa9f2eb129e1c183329db55bd868e209aac2fbc02cb33d98fe74bf23f0c235d6126b1d8334f86',
        '04865c40293a680cb9c020e7b1e106d8c1916d3cef99aa431a56d253e69256dac09ef122b1a986818a7cb624532f062c1d1f8722084861c5c3291ccffef4ec6874',
        '048d2455d2403e08708fc1f556002f1b6cd83f992d085097f9974ab08a28838f07896fbab08f39495e15fa6fad6edbfb1e754e35fa1c7844c41f322a1863d46213',
    ],
    InvalidPublicKeys: [
        '0491bba2510912a2c514e91bfa9f2eb129e1c183329db55bd868e209aac2fbc02cb33d98fe74bf23f0c235d6126b1d8334f86',
        '',
        'publicKey',
    ],
    p2msAddress: '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC',
    sha256: '008416eb6245cde00b56ad3a70be1aca7333c0f31509a6bd0c68e9f80df9dbb6',
    ripemd160: 'eff748f3774f930c2a4571cc7832082dc2629fe3',
    sha256Sha256: 'e12b9f9a18de5729934d438e49162a5cd105017acff77d940a8c5621e93f064b',
    sha256Ripemd160: '0726cecc730bc749bd74dfe2d4ced50b4264c3ce',
    hmacSha512:
        'ca85e30957c24f9c79b3a7d25b9828f41eeb40d900d4b218f7b64bf4dfffeb245705de4dbc5bec4d773f602714d78ef15867d7b82fe796800e0a5fa6e7e24d1e',
    encodeBs58: 'wdxzC4Ai37xoaiKDHUBgjpnseLKgcwpuWAcRtUHd2zCj',
    encodeBech32: '1qqv4u7n5g5fr8qdxglrdsjg6fyqr2e2y9wug80vj339l55ettp9x9g95tru8',
};
