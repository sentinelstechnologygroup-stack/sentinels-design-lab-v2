import { getAllPosts } from "./getAllPosts";

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug || (post.aliases || []).includes(slug)) || null;
}
