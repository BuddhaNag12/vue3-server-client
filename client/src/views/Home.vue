<template>
  <div class="contact">
    <h1>Covid 19 visualization Global data</h1>
    <section id="first">
      <div v-if="state.loading">Loading...</div>
      <ul v-else>
        <li>
          <span class="material-icons">Deaths</span>
          <div>{{ state.data.deaths.value }}</div>
        </li>
        <li>
          <span class="material-icons">confirmed</span>
          <div>{{ state.data.confirmed.value }}</div>
        </li>
        <li>
          <span class="material-icons">Recovered</span>
          <div>{{ state.data.recovered.value }}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive } from "vue";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Icovid } from "../types";
// import gsap from "gsap";
import axios from "axios";

// gsap.registerPlugin(ScrollToPlugin);

export default defineComponent({
  name: "Home",

  setup() {
    const state = reactive({
      data: {} as Icovid,
      loading: false,
    });

    onBeforeMount(() => {
      state.loading = true;
      axios.get("http://localhost:4000").then((res) => {
        state.data = res.data;
        state.loading = false;
      });
    });
    return {
      state,
    };
  },
});
</script>

<style scoped>
.home {
  text-align: center;
}

.contact ul {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 400px;
  margin: 60px auto;
}
.contact li {
  list-style-type: none;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  line-height: 1.5em;
}
</style>