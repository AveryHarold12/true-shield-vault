export interface FhevmInstance {
  createFhevmInstance: (params: FhevmInstanceParams) => Promise<FhevmInstance>;
  encrypt8: (value: number) => Promise<Uint8Array>;
  encrypt16: (value: number) => Promise<Uint8Array>;
  encrypt32: (value: number) => Promise<Uint8Array>;
  decrypt: (handle: Uint8Array) => Promise<number>;
}

export interface FhevmInstanceParams {
  chainId: number;
  publicKey: Uint8Array;
}

export interface EncryptionResult {
  handles: Uint8Array[];
  publicKey: Uint8Array;
}

export interface DecryptionRequest {
  contractAddress: string;
  handles: Uint8Array[];
  userAddress: string;
}

export type GamePreference = 'pvp' | 'pve' | 'economic' | 'others';
