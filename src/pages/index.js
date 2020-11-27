import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { COLORS } from "../constants.js"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  Artist,
  BottomEdgeDown,
  BottomEdgeUp,
} from "./pageStyles/pageStyles"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedMovies,
          homePageHeaderDescription,
          homePageHeaderPicture,
          homePageHeaderTitle,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            homePageDescription
            homePageHeaderDescription
            homePageHeaderTitle
            homePageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homePageFeaturedMovies {
              ... on WPGraphql_Movie {
                id
                movie {
                  title
                  poster {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 100, grayscale: true) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
            altText={homePageHeaderPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured movies</h2>
          <div className="artist-items">
            {homePageFeaturedMovies.map(({ movie, slug }) => (
              <Artist key={slug} to={`/${slug}`}>
                <Image
                  fluid={movie.poster.imageFile.childImageSharp.fluid}
                  altText={movie.poster.altText}
                />
                <div className="artist-info">
                  <p>{movie.title}</p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
