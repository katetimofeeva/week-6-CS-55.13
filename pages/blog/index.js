import Layout from "@/components/layout";
import { getAllArticles } from "../../lib/getBlogData";
import Link from "next/link";

export async function getStaticProps(params) {
  const blogs = getAllArticles();
  return {
    props: { blogs },
  };
}
const Blog = ({ blogs }) => {
  return (
    <Layout
      isHomePage={false}
      to={"/"}
    >
      <div className="container">
        <h1
          className="text-center mt-5 mb-3
        "
        >
          Blog
        </h1>
        <article className="row g-4">
          {blogs?.length ? (
            blogs.map(({ id, author, content, date, title, tags }) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={id}
                >
                  <div className="card text-center h-100">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title fw-bold">{title}</h5>
                      <p className="card-text">{content}</p>
                      <p>{date}</p>
                      <div className="mb-2">
                        {tags?.length &&
                          tags?.map(tag => {
                            return (
                              <span
                                className="badge  text-bg-info ms-1"
                                key={tag}
                              >
                                {tag}
                              </span>
                            );
                          })}
                      </div>
                      <Link
                        href={`/blog/${id}`}
                        className=" list-group-item list-item-action hover-link bg-btn fw-bold"
                      >
                        More...
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>we do not have any articles</h3>
          )}
        </article>
      </div>
      ;
    </Layout>
  );
};

export default Blog;
