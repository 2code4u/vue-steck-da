export type EntriesList<T> = Array<T>

export interface EntriesItem {
  id: number,
  name: string,
  fio: string,
  phone: string,
  address: string
}

export interface FilterData {
  type?: string,
  sort?: {
    field: string,
    type: string
  },
}