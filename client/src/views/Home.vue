<template>
  <div class="contact">
    <h1>Covid 19 visualization Global data</h1>
    <form @submit.prevent="search">
      <input
        type="text"
        name="search"
        id="search"
        v-model="state.query"
        placeholder="Search"
      />
    </form>
    <section id="first">
      <div v-if="state.loading">Loading...</div>
      <div v-else>
        <card :data="state.data" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import card from "@/components/card.vue";

import { Icovid } from "../types";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "Home",
  components: {
    card,
  },
  setup() {
    const state = reactive({
      data: {} as Icovid,
      loading: false,
      query: "",
    });

    onBeforeMount(() => {
      state.loading = true;
      axios.get("https://covid19.mathdro.id/api/").then((res) => {
        state.data = res.data;
        state.loading = false;
      });
    });

    function search() {
      router.push({ path: "/search", query: { q: state.query } });
    }
    return {
      state,
      search,
    };
  },
});
</script>

<style scoped>
.home {
  text-align: center;
}
input[type="text"] {
  border-radius: 8px;
  outline: none;
  padding: 20px;
  transition: border 0.5s ease-in-out;
}
input[type="text"]:focus {
  border: 2px solid greenyellow;
}
</style>