<template>
  <div class="dynamic-chart">
    <div class="flex flex-row w-full justify-items-stretch">
      <div class="w-1/3"></div>
      <div class="w-1/3 self-center">
        <h1 class="text-lg">{{ resources.title }}</h1>
      </div>
      <div class="flex w-1/3 items-center justify-center">
        <button class="" type="submit">
          <DotsHorizontalIcon
            class="w-7 h-5"
            v-on:click="showConfigTrue($event, item)"
          />
        </button>
      </div>
    </div>
    <LineChart
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :width="chartWidth"
      :height="chartHeight"
      :key="updated"
    />
  </div>
</template>

<script lang="ts">
import { LineChart } from 'vue-chart-3';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';
import { DotsHorizontalIcon } from '@heroicons/vue/outline';
import { useStore } from '/@/store/index';

ChartJS.register(...registerables);

export default {
  name: 'ChartWidget',
  components: { LineChart, DotsHorizontalIcon },
  props: {
    item: {
      type: Object,
      default: {},
    },
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    // styles: {
    //   type: Object,
    //   default: {
    //     position: 'relative'
    //   }
    // },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const store = useStore();

    const showConfigTrue = (event: any, item: any) => {
      store.dispatch('showChartConfig', [true, item.i]);
    };
    return {
      showConfigTrue,
    };
  },
  computed: {
    resources(): any {
      return this.$store.getters.getResourcesById(this.item.i);
    },
    chartWidth(): number {
      let resource = this.$store.getters.getResourcesById(this.item.i);
      console.log(`wpx: ${resource.w}`);
      return (resource.w * 1920) / 10;
    },
    chartHeight(): number {
      let resource = this.$store.getters.getResourcesById(this.item.i);
      console.log(`hpx: ${resource.h}`);
      return resource.h * 20;
    },
    myCompStyles(): any {
      return {
        height: this.$store.getters.getResourcesById(this.item.i).h * 20,
        width:
          (this.$store.getters.getResourcesById(this.item.i).w * 1920) / 10,
        position: 'relative',
      };
    },
  },
  data(): any {
    return {
      updated: 0,
      myStyles: {
        position: 'relative',
        width:
          (this.$store.getters.getResourcesById(this.item.i).w * 1920) / 10,
        height: this.$store.getters.getResourcesById(this.item.i).h * 20,
      },
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Bitcoin',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#4bc0c0',
          },
          {
            label: 'Ethereum',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#565656',
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.dynamic-chart {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
