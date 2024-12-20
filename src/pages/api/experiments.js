import { Astro } from "astro";
import { getExperiment, postExperiment } from "../../db/experiments";

export async function GET({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const { data, error } = await getExperiment(id);

  if (error) {
    return new Response(JSON.stringify(error.message), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }) {
  try {
    const body = await request.json();

    const { data, error } = await postExperiment(body);

    if (error) {
      return new Response(JSON.stringify(error.message), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("Cannot parse the JSON", {
      status: 400,
    });
  }
}
