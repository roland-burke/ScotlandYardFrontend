<template>
  <div>
    <h3>History</h3>
    <div
      v-for="(history, index) in getReversedHistory()"
      :key="index"
      class="d-flex justify-content-center"
    >
      <div class="history-item">
        <img
          class="ticket-icon"
          :src="require('../../assets/' + history.ticketType + '.svg')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "History",
  props: {
    historyobject: Object
  },
  methods:{
    getReversedHistory: function() {
      return this.historyobject.history.reverse()
    }
  }
};
</script>
