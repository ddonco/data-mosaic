<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions(['loadTestConfigs']),
  },
  created() {
    this.loadTestConfigs();
  },
});
</script>
<template>
  <router-view />
</template>
