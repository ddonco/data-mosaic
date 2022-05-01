import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';
import VueGridLayout from 'vue-grid-layout';

import './styles/index.css';
import './styles/base.css';

// Router
import { Router } from '/@/router';

// Store
import { store, key } from '/@/store/index';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

// Flowbite
import 'flowbite';

// import Echarts modules manually to reduce buidle size
// import 'echarts';
/* eslint-disable */
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// echarts component
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

const i18n = createI18n({
  locale: 'en',
  messages,
});

const app = createApp(App);

app.use(store, key);

app.use(i18n);

app.use(Router);

app.use(VueGridLayout);

app.mount('#app');
