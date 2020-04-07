import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import "../sass/custom.scss";

import { Layout } from "../components/index";
import { getPages, Link, safePrefix } from "../utils";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "all",
    };
  }

  handleFilter = (category) => {
    this.setState({
      activeCategory: category,
    });
  };

  render() {
    const categories = ["all"];
    const { activeCategory } = this.state;
    let display_posts = _.orderBy(
      getPages(this.props.pageContext.pages, "/posts"),
      "frontmatter.date",
      "desc"
    );

    _.map(display_posts, (post, post_idx) =>
      categories.push(_.get(post, "frontmatter.categoriepost"))
    );

    const handleDuplocateCategories = (categories) => {
      let unique = {};
      categories.forEach(function (i) {
        if (!unique[i]) {
          unique[i] = true;
        }
      });
      return Object.keys(unique);
    };

    const newCats = handleDuplocateCategories(categories);

    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner">
            <ul className="categories_filter">
              {newCats.map((category) => (
                <li
                  className="filter_category"
                  onClick={() => this.handleFilter(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="post-feed">
              {_.map(display_posts, (post, post_idx) => {
                if (
                  _.get(post, "frontmatter.categoriepost").indexOf(
                    activeCategory
                  ) < 0 &&
                  activeCategory !== "all"
                )
                  return null;
                return (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(post, "frontmatter.thumb_img_path") && (
                        <Link
                          className="post-card-thumbnail"
                          to={safePrefix(_.get(post, "url"))}
                        >
                          <img
                            className="thumbnail"
                            src={safePrefix(
                              _.get(post, "frontmatter.thumb_img_path")
                            )}
                            alt={_.get(post, "frontmatter.title")}
                          />
                        </Link>
                      )}
                      <div className="post-card-content">
                        <header className="post-header">
                          <h2 className="post-title">
                            <Link
                              to={safePrefix(_.get(post, "url"))}
                              rel="bookmark"
                            >
                              {_.get(post, "frontmatter.title")}
                            </Link>
                          </h2>
                        </header>
                        <div className="post-excerpt">
                          <p>{_.get(post, "frontmatter.excerpt")}</p>
                        </div>
                        <footer className="post-meta">
                          <time
                            className="published"
                            dateTime={moment(
                              _.get(post, "frontmatter.date")
                            ).strftime("%Y-%m-%d %H:%M")}
                          >
                            {moment(_.get(post, "frontmatter.date")).strftime(
                              "%B %d, %Y"
                            )}
                          </time>
                        </footer>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
