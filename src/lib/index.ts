import type { RegistrationParsed } from "@passwordless-id/webauthn/dist/esm/types";
import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable } from "svelte/store";


export type Credential = {
    id: string;
    publicKey: string;
    algorithm: 'RS256' | 'ES256';
}

export const registered = writable(false);
export const credential = localStorageStore<Credential | undefined>("credential", undefined);
export const username = localStorageStore<string>("username", "");