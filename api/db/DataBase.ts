import axios from "axios"

import { type FilterData } from "@/interfaces"

export default class DataBase {
  public isAuth: boolean
  public tempList: []
  public mockData: {data: []} | null

  constructor() {
    this.isAuth = false
    this.tempList = []
    this.mockData = null
  }

  async getDataList(body: FilterData) {
    if (this.mockData === null) {
      this.mockData = await axios.get('/local.json')
    }

    if (!this.mockData?.data) return
    console.log(this.mockData.data)

    if (!body) {
      return this.mockData.data
    }
    console.log(`Filter params: ` + `${JSON.stringify(body)}`)

    const {type, sort} = body
    let newData = this.mockData.data
    
    if (type) {
      newData = newData.filter(el => {
        return el?.fio?.includes(type)
      })
    }

    if (sort?.field) {
      newData.sort((el1, el2) => {
        if (sort.type === 'asc' || sort.type === undefined) {  
          return el1[sort.field] > el2[sort.field] ? 1
          : el1[sort.field] < el2[sort.field] ? -1 
          : 0.
        }
        if (sort.type === 'desc') {
          return el2[sort.field] > el1[sort.field] ? 1
          : el2[sort.field] < el1[sort.field] ? -1 
          : 0.
        }
      })
    }

    return newData
  }

  async addToDataList(item: any) {
    if (item && this.mockData?.data) {
      this.mockData.data.push({...item})
    }
  }

  async updateDataList(item: any) {
    if (item && this.mockData?.data) {
      for (const element of this.mockData.data) {
        if (element.id === item.id) {
          Object.assign(element, item)
        }
      }
    }
  }

  async deleteDataList(id: number) {
    if (id && this.mockData?.data) {
      this.mockData.data = this.mockData.data.filter(el => el.id !== id)
    }
  }
}
