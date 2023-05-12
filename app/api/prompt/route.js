import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, res) => {
    const { search_query } = await req.json()
    let prompts
    try {
        await connectToDB()

        // prompts = await Prompt.find({}).populate('creator')
        // if (!search_query) {
        //     prompts = await Prompt.find({}).populate('creator')
        // } else {
        //     prompts = await Prompt.find({ prompt: `/${search_query}/` }).populate('creator')
        // }

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('error', error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}