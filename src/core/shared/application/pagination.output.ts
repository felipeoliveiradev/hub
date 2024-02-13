import { SearchResult } from '../domain/repository/results.search';

export type PaginationOutput<T> = {
  items: T[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toOutput<T>(itemsO: T[], props: SearchResult): PaginationOutput<T> {
    const { items, ...otherProps } = props;
    return {
      items: itemsO,
      ...otherProps,
    };
  }
}
