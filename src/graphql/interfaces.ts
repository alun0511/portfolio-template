export interface Page {
  id: string;
  url: string;
  _status: string;
  _firstPublishedAt: string; // or `Date` if you plan to parse it as a Date object
}

export interface AllPagesResponse {
  allPages: Page[];
}
