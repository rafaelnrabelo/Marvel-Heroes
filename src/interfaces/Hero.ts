export interface Hero {
  id: number;
  name: string;
  description?: string;
  modified?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
  };
  events: {
    available: number;
  };
};

export interface HeroResponse {
  data: {
    results: Hero[];
    total: number;
  },
}