import request from "../index";

export function getRecommendedBooklistsByUserId(uid: number) {
  return request.get(`/booklists/recommend/${uid}`);
}

export function getBooklistsByUserId<T>(uid: number, type = "all") {
  return request.get<T>(`/booklists/users/${uid}?type=${type}`);
}

export function deleteBooklistById(id: number) {
  return request.delete(`/booklists/${id}`);
}
