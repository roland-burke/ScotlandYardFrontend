<template>
  <h3>History</h3>
  <div
    v-for="history in historyobject.history"
    :key="history.ticketType"
    class="d-flex justify-content-center"
  >
    <div class="history-item">
      <img
        v-if="history.ticketType === 'Taxi'"
        class="ticket-icon"
        src="~@/assets/Taxi.svg"
      />
      <img
        v-if="history.ticketType === 'Bus'"
        class="ticket-icon"
        src="~@/assets/Bus.svg"
      />
      <img
        v-if="history.ticketType === 'Underground'"
        class="ticket-icon"
        src="~@/assets/Underground.svg"
      />
      <img
        v-if="history.ticketType === 'Black'"
        class="ticket-icon"
        src="~@/assets/Black.svg"
      />
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadLine",
  props: {
    historyobject: Object
  }
});
</script>