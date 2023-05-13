import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, res) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('error', error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
export const POST = async (req, res) => {
    const { search_query } = await req.json()
    let prompts
    try {
        await connectToDB()
        const searchQuery = {
            $or: [
                { prompt: { $regex: new RegExp(search_query, "i") } },
                { tag: { $regex: new RegExp(search_query, "i") } },
            ]
        };
        if (!search_query) {
            prompts = await Prompt.find({}).populate('creator')
        } else {
            prompts = await Prompt.find(searchQuery).populate('creator')
        }
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('error', error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}