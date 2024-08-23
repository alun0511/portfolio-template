import apiClient from "@/lib/cms/dato";
import { NavigationDocument } from "@/types/graphql";

export default async function Navigation() {
  const data = await apiClient().request({
    document: NavigationDocument,
  });
  return (
    <>
      {data.navigation?.navigationLinks.map((link, index) => {
        return <a href={"/"}>{link.externalLink ?? link.linkTitle ?? ""}</a>;
      })}
    </>
  );
}
