import { Astro } from "astro";
import { getExperiment } from "../../db/experiments";

export async function GET({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const { data, error } = await getExperiment(id);
  if (error) {
    return new Response(JSON.stringify(error.message), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
