import apiClient from "@/lib/cms/dato";
import { LinkFragmentFragmentDoc } from "@/types/graphql";
import NextLink from "next/link";

export default async function Link() {
  const data = await apiClient().request({
    document: LinkFragmentFragmentDoc,
  });

  console.log(data);

  return (
    <>
      {data && (
        <NextLink
          href={`${data.externalLink ? data.externalLink : data.linkTitle}`}
        >
          {data.text}
        </NextLink>
      )}
    </>
  );
}
