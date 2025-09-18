export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  id?: string;
}

export interface WordItem {
  _id?: string;
  en: string;
  ua: string;
  category?: string;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
}

export interface TaskWord {
  _id: string;
  en: string;
  ua: string;
  task: 'ua' | 'en';
}

export interface RecommendState {
  items: WordItem[];
  categories: string[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface DictionaryState {
  userItems: WordItem[];
  fullUserItems: WordItem[];
  word: WordItem | null;
  totalPages: number;
  currentPage: number;
  perPage: number;
  statistics: number;
  tasks: TaskWord[];
  answers: AnswerResponse[];
  isLoading: boolean;
  error: string | null;
}

export interface GetWordsResponse {
  results: WordItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetWordsParams {
  keyword?: string;
  category?: string;
  isIrregular?: boolean | null;
  page?: number;
  limit?: number;
}

export interface AnswerWordDto {
  _id: string;
  ua?: string;
  en?: string;
  task: 'ua' | 'en';
}

export interface DeleteWordResponse {
  message: string;
  id: string;
}

export interface GetTasksResponse {
  tasks: TaskWord[];
}

export interface StatisticsResponse {
  totalCount: number;
}

export interface AnswerResponse {
  _id: string;
  ua: string;
  en: string;
  task: string;
  isDone: boolean;
}
