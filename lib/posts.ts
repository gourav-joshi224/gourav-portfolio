export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export async function getAllPosts(): Promise<Post[]> {
  return [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
