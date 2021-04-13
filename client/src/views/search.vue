<template>
  <div>
    <h1>&nbsp;{{ $route.query.q.toUpperCase() }}</h1>
    <section id="first">
      <div v-if="state.loading">Loading...</div>
      <div v-else>
        <div class="date">
          <h1>{{state.data.lastUpdate}}</h1>
        </div>
        <ul v-if="!state.error || state.data.length > 0">
          <li class="deaths">
            <span class="material-icons">Deaths</span>
            <div>{{ state.data.deaths.value }}</div>
          </li>
          <li class="confirmed">
            <span class="material-icons">confirmed</span>
            <div>{{ state.data.confirmed.value }}</div>
          </li>
          <li class="recovered">
            <span class="material-icons">Recovered</span>
            <div>{{ state.data.recovered.value }}</div>
          </li>
        </ul>
      </div>
      <div v-if="state.error">{{ state.error }}</div>
    </section>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Icovid } from "../types";
import {reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { currentRoute } = useRouter();
    const {
      value: { query },
    } = currentRoute;

    const state = reactive({
      data: {} as Icovid,
      loading: true,
      error: "",
    });

    axios
      .get(`https://covid19.mathdro.id/api/countries/${query.q}`)
      .then((res) => {
        state.data = res.data;
        state.loading = false;
        console.log(res.data)
      })
      .catch((err) => {
        state.error = err.message;
        state.loading = false;
      });

    return {
      state,
    };
  },
};
</script>

<style scoped>
ul {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 400px;
  margin: 60px auto;
}
li {
  list-style-type: none;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  line-height: 1.5em;
}

.confirmed {
  border-bottom: 4px solid rgb(252, 169, 45);
}
.deaths {
  border-bottom: 4px solid rgb(255, 0, 0);
}
.recovered {
  border-bottom: 4px solid rgb(51, 255, 0);
}
</style>