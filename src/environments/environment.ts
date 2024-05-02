import { environment as dev } from "./environment.dev";
import { environment as prod } from "./environment.prod";

export const environment = {
  strapiApiKey:
    process.env.NODE_ENV == "development"
      ? dev.strapiApiKey
      : prod.strapiApiKey ?? "",
  tmdbApiKey:
    process.env.NODE_ENV == "development"
      ? dev.tmdbApiKey
      : prod.tmdbApiKey ?? "",
  tmdbToken:
    process.env.NODE_ENV == "development"
      ? dev.tmdbToken
      : prod.tmdbToken ?? "",
};
