import { Configuration } from "openai";

export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID
    })
    
    return config
}