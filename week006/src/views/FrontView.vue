<template>
  <FrontNavber></FrontNavber>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import FrontNavber from "@/components/FrontNavber.vue";

export default {
  components: {
    FrontNavber,
  },
};
</script>
