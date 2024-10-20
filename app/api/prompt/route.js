import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB();
        const res = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(res), { status: 200 }); 
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}