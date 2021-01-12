<template>
  <div class="game-controls" id="game-controls">
    <div>
      <label>
        <input
          v-on:change="commitSelectedTicketType"
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
          v-on:change="commitSelectedTicketType"
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
          v-on:change="commitSelectedTicketType"
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
            v-on:change="commitSelectedTicketType"
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
            v-on:change="commitSelectedTicketType"
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
  </div>
</template>

<script lang="js">

export default{
  name: "Controls",
  data: function() {
    return {
      oldName: String
    }
  },
  props: {
      name: String
  },
  methods: {
    commitSelectedTicketType: function() {
        const radios = document.getElementsByName('transport');
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
              this.$store.dispatch("setCurrentTicketType", radios[i].value);
            }
        }
    }
  },
  watch: {
      name: function() {
          if (this.name !== this.oldname) {
              document.getElementsByName('transport')[0].checked = true;
              this.oldName = this.name
          }
      }
  }
};
</script>

<style scoped>
#close-button {
  position: relative;
}

.game-controls {
  pointer-events: all;
  background-color: #ffe8b1;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  padding: 4px;
  margin: 10px 10px 4em 10px;
}

.game-controls * {
  display: inline;
}

.ticket-icon {
  width: 90px;
  margin: 5px;
}

.ticket-icon-stats {
  width: 30px;
}

/* HIDE RADIO */
.ticket-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type="radio"] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
[type="radio"]:checked + img {
  border: 4px solid #c30202;
  border-radius: 10px;
}
</style>
