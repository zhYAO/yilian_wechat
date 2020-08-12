import * as companyApi from './service'

export default {
  namespace: 'company',
  state: {
    pageSize: 10,
    page: 0,
    hasNextPage: true,
    companyCategoryList: [],
    companyCardList: []
  },

  effects: {
    *effectsCompanyList({ payload }, { call, put, select }) {
      const { companyCardList, pageSize, page } = yield select(state => state.company)
      const { isReset } = payload
      const { data } = yield call(companyApi.companyList, {
        pageSize: payload.pageSize,
        page: isReset ? 0 : payload.page + 1 
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            companyCardList: isReset ? data : companyCardList.concat(data),
            page: isReset ? 0 : page + 1
          }
        })
        if (data.length < pageSize) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: false
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: false
          }
        })
      }
    },
    *effectsLabelList({ payload }, { call, put, select }) {
      const { data } = yield call(companyApi.labelUserList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            companyCategoryList: data
          }
        })
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
