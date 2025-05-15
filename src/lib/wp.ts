const domain = import.meta.env.WP_DOMAIN
const apiUrl = `${domain}/wp-json/wp/v2`

export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`)
  if (!response.ok) {
    throw new Error("Failed to fetch page info")
  }

  // const data = await response.json()
  // const { title, content } = data[0]
  // This is a desctructuring assignment to extract title and content from the first element of the data array,
  // but we can use the first option that I have commented out above
  const [data] = await response.json()
  const { title: {rendered: title}, content: {rendered: content} } = data

  return { title, content } 
}

export const getLatestPosts = async ({perPage = 10}: {perPage?: number} = {}) => {
  const response = await fetch(`${apiUrl}/posts?per_page=${perPage}`)
  if (!response.ok) throw new Error("Failed to fetch latest posts")

  const results = await response.json()
  if (!results.length) throw new Error("No posts found")

  const posts = results.map((post: any) => {

    /* 
    const title = post.title.rendered
    const excerpt = post.excerpt.rendered
    const content = post.content.rendered
    const date = post.date
    const slug = post.slug
    // Or we can do this with the last 2
    const { date, slug } = post
    */

    // This is the simplified version of the above code
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug
    } = post

    return {title, excerpt, content, date, slug}
  })

  return posts 
}