import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SubscriptionBanner from "../components/banner"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { StaticImage } from "gatsby-plugin-image"
import logo from "/src/images/logo.png"
import { useBreadcrumb } from "gatsby-plugin-breadcrumb"
import MyCustomBreadcrumb from "../components/breadcrumbs"

const BlogIndex = ({ data, location }) => {
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(3)
  const [enabled, setEnabled] = useState(true)

  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel: "How to",
    crumbSeparator: " > ",
  })

  const showMoreItems = () => {
    if (data.allMarkdownRemark.totalCount > visible) {
      setVisible(prevValue => prevValue + 3)
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }

  console.log(data)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  let header
  header = <img style={{ width: "50px" }} src={logo} alt="Logo" />
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} crumbLabel="How to">
        <Seo title="All posts" />

        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <div className="viewed" style={{ width: "90%", paddingTop: "3em" }}>
        <div
          style={{
            color: "#FFA100",
            fontSize: "36px",
            fontWeight: "700",
            marginTop: "5%",
            marginBottom: "0%",
          }}
        >
          How to
        </div>
        <MyCustomBreadcrumb crumbs={crumbs} />
        <div
          style={{
            fontWeight: "500",
            marginBottom: "1%",
            fontSize: "20px",
          }}
        ></div>
        <hr style={{ margin: 0 }}></hr>
      </div>

      <Box
        sx={{ flexGrow: 1 }}
        marginLeft={{ sm: "72px", xs: "0px" }}
        marginRight={{ sm: "72px", xs: "0px" }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          {posts.slice(0, visible).map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <Grid item xs={10} md={4} sm={6} key={post.fields.slug}>
                <article
                  style={{ width: "100%" }}
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <Link to={post.fields.slug} itemProp="url">
                      {" "}
                      <GatsbyImage
                        image={getImage(post.frontmatter.image)}
                        key=""
                        alt={title}
                        imgStyle={{
                          borderRadius: "5px",
                          boxShadow: "1px 1px 1px 2px rgba(0, 0, 0, 0.05)",
                        }}
                        style={{
                          borderRadius: "5px",
                          boxShadow: " 1px 1px 1px 2px rgba(0, 0, 0, 0.05)",
                          height: "270px",
                        }}
                      />
                    </Link>
                    <div className="text_flex_pages">
                      <div className="timer">
                        <StaticImage
                          layout="fixed"
                          formats={["auto", "webp", "avif"]}
                          src="../images/timer.png"
                          quality={100}
                          alt="timer image"
                        />
                        <div className="timeread">
                          &#160;{post.timeToRead} mins
                        </div>
                      </div>
                    </div>

                    <h1 className="h2_arc">
                      <Link
                        to={post.fields.slug}
                        itemProp="url"
                        className="link_news"
                      >
                        {title}
                      </Link>
                    </h1>

                    <div></div>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description ,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <div style={{ textAlign: "center" }}>
        {/* If there are stills post to show, show the button enabled, otherwise disabled it */}
        {enabled ? (
          <button onClick={showMoreItems} className="loadmore">
            Load more
          </button>
        ) : (
          <button onClick={showMoreItems} className="loadmore_disabled">
            Load more
          </button>
        )}
      </div>
      <SubscriptionBanner postName={"news-page"} tag={"News"} />
      <footer>
        <div className="footer_li">
          <ul>
            <div className="ul">About us</div>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/press/"
                target="_blank"
              >
                Press
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/careers/"
                target="_blank"
              >
                Careers
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/referral-program/"
                target="_blank"
              >
                Referral Program
              </a>
            </li>
          </ul>
          <ul>
            <div className="ul">Support</div>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/faqs/"
                target="_blank"
              >
                FAQs
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/manuals/"
                target="_blank"
              >
                Manuals
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/contact/"
                target="_blank"
              >
                Contact us
              </a>
            </li>
          </ul>
          <ul>
            <div className="ul">Legal</div>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/terms-conditions/"
                target="_blank"
              >
                Terms
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/privacy-policy/"
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/warranty/"
                target="_blank"
              >
                Warranty
              </a>
            </li>
            <li className="li">
              <a
                className="link_li"
                href="https://customsurgical.co/shipping/"
                target="_blank"
              >
                Shipping
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom_footer">
          <hr></hr>
          <div>Custom Surgical</div>
        </div>
      </footer>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: "How to" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      totalCount
    }
  }
`
