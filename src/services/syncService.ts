import {SyncModel} from "../types/SyncModel";
import {BlobsRepository} from "../repositories/blopsRepository";

export abstract class SyncService {
    static async push({localBlobs} : SyncModel.PushBody,userId: number) {
        await Promise.all(localBlobs.map(async blob => BlobsRepository.addBlob(blob,userId)));
    }

    static async pull(since :bigint,userId : number){
        return await BlobsRepository.getAllByIdAndUpdatedAt(since, userId);
    }
}