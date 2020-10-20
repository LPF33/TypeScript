import axios, { AxiosRequestConfig } from "axios";
import cheerio from "cheerio";

const siteUrl = "https://de.wikipedia.org/wiki/Mo%C3%A4lven";

interface TFetchData {
    url: AxiosRequestConfig;
    data: cheerio.Root;
}

const fetchData = async (): Promise<TFetchData> => {
    const result = await axios.get(siteUrl);
    return { url: result.config, data: cheerio.load(result.data) };
};

interface TResult {
    url: string | undefined;
    text: string;
    content: string[];
    summary: string;
}

const tableOfContent: Set<string> = new Set();

export const getResults = async (): Promise<TResult> => {
    const { url, data } = await fetchData();

    data(".mw-content-ltr .toc ul").each((index, element) => {
        tableOfContent.add(data(element).text());
    });

    const summary: string = data(".mw-body-content p").slice(3, 6).text();

    return {
        url: url.url,
        text: data("title").text(),
        content: [...tableOfContent],
        summary,
    };
};
