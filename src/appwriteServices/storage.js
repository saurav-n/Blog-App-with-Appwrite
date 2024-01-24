import { envVars } from "../importEnvVars/importEnvVars";
import { Client, Storage, ID } from "appwrite";

class StorageService{
    constructor(){
        this.client=new Client()
            .setEndpoint(envVars.appUrl)
            .setProject(envVars.appProjectId)
        this.storage=new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(envVars.appBucketId,ID.unique(),file)
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(envVars.appBucketId,fileId)
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId){
        const filePreview=this.storage.getFilePreview(envVars.appBucketId,fileId)
        if(filePreview) return filePreview
        return null
    }
}

export const storageService=new StorageService()
