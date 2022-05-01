import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import data from '../../test/data.json';

export interface State {
  showChartConfig: boolean;
  configId: string;
  resources: [
    {
      i: string;
      title: string;
      x: number;
      y: number;
      w: number;
      h: number;
      wpx: number;
      hpx: number;
      tag: string;
      type: string;
      history: string;
      appearance: {};
    },
  ];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    showChartConfig: false,
    configId: '',
    resources: [
      {
        i: '',
        title: '',
        x: 0,
        y: 0,
        w: 4,
        h: 4,
        wpx: 100,
        hpx: 100,
        tag: '',
        type: '',
        history: '',
        appearance: {},
      },
    ],
  },
  getters: {
    getResources(state) {
      return state.resources;
    },
    getResourcesById: state => (id: string) => {
      return state.resources.find(resources => resources.i === id);
    },
    getConfigId(state) {
      return state.configId;
    },
  },
  mutations: {
    SHOW_CHART_CONFIG(state, [show, id]) {
      state.showChartConfig = show;
      state.configId = id;
    },
    LOAD_TEST_CONFIGS(state) {
      state.resources = data;
    },
    RESOURCE_SIZE_CHANGE(state, payload) {
      const index = state.resources.findIndex(obj => obj.i === payload.id);
      // console.log(`RESOURCE_SIZE_CHANGE (${id}, ${h}, ${hpx}): ${index}`);
      state.resources[index].w = payload.w;
      state.resources[index].h = payload.h;
      state.resources[index].wpx = payload.wpx;
      state.resources[index].hpx = payload.hpx;
    },
  },
  actions: {
    showChartConfig({ commit }, [show, id]) {
      commit('SHOW_CHART_CONFIG', [show, id]);
    },
    loadTestConfigs({ commit }) {
      commit('LOAD_TEST_CONFIGS');
    },
    resourceSizeChange({ commit }, payload) {
      commit('RESOURCE_SIZE_CHANGE', payload);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
