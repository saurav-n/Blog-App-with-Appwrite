import { envVars } from "../importEnvVars/importEnvVars";
import { Client, Account, ID } from "appwrite";
class AuthService{
    constructor(){
        const client=new Client()
            .setEndpoint(envVars.appUrl)
            .setProject(envVars.appProjectId)
        const account=new Account(this.client)
    }

    async createUserAccount({email,password}){
        try{
            const newUserAccount=await this.account.create(ID.unique(),email,password)
            if(newUserAccount){
                return await this.logIn({email,password})
            }
            else return newUserAccount
        }
        catch(error){
            throw error
        }
    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export const authService=new AuthService()