import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import userModel from "@models/user";

export const POST = async (req) => {
    const { search } = await req.json();
    
    try {
        await connectToDB();
        const matchingUsers = await userModel.find({username: {$regex: search, $options: "i"}});
        const userIds = matchingUsers.map((user) => user._id);
        const res = await Prompt.find({$or: [
            { prompt: { $regex: search, $options: "i" } },
            { tag: { $regex: search, $options: "i" } },
            { creator: {$in: userIds} }
        ]}).populate('creator');
        return new Response(JSON.stringify(res), { status: 200 }); 
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}