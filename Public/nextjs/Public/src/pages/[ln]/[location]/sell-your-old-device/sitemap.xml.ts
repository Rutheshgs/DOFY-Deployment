import { SSRDetection } from "@/components/helper/Helper";
import { HelperConstant } from "@/components/helper/HelperConstant";
import MasterServices from "@/services/Master.Services";
import { GetServerSideProps } from "next";

function generateSiteMap(URL: string, pages: Array<{ ProductTypeName: string, Name: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${URL}</loc>
         <lastmod>${new Date()}</lastmod>
       </url>
       ${pages.map((item) => {
    return `
        <url>
         <loc>${URL.replace('device', item.Name.toLowerCase()?.replaceAll(' ', "-"))}</loc>
         <lastmod>${new Date()}</lastmod>
       </url>`
  }).join('')}
     </urlset>
   `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let language = SSRDetection(context as any, "lan");
  let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

  let productListRes = await MasterServices.GetAllProductType(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
  let productList = await (productListRes.status === 200 && productListRes.data);

  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const findedURL = `${protocol}://${context.req.headers.host}${context.req.url}`;

  let url = findedURL.replace('/sitemap.xml', '');

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(url, productList);


  context.res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default function SiteMap() { }