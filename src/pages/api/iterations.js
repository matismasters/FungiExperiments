import { uploadExperimentIterationPhoto } from "../../db/iterations";
import { linkSubstratumsToExperiment } from "../../db/substratums";

export async function POST({ request }) {
  const payload = await request.json();

  let { data, error } = await uploadExperimentIterationPhoto(payload);
  if (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  //add the substratums to the experiment if there is a need to
  const { data: d, error: e } = await linkSubstratumsToExperiment(payload);
  if (e) {
    return new Response(JSON.stringify(e), { status: 400 });
  }

  return new Response(JSON.stringify("ok"), { status: 201 });
}
