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
export default{
  name: "History",
  props: {
    historyobject: Object
  },
  methods:{
    getReversedHistory: function() {
      return this.historyobject.history.slice().reverse()
    }
  }
};
</script>

<style scoped>
.history-wrapper {
  background-color: #96b9ec;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  overflow-y: auto;
  max-height: 69vh;
  max-width: 10em;
  min-width: 9em;
  display: flex;
  align-items: center;
  flex-direction: column;
  pointer-events: all;
  margin-bottom: 20px; /* prevent the shadow from being cut off */
}

.history-wrapper:hover {
  opacity: 0.3;
}

.history-item {
  background-color: #b2dbff;
  border: 2px solid #25313e;
  border-radius: 8px;
  margin: 4px;
  padding: 4px;
  max-width: 110px;
}
</style>