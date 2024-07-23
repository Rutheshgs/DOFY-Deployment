import { SSRDetection } from "@/components/helper/Helper";
import { HelperConstant } from "@/components/helper/HelperConstant";
import MasterServices from "@/services/Master.Services";
import { GetServerSideProps } from "next";

function generateSiteMap(URL: any, pages: Array<{ ProductTypeName: string, Name: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${URL}</loc>
         <lastmod>${new Date()}</lastmod>
       </url>
       ${pages.map((item) => {
    return `
        <url>
         <loc>${URL}/${item.Name.toLowerCase()?.replaceAll('-', "_")}</loc>
         <lastmod>${new Date()}</lastmod>
       </url>`
  }).join('')}
     </urlset>
   `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let language = SSRDetection(context as any, "lan");
  let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

  let ProductTypeNamePath = context.query.device as string;
  let PathFilter = ProductTypeNamePath.search("old");
  let ProductTypeName = ProductTypeNamePath.slice(PathFilter + "old-".length);

  let branddata = await MasterServices.GetBrandMasterByProductName(ProductTypeName?.replaceAll('-', "_"), HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
  let selectBrand = await (branddata.status === 200 && branddata.data);

  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const findedURL = `${protocol}://${context.req.headers.host}${context.req.url}`;

  let url = findedURL.replace('/sitemap.xml', '');

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(url, selectBrand);

  context.res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default function SiteMap() { }