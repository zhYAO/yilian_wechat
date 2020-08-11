import * as myFocusApi from './service'
import { myAttentionRequest } from '@service/user-controller'

export default {
  namespace: 'myFocus',
  state: {
    current: 0,
    tabList: [{ title: '好友' }, { title: '公司' }],
    attentionList: {}
  },

  effects: {
    *effectsAttentionList({ payload }, { call, put }) {
      const { data } = yield call(myAttentionRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            attentionList: data
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
