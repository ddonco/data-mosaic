<template>
  <div class="dashboard" ref="dashboard">
    <div style="text-align: center">
      <div class="site-title">Chart Grid</div>
      <span v-if="!preview">
        <button
          class="text-sm px-5 py-1 mr-2 mb-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
          @click="addChartGridItem"
        >
          Chart
        </button>
      </span>
      <button
        class="text-sm px-5 py-1 mr-2 mb-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
        @click="disableGrid"
      >
        <span v-if="preview"> Edit </span>
        <span v-else="preview"> Publish </span>
      </button>
    </div>
    <hr />
    <grid-layout
      :layout="tiles"
      :col-num="gridColNum"
      :row-height="gridRowHeight"
      :is-draggable="gridDraggable"
      :is-resizable="gridResizable"
      :is-mirrored="false"
      :margin="gridMargin"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in tiles"
        :key="index"
        :class="{ editMode: !preview }"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :ref="item.i"
        @init="initEvent"
        @resize="resizeEvent"
        @moved="movedEvent"
        class="chart-item"
      >
        <chart-widget
          v-if="item.type == 'chart'"
          :preview="preview"
          :contenteditable="contenteditable"
          :item="item"
          :itemIndex="index"
        >
          Chart Here
        </chart-widget>
      </grid-item>
    </grid-layout>
    <ChartConfigModal :show="showChartConfig" />
  </div>
</template>
<script lang="ts">
import { useStore } from '/@/store/index';
import { mapGetters, mapActions } from 'vuex';
import { GridLayout, GridItem } from 'vue-grid-layout';
import ChartWidget from '/@/components/ChartWidget.vue';
import ChartConfigModal from '../components/ChartConfigModal.vue';
import { TileItem } from '/@/types/interfaces';

export default {
  name: 'gridview',
  components: { GridLayout, GridItem, ChartWidget, ChartConfigModal },
  computed: {
    showChartConfig: function () {
      const store = useStore();
      let showChart = store.state.showChartConfig;
      return showChart;
    },
  },
  methods: {
    ...mapGetters(['getResources']),
    ...mapActions(['resourceSizeChange']),
    async getDashboard() {
      this.loading = true;
      this.layoutUpdating = true;
      try {
        const res = await this.getResources();
        this.tiles = res;
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    disableGrid() {
      this.isDraggable = !this.isDraggable;
      this.isResizable = !this.isResizable;
      this.preview = !this.preview;
      this.contenteditable = !this.contenteditable;
    },
    initEvent(i: string, h: number, w: number, hpx: number, wpx: number) {
      this.tiles = this.tiles.map((item: TileItem) => {
        if (item.i === i) {
          item.width = wpx;
          item.height = hpx;
        }
        return item;
      });
    },
    resizeEvent: function (
      i: string,
      newH: number,
      newW: number,
      newHPx: number,
      newWPx: number,
    ) {
      const msg =
        'RESIZE i=' +
        i +
        ', H=' +
        newH +
        ', W=' +
        newW +
        ', H(px)=' +
        newHPx +
        ', W(px)=' +
        newWPx;
      console.log(msg);
      this.resourceSizeChange({
        id: i,
        h: newH,
        w: newW,
        hpx: newHPx,
        wpx: newWPx,
      });
      this.tiles = this.tiles.map((item: TileItem) => {
        if (item.i === i) {
          item.width = newWPx;
          item.height = newHPx;
        }
        return item;
      });
    },
    movedEvent(i: string, newX: number, newY: number) {
      console.log('movedEvent');
    },
  },
  created() {
    this.getDashboard();
    console.log(`tiles: ${JSON.stringify(this.tiles)}`);
  },
  data() {
    return {
      $refs: {
        dashboard: HTMLDivElement,
      },
      loading: false,
      layoutUpdating: false,
      gridDraggable: true,
      gridResizable: true,
      preview: true,
      contenteditable: false,
      gridColNum: 36,
      gridRowHeight: 10,
      gridMargin: [30, 30, 30, 30],
      cachePosition: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      tiles: [],
    };
  },
};
</script>

<style scoped>
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #eee;
  border: 1px solid black;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.editMode {
  background-color: #fafafa;
  border-radius: 5px;
}
.site-title {
  font-family: 'Lilita One', cursive;
  font-size: 50px;
  color: #f48fb1;
  text-align: center;
}
.content {
  font-family: 'Patrick Hand', cursive;
  font-size: 20px;
  color: #2196f3;
}
.dashboard {
  width: 100%;
  min-height: 800px;
}
.grid {
  position: relative;
}
.grip-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
}
.chart-item {
  z-index: 5;
  display: block;
  border-radius: 6px;
  background-color: #fff;
  color: black;
  box-shadow: 0 0 40px rgba(226, 226, 226, 0.5);
  padding: 15px;
  box-sizing: border-box;
}
</style>
