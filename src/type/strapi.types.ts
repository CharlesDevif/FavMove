export type IStrapiUsers = IStrapiUser[];

export interface IStrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: IStrapiRole;
  commentaires: IStrapiCommentaire[];
  film_lists: IStrapiFilmList[];
}

export interface IStrapiRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStrapiCommentaire {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStrapiFilmList {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  films: IStrapiFilm[];
  user: IStrapiUser | undefined;
}

export interface IStrapiFilm {
  id: number;
  filmId: string;
  createdAt: string;
  updatedAt: string;
  commentaires: IStrapiCommentaire[];
}
