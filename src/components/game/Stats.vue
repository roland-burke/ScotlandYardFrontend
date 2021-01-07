<template>
  <div>
    <div class="d-flex justify-content-center">
      <h3>Stats</h3>
    </div>
    <div v-for="(player, index) in playersdata.players" :key="index">
      <div class="stats-item">
        <div>
          <b v-if="player.name === 'MrX'"
            >{{ player.name }} Last seen: {{ player.lastSeen }}</b
          >
          <b v-if="player.name !== 'MrX'"
            ><span :style="'color: ' + player.color">{{ player.name }}</span>
            Station: {{ player.station }}</b
          >
        </div>
        <div>
          <div class="stats-ticket">
            <img class="ticket-icon-stats" src="~@/assets/taxi_small.svg" />
            <div style="min-width: 3em">
              {{ player.tickets.taxi }}
            </div>
          </div>
          <div class="stats-ticket">
            <img class="ticket-icon-stats" src="~@/assets/bus_small.svg" />
            <div style="min-width: 3em">
              {{ player.tickets.bus }}
            </div>
          </div>
          <div class="stats-ticket">
            <img
              class="ticket-icon-stats"
              src="~@/assets/underground_small.svg"
            />
            <div style="min-width: 3em">
              {{ player.tickets.underground }}
            </div>
          </div>
          <div v-if="player.name === 'MrX'">
            <div class="stats-ticket">
              <img class="ticket-icon-stats" src="~@/assets/black_small.svg" />
              <div style="min-width: 3em">
                {{ player.tickets.black }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

export default{
  name: "Stats",
  props: {
    playersdata: Object
  },
};
</script>

<style scoped>
.stats-wrapper {
  background-color: #96b9ec;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  max-height: 69vh;
  max-width: 19em;
  min-width: 10em;
  margin-bottom: 20px; /* prevent the shadow from being cut off */
  pointer-events: all;
}

.stats-wrapper:hover {
  opacity: 0.3;
}

.stats-item {
  background-color: #b2dbff;
  border: 2px solid #25313e;
  border-radius: 10px;
  margin: 4px;
  padding: 4px;
  min-width: 7em;
}

.stats-ticket {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.ticket-icon-stats {
  width: 30px;
}
</style>
