import request from "../index";

export function getRecommendedBooklistsByUserId(uid: number) {
  return request.get(`/booklists/recommend/${uid}`);
}
