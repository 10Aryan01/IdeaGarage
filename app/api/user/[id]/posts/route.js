import { connectToDb } from "@utils/database"
import Prompt from "@model/prompt";
export const GET= async(res,{params})=>
{
    try {
        await connectToDb();
        const post_for_uid=await Prompt.find({creator:params.id}).populate("creator");
        return new Response(JSON.stringify(post_for_uid),{
            status:201
        });
    } catch (e) {
        return new Response("Error in server",{
            status:501,
        })
    }

}