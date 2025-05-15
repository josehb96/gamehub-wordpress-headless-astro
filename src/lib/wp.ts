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