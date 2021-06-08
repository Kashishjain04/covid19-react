export default function seo(data = {}) {
  data.title = data.title || "Covid-19 India";
  data.metaDescription =
    data.metaDescription ||
    "dashboard for data and resources for covid pandemic in india.";

  document.title = data.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", data.metaDescription);
}
