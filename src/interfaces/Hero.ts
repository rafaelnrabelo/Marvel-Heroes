export interface Hero {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  }
};

export interface HeroResponse {
  data: {
    results: Hero[];
    total: number;
  },
}