import request from "../index";

export function getRankingBooks(start = 0) {
  return request.get(`/books/ranking?start=${start}`);
}

export function getRecommendedBooksByUserId(uid: number) {
  return request.get(`/books/recommend/${uid}`);
}

export function getBooksByKeyword(keyword: string, start = 0) {
  return request.get(`/books/search`, { keyword, start });
}

export function getBooksByAuthor(author: string, start = 0) {
  return request.get(`/books/authors/${author}?start=${start}`);
}

export function getBooksByTag(tag: string, start = 0) {
  return request.get(`/books/tags/${tag}?start=${start}`);
}

export function getBooksByAdvancedSearch(params: any) {
  return request.get("/books/search/advanced", params);
}

export function getBooksByClassificationNumber(classNum: string, start = 0) {
  return request.get(`/books/classifications/${classNum}?start=${start}`);
}
