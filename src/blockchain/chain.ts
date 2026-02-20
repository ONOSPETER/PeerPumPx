import { v4 as uuidv4 } from "uuid";

export interface TokenPost {
  id: string;
  contractAddress: string;
  poster: string;
  timestamp: number;
  endorsements: string[];
  likes: string[];
  dislikes: string[];
  priceAtPost: number;
}

let chain: TokenPost[] = [];
let ratings: Record<string, number> = {};

export const getRating = (user: string) => {
  if (!ratings[user]) ratings[user] = 20;
  return ratings[user];
};

export const updateRating = (user: string, delta: number) => {
  ratings[user] = getRating(user) + delta;
};

export const addPost = (ca: string, poster: string) => {
  const post: TokenPost = {
    id: uuidv4(),
    contractAddress: ca,
    poster,
    timestamp: Date.now(),
    endorsements: [],
    likes: [],
    dislikes: [],
    priceAtPost: Math.random() * 100
  };
  chain.push(post);
  return post;
};

export const getPosts = () => chain;

export const endorse = (postId: string, user: string) => {
  const post = chain.find(p => p.id === postId);
  if (post && !post.endorsements.includes(user)) {
    post.endorsements.push(user);
  }
};

export const vote = (postId: string, user: string, type: "like" | "dislike") => {
  const post = chain.find(p => p.id === postId);
  if (!post) return;
  if (type === "like" && !post.likes.includes(user)) post.likes.push(user);
  if (type === "dislike" && !post.dislikes.includes(user)) post.dislikes.push(user);
};

export const simulateLifecycle = () => {
  chain.forEach(post => {
    const multiplier = Math.random() * 5;
    if (multiplier > 2) {
      updateRating(post.poster, 5);
      post.endorsements.forEach(u => updateRating(u, 3));
    } else {
      updateRating(post.poster, -5);
      post.endorsements.forEach(u => updateRating(u, -3));
    }
  });
};