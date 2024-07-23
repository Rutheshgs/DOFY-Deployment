import { GetServerSideProps } from "next";

function generateSiteMap(URL: string, posts: Array<{ name: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
       ${posts
      .map((item) => {
        return `
             <url>
                 <loc>${`${URL}/${item.name}`}</loc>
                 <lastmod>${new Date()}</lastmod>
         </url>
           `;
      })
      .join("")}
     </urlset>
   `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const location = context.query.location as string;
  const findedURL = `${protocol}://${context.req.headers.host}/${context.query.ln}`;

  let url = findedURL.replace('/sitemap.xml', '');

  const pages = [
    { name: location },
    { name: "about-us" },
    { name: "contact-us" },
    { name: "faq" },
    { name: "terms-of-use" },
    { name: "privacy-policy" },
    { name: `${location}/view-orders` },
    { name: `${location}/saved-address` },
  ];

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(url, pages);

  context.res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default function SiteMap() { }