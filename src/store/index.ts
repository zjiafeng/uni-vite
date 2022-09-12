// useStore.ts
import { defineStore } from 'pinia'

// type StateType = {
// 	user?: any
// }
// export default defineStore('global', {
//   state: (): StateType => ({
//     user: undefined
//   }),
//   actions: {
//     setData<T extends keyof StateType> ({ key, value }: { key: T, value: any }) {
//       this[key] = value
//     }
//   }
// })


// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useStore = defineStore('store', {
  state: () => {
    return {
      count: 0,
      info: {
        domain: '',
        isTextThumbnail: '',
        blogName: '',
        getAllCountArticle: '',
        getAllCountCat: '',
        getAllCountTag: '',
        getAllCountComment: ''
      }
    }
  },
  actions: {
    setInfo(val: any) {
      this.info = val
    }
  },
})

export default useStore