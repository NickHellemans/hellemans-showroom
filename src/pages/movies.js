import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  Movie,
  BottomEdgeDown,
  BottomEdgeUp,
} from "./pageStyles/pageStyles"
import { COLORS } from "../constants.js"

const MoviesPage = () => {
  const {
    wpcontent: {
      page: {
        moviesMeta: { moviesPageDescription, moviesPageHeaderPicture },
      },
      movies: { edges: movies },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        movies {
          edges {
            node {
              movie {
                title
                reviewScore
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
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="movies" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={moviesPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={moviesPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>This is the Movie Showroom</h2>
          <p>{moviesPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="movies">
          <h2>Our movies</h2>
          <div className="movie-items">
            {movies.map(({ node: { movie, slug } }) => (
              <Movie key={slug} to={`/${slug}`}>
                <Image
                  fluid={movie.poster.imageFile.childImageSharp.fluid}
                  alt={movie.poster.altText}
                />
                <div className="movie-info">
                  <p>{movie.title}</p>
                  <p>{movie.reviewScore}/10</p>
                </div>
              </Movie>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MoviesPage
