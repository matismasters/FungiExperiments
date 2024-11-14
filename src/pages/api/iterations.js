import {
  uploadExperimentIterationData,
  uploadExperimentIterationPhoto,
} from "../../db/iterations";
import { uploadImage } from "../../db/buckets";
import { linkSubstratumsToExperiment } from "../../db/substratums";

export async function POST({ request }) {
  const payload = await request.json();

  const prom3 = uploadImage(payload);
  const prom1 = uploadExperimentIterationData(payload);
  const prom2 = linkSubstratumsToExperiment(payload);

  const [res1, res2, res3] = await Promise.all([prom1, prom2, prom3]);

  if (res1.error || res2.error || res3.error) {
    return new Response(
      JSON.stringify(res1.error || res2.error || res3.error),
      {
        status: 400,
      }
    );
  }

  return new Response(JSON.stringify("ok"), { status: 201 });
}
