import { connectToDb } from "@utils/database";
import Prompt from "@model/prompt";
export const GET = async (request) => {
  try {
    await connectToDb();
    const allprompt = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(allprompt), {
      status: 201,
    });
  } catch (e) {
    return new Response("Server error", {
      status: 501,
    });
  }
};
