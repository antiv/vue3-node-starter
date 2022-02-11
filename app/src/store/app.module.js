const modal = null;
const modalParams = null;
const alert = null;
const initialState = { status: { showModal: false }, modal, modalParams, alert }

export const app = {
  namespaced: true,
  state: initialState,
  actions: {},
  mutations: {
    showModal(state, data) {
      state.modal = data.modal;
      state.modalParams = data.params;
      state.status.showModal = true;
    },
    hideModal(state) {
      state.status.showModal = false;
      state.modal = null;
      state.modalParams = null;
    },
    showAlert(state, alert) {
      console.log({ alert })
      state.alert = alert;
    },
    hideAlert(state) {
      state.alert = null;
    }
  }
};
