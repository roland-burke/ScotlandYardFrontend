<template>
  <div class="d-flex justify-content-center">
    <h3>Stats</h3>
  </div>
  <div v-for="player in playersdata.players" :key="player.name">
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
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Stats",
  props: {
    playersdata: Object
  }
});
</script>