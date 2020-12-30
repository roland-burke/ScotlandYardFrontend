<template>
  <div>
    <label>
      <input
        class="ticket-radio"
        type="radio"
        checked="true"
        id="taxi"
        value="t"
        name="transport"
      />
      <img class="ticket-icon" src="~@/assets/Taxi.svg" />
    </label>
  </div>
  <div>
    <label>
      <input
        class="ticket-radio"
        type="radio"
        id="bus"
        value="b"
        name="transport"
      />
      <img class="ticket-icon" src="~@/assets/Bus.svg" />
    </label>
  </div>
  <div>
    <label>
      <input
        class="ticket-radio"
        type="radio"
        id="underground"
        value="u"
        name="transport"
      />
      <img class="ticket-icon" src="~@/assets/Underground.svg" />
    </label>
  </div>
  <div>
    <label>
      <div v-if="name == 'MrX'">
        <input
          class="ticket-radio"
          type="radio"
          id="black"
          value="x"
          name="transport"
        />
        <img class="ticket-icon" src="~@/assets/Black.svg" />
      </div>
      <div v-else>
        <input
          class="ticket-radio"
          disabled="true"
          type="radio"
          id="black"
          value="x"
          name="transport"
        />
        <img
          class="ticket-icon"
          src="~@/assets/Black.svg"
          style="opacity: 40%"
        />
      </div>
    </label>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Controls",
  props: {
    name: String
  }
});
</script>