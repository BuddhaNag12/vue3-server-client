<template>
  <section id="first">
    <ul>
      <li class="deaths">
        <span class="material-icons">Deaths</span>
        <div>{{ deaths }}</div>
      </li>
      <li class="confirmed">
        <span class="material-icons">confirmed</span>
        <div>{{ confirmed }}</div>
      </li>
      <li class="recovered">
        <span class="material-icons">Recovered</span>
        <div>{{ recovered }}</div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Icovid } from "@/types";
import { defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
  name: "card",
  props: {
    data: {
      type: Object as PropType<Icovid>,
      required: true,
    },
  },
  setup(props) {
    const data = toRefs(props.data);
    const confirmed = data.confirmed.value.value;
    const recovered = data.recovered.value.value;
    const deaths = data.deaths.value.value;
    return {
      confirmed,
      recovered,
      deaths,
    };
  },
});
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