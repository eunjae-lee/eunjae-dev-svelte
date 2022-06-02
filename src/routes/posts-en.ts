export const get = async () => {
    const files = import.meta.glob('./post/en/*.svx')
    const entries = Object.entries(files)

    const allPosts = await Promise.all(
        entries.map(async ([path, resolver]) => {
            const { metadata } = await resolver()
            const postPath = path.slice(1, -1 * '.svx'.length)

            return {
                meta: metadata,
                path: postPath,
            }
        })
    )

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.created_at).getTime() - new Date(a.meta.created_at).getTime()
    })

    return {
        body: { posts: sortedPosts }
    }
}