import {SyncModel} from "../types/SyncModel";

const fromBase64 = (b64: string): Uint8Array =>
    Uint8Array.from(atob(b64), c => c.charCodeAt(0));


export const toDomainBlob = (blob: SyncModel.PushBody["localBlobs"][number]) => ({
    ...blob,
    ciphertext: fromBase64(blob.ciphertext),
    iv: fromBase64(blob.iv)
});

