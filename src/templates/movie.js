import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/artistStyles"

const MovieTemplate = ({
  data: {
    wpcontent: {
      movie: {
        movie,
        genres: { edges: genres },
      },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="movie-container">
          <div className="movie-image">
            <Image
              fluid={movie.poster.imageFile.childImageSharp.fluid}
              alt={movie.poster.alText}
            />
            <div className="roles">
              {genres.map(({ node: genre }) => (
                <div key={genre.name} className="role">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <h3>{movie.director}</h3>
            <p className="description">{movie.description}</p>
            <p className="info">
              <strong>Review: </strong>
              {movie.reviewScore}/10
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MovieTemplate
export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        movie {
          description
          director
          title
          reviewScore
          poster {
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
        id
      }
    }
  }
`
