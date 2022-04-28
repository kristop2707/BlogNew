import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Item from "../components/category"
import Bio from "../components/bio"
/*import Blocks from "../components/blocks"*/
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { StaticImage } from "gatsby-plugin-image"


const BlogIndex =  ({data,  location }) => {

  console.log(data)
  
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
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
      <Bio />
      <Item />
      <hr className="line"></hr>
  
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item  >
        <ol style={{ listStyle: `none` }} className="news_block">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          

          return (
            <li key={post.fields.slug} className="list">
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
              <StaticImage
        className="bio-avatar"
      
        src="../images/us.jpg"
        quality={100}
        alt="Profile picture"
      />
      <small>{post.frontmatter.date}</small>
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                
                <div>  
        
   <div >
  {post.frontmatter.tags.map((tag, i) => [
<strong key={i}>
  {tag}
  {i < post.frontmatter.tags.length - 1 ? ', ' : ''}
</strong>
])}</div></div>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
          )
        })}
      </ol>
        </Grid></Grid></Box>
      
      
      
     
  
 

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
          sort: {fields: [frontmatter___date], order: DESC}
          filter: {frontmatter: {tags: {eq: "Medtech"}}}
        ) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              tags
            }
          }
        }
      }
      
`
