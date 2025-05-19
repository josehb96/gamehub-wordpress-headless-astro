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

export const getAllPostsSlugs = async () => {
  const response = await fetch(`${apiUrl}/posts?per_page=100`)
  if (!response.ok) throw new Error("Failed to fetch posts slugs")

  const results = await response.json()
  if (!results.length) throw new Error("No posts found")

  const slugs = results.map((post: any) => post.slug)
  console.log(slugs)
  return slugs
}

export const getPostInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}/posts?slug=${slug}`)

  if (!response.ok) throw new Error("Failed to fetch post info")

  const [data] = await response.json()
  const { title: {rendered: title}, content: {rendered: content}, yoast_head_json: seo } = data

  return { title, content, seo } 
}

export const getLatestPosts = async ({perPage = 10}: {perPage?: number} = {}) => {
  const response = await fetch(`${apiUrl}/posts?per_page=${perPage}&_embed`)
  if (!response.ok) throw new Error("Failed to fetch latest posts")

  const results = await response.json()
  if (!results.length) throw new Error("No posts found")

  console.log(results)

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

    const featuredImage = post._embedded["wp:featuredmedia"][0].source_url

    return {title, excerpt, content, date, slug, featuredImage}
  })

  return posts 
}