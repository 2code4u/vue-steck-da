import { defineStore } from "pinia"
import { type EntriesList, type EntriesItem, type FilterData } from "@/interfaces"
import { toRaw } from "vue";

interface EntriesStore {
  list: EntriesList<EntriesItem>,
  filterActive: FilterData
}

export const useEntriesStore = defineStore("entries", {
  state: (): EntriesStore => {
    return {
      list: [],
      filterActive: {
        type: '',
        sort: {
          type: 'asc',
          field: ''
        },
        dates: []
      }
    };
  },
  actions: {
    async loadList(filter: FilterData) {
      Object.assign(this.filterActive, filter) // Реактивно запоминаем значение фильтров из стора
      const {type, sort, dates} = this.filterActive

      const result = await this.$api.dataBase.getDataList({
        'type': type,
        'sort': sort ? {field: sort?.field, type: sort?.type} : '',
        'dates': dates
      })
      this.list = result
    },

    async initStore() {
      this.list = await this.$api.dataBase.getDataList()
    },

    async addElement(item: any) {
      if (item) {
        const formToNet = {...item}
        await this.$api.dataBase.addToDataList(formToNet)
      }
    },

    async updateList(item: any) {
      const formToNet = toRaw(item)
      await this.$api.dataBase.updateDataList(formToNet)
    },

    async removeElement(id: number) {
      const updateList = this.list.filter(el => el.id !== id)
      await this.$api.dataBase.deleteDataList(id)
      this.list = updateList
      
    },
  },
})