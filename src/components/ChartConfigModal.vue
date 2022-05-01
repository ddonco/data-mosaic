<template>
  <div
    v-if="show"
    class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      @click.self="close_modal()"
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-center items-center pb-3">
          <p class="text-2xl font-bold text-center">Configure Chart</p>
        </div>

        <form class="mt-6">
          <div>
            <label
              for="title"
              class="block text-sm text-gray-800 dark:text-gray-200"
              >Title</label
            >
            <input
              type="text"
              v-model="title"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label
                for="tagname"
                class="block text-sm text-gray-800 dark:text-gray-200"
                >Tag Name</label
              >
            </div>

            <input
              type="text"
              v-model="tagname"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label
                for="appearance"
                class="block text-sm text-gray-800 dark:text-gray-200"
                >Appearance</label
              >
            </div>

            <input
              type="text"
              v-model="appearance"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm text-gray-800 dark:text-gray-200"
                >History Range</label
              >
            </div>

            <select
              id="history"
              v-model="history"
              autocomplete="history"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>3 hour</option>
              <option>8 hour</option>
              <option>12 hour</option>
              <option>24 hour</option>
            </select>
          </div>

          <div class="mt-6">
            <div class="flex justify-end">
              <div>
                <button
                  type="submit"
                  class="px-5 py-2.5 mr-4 mb-2 text-base text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  v-on:click="showConfigFalse"
                >
                  OK
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  class="py-2.5 px-5 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  v-on:click="showConfigFalse"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '/@/store/index';

export default {
  name: 'ChartConfigModal',
  props: {
    show: Boolean,
  },
  setup() {
    const store = useStore();

    const showConfigFalse = (event: any) => {
      if (store.state.showChartConfig) {
        store.dispatch('showChartConfig', false);
      }
    };

    return {
      showConfigFalse,
    };
  },
  computed: {
    title(): string {
      return this.$store.getters.getResourcesById(
        this.$store.getters.getConfigId,
      )['title'];
    },
    tagname(): string {
      return this.$store.getters.getResourcesById(
        this.$store.getters.getConfigId,
      )['tag'];
    },
    appearance(): string {
      return JSON.stringify(
        this.$store.getters.getResourcesById(this.$store.getters.getConfigId)[
          'appearance'
        ],
      );
    },
  },
  // data() {
  //   return {
  //     firstname: '',
  //     lastname: '',
  //     gender: '',
  //     residence: '',
  //   };
  // },

  methods: {
    close_modal() {
      this.$emit('close');
    },
  },
};
</script>
