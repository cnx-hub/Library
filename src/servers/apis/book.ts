import request from "../index";

export function getRankingBooks(start = 0) {
  return request.get(`/books/ranking?start=${start}`);
}

export function getRecommendedBooksByUserId(uid: number) {
  return request.get(`/books/recommend/${uid}`);
}
