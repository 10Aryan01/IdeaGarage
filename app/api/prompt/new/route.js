import { connectToDb } from "@utils/database";
import Prompt from "@model/prompt";
export const POST =async(req)=>
{
    const {userId,prompt,tag}=await req.json();
    try {
        await connectToDb();
        const newPrompt=await Prompt({
            creator: userId,
            prompt:prompt,
            tag:tag,
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{
            status:201
        })
    } catch (e) {
        return new Response("Failed to create the prompt",{
            status:501
        })
    }

}