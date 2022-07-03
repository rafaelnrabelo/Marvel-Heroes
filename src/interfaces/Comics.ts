export interface HeroComics {
  id: number;
  title: string;
  dates: {
    type: string;
    date: string;
  }[],
  thumbnail: {
    path: string;
    extension: string;
  };
};

export interface HeroComicsResponse {
  data: {
    results: HeroComics[];
  },
}