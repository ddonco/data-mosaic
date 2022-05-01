import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    showChartConfig: boolean;
    condigId: string;
    resources: [
      {
        i: string;
        title: string;
        x: number;
        y: number;
        h: number;
        w: number;
        tag: string;
        type: string;
        history: string;
        appearance: {};
      },
    ];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
