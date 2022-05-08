export interface NetworkVersion {
    bip32: {
        public: number;
        private: number;
    };
    public: number;
    bech32Prefix: string;
}

export enum Network {
    bitcoinMainnet = 'bitcoinMainnet',
    bitcoinTestnet = 'bitcoinTestnet',
}

export const networkVersions: Map<Network, NetworkVersion> = new Map([
    [
        Network.bitcoinMainnet,
        {
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            },
            public: 0,
            bech32Prefix: 'bc',
        },
    ],
    [
        Network.bitcoinTestnet,
        {
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
            public: 0x6f,
            bech32Prefix: 'tb',
        },
    ],
]);
