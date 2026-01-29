import {SyncModel} from "../types/SyncModel";
import {BlobsRepository} from "../repositories/blopsRepository";
import {toDomainBlob} from "../utlis/helpers";

export abstract class SyncService {
    static async push({localBlobs} : SyncModel.PushBody,userId: number) {
        try {
            await Promise.all(localBlobs.map(async blob =>
                    BlobsRepository.addBlob(
                        toDomainBlob(blob),
                        userId
                    )
                )
            );
        }catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async pull(since :number,userId : number){
        const blobs =  await BlobsRepository.getAllByIdAndUpdatedAt(since, userId);
        console.log(blobs);
        return blobs;
    }
}