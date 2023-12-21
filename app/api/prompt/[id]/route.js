import Prompt from "@model/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    else return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to fetch the prompt", { status: 501 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existing_prompt = await Prompt.findById(params.id);

    if (!existing_prompt)
      return new Response("Prompt not found", { status: 404 });

    existing_prompt.prompt = prompt;
    existing_prompt.tag = tag;

    await existing_prompt.save();
    return new Response(JSON.stringify(existing_prompt), { status: 201 });
  } catch (e) {
    return new Response("Server error ", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("The prompt is deleted", { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
};
