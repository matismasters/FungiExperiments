import { uploadExperimentIterationData } from "../../db/iterations";
import { uploadImage } from "../../db/buckets";
import { linkSubstratumsToExperiment } from "../../db/substratums";
import { checkAllErrorsInIteration } from "./errors";
import {
  finishExperiment,
  changeToFructification,
} from "../../db/experiments";

export async function POST({ request }) {
  const payload = await request.json();

  //check errors
  const err = await checkAllErrorsInIteration(payload);
  if (err) {
    return new Response(JSON.stringify({ message: err }, { status: 400 }));
  }

  //upload image to the bucket
  const prom3 = uploadImage(payload);
  //upload the data of the iteration
  const prom1 = uploadExperimentIterationData(payload);
  //add substratums, if the user sent them
  const prom2 = linkSubstratumsToExperiment(payload);
  //change to fructification if the user wants
  const prom4 = changeToFructification(payload);

  const [res1, res2, res3, res4] = await Promise.all([
    prom1,
    prom2,
    prom3,
    prom4,
  ]);

  //set the experiment as finished if the user sent the data
  const { data, error } = await finishExperiment(payload);

  if (res1.error || res2.error || res3.error || res4.error) {
    return new Response(
      JSON.stringify({
        message:
          res4.error?.message ||
          res1.error?.message ||
          res2.error?.message ||
          res3.error?.message,
      }),
      {
        status: 400,
      }
    );
  }
  return new Response(JSON.stringify({ message: "ok" }), { status: 201 });
}
