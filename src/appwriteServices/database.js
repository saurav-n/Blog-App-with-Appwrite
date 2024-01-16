import { envVars } from "../importEnvVars/importEnvVars";
import { Client, Databases,Query } from "appwrite";

class DatabaseService{
    constructor(){
        this.client=new Client()
            .setEndpoint(envVars.appUrl)
            .setProject(envVars.appProjectId)
        this.databases=new Databases(this.client)
    }

    async createBlog({tittle,slug,content,status,featuredImgId,userId}){
        try {
            return await this.databases.createDocument(
                envVars.appDBID,
                envVars.appCollectionId,
                slug,
                {
                    tittle,
                    content,
                    status,
                    featuredImgId,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deleteBlog(slug){
        try {
            return await this.databases.deleteDocument(envVars.appDBID,envVars.appCollectionId,slug)
        } catch (error) {
            throw error
        }
    }

    async updateBlog({tittle,content,slug,featuredImgId,status}){
        try {
            return await this.databases.updateDocument(
                envVars.appDBID,
                envVars.appCollectionId,
                slug,
                {
                    tittle,
                    content,
                    status,
                    featuredImgId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async getBlog(slug){
        try {
            return await this.databases.getDocument(envVars.appDBID,envVars.appCollectionId,slug)
        } catch (error) {
            throw error
        }
    }

    async getBlogs(queries=[]){
        try {
            return await this.databases.listDocuments(
                envVars.appDBID,
                envVars.appCollectionId,
                [
                    ...queries,
                    Query.equal('status','active')
                ]
            )
        } catch (error) {
            throw error
        }
    }
}

export const dbService=new DatabaseService()