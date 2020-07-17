export default class Pagination {
  public page: number;
  public limit: number;
  public offset: number;
  public count: number;

  constructor(page: number, limit = 10) {
    this.page = page;
    this.limit = limit;
    this.offset = page * limit;
  }
}
