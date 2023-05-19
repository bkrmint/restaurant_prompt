import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
// Get (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    // const prompts = await Prompt.findById(params.id).populate('creator');
    const prompts = await Prompt.findById(params.id);

    if (!prompts) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// patch (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// delete (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findByIdAndRemove(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Prompt deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
