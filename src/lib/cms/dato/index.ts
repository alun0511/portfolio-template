import { GraphQLClient } from "graphql-request";
import { cache } from "react";

const endpoint = "https://graphql.datocms.com/";

// const cacheConfig = (
//   nextFetchRequestConfigOverride: NextFetchRequestConfigOverride = {}
// ): NextFetchRequestConfig =>
//   process.env.NODE_ENV === "production"
//     ? nextFetchRequestConfigOverride.production || {
//         // This should probably be set on the specific request, but graphql-request doesn't
//         // currently support that. See https://github.com/jasonkuhrt/graphql-request/issues/537
//         tags: ["cms"],
//       }
//     : nextFetchRequestConfigOverride.development || { revalidate: 30 };

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
