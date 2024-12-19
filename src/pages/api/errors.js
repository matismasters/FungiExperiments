import {
  fructificationNotEnoughData,
  getExperiment,
} from "../../db/experiments";

export const checkAllErrorsInIteration = async (payload) => {
  if (!payload.base64Foto || !payload.iter_foto) {
    return "No se envio una foto";
  }
  //get the experiment from the DB
  const { data: experiment, error } = await getExperiment(payload.exp_id);

  if (!experiment) {
    return "El experimento no existe";
  }
  if (experiment[0]?.exp_terminado) {
    return "El experimento ya ha finalizado";
  }

  const fructificationDataNeededButNotProvided =
    experiment[0]?.exp_fructificacion &&
    (!payload.iter_numero_hongos ||
      !payload.iter_observaciones ||
      !payload.iter_fructification_peso);

  if (fructificationDataNeededButNotProvided) {
    return "No se ha propocionado suficientes datos para la fructificacion";
  }

  const experimentIsInColonization = experiment[0]?.exp_fructificacion == false;

  const colonizationDataNotProvided =
    experimentIsInColonization && !payload?.iter_porcentaje_colonizacion;

  if (colonizationDataNotProvided) {
    return "No se ha proporcionado datos acerca del porcentaje de colonización";
  }
};
