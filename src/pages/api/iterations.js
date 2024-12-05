import { uploadExperimentIterationData } from "../../db/iterations";
import { uploadImage } from "../../db/buckets";
import { linkSubstratumsToExperiment } from "../../db/substratums";
import { finishExperiment, getExperiment } from "../../db/experiments";

export async function POST({ request }) {
  const payload = await request.json();

  const { data: exp, error: expError } = await getExperiment(payload.exp_id);
  if (exp[0].exp_terminado) {
    return new Response(
      JSON.stringify({ message: "El experimento ya esta finalizado" }),
      {
        status: 400,
      }
    );
  }

  //upload image to the bucket
  const prom3 = uploadImage(payload);
  //upload the data of the iteration
  const prom1 = uploadExperimentIterationData(payload);
  //add substratums, if the user sent them
  const prom2 = linkSubstratumsToExperiment(payload);

  const [res1, res2, res3] = await Promise.all([prom1, prom2, prom3]);

  //set the experiment as finished if the user sent the data
  const { data, error } = await finishExperiment(payload);

  if (res1.error || res2.error || res3.error) {
    return new Response(
      JSON.stringify({
        message:
          res1.error?.message || res2.error?.message || res3.error?.message,
      }),
      {
        status: 400,
      }
    );
  }
  return new Response(JSON.stringify({ message: "ok" }), { status: 201 });
}
