import * as commonEditApi from './service'
import { modifyUserInfoRequest, modifyPasswordRequest, applyCompanyRequest } from '@service/user-controller'
import { companyListRequest } from '@service/company-controller'
import { showToast } from '@crossplatform/apiservice/toast'

export default {
  namespace: 'commonEdit',
  state: {
    companyList: []
  },

  effects: {
    *effectsUpdate({ payload }, { call, put }) {
      const { data } = yield call(modifyUserInfoRequest, { ...payload })
      showToast({
        title: '修改成功'
      })
    },
    *effectsPasswordUpdate({ payload }, { call, put }) {
      const { data } = yield call(modifyPasswordRequest, { ...payload })
      showToast({
        title: '修改成功'
      })
    },
    *effectsCompanyList({ payload }, { call, put }) {
      const { data = {} } = yield call(companyListRequest, { ...payload })
      if(data.records) {
        yield put({
          type: 'updateState',
          payload: {
            companyList: data.records
          }
        })
      }
    },
    *effectsApplyCompany({ payload }, { call, put }) {
      const { data } = yield call(applyCompanyRequest, { ...payload })
      if(data) {
        showToast({
          title: '申请成功'
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
