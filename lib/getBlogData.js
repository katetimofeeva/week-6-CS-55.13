import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "blog.json");

const parseDataFromJson = filePath => {
  const jsonStr = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonStr);
};

export function getAllArticles() {
  const data = parseDataFromJson(filePath);
  return data;
}

export function getAllBlogIds() {
  const data = parseDataFromJson(filePath);
  return data.map(({ id }) => ({ params: { id: id.toString() } }));
}

export function getArticle(id) {
  const filePeoplePath = path.join(dataDir, "people.json");
  const dataBlog = parseDataFromJson(filePath);
  const dataPeople = parseDataFromJson(filePeoplePath);

  const article = dataBlog.filter(blog => blog.id.toString() === id);

  const authorName = dataPeople.filter(
    person => person.id === article[0].author.toString()
  );

  if (article.length) {
    return { ...article[0], author: authorName[0].name };
  } else {
    return {};
  }
}
