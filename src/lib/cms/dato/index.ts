import { GraphQLClient } from "graphql-request";
import { cache } from "react";

const endpoint = "https://graphql.datocms.com/";

type NextFetchRequestConfigOverride = {
  development?: NextFetchRequestConfig;
  production?: NextFetchRequestConfig;
};

const apiClient = (
  nextFetchRequestConfigOverride?: NextFetchRequestConfigOverride
) =>
  new GraphQLClient(endpoint, {
    fetch: cache(fetch),
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      ...(process.env.DATOCMS_ENVIRONMENT
        ? { "X-Environment": process.env.DATOCMS_ENVIRONMENT }
        : {}),
    },
    // next: cacheConfig(nextFetchRequestConfigOverride),
  });

export default apiClient;
