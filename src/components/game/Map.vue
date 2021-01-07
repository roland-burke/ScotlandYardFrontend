<template>
  <div id="map-wrapper" ref="map-wrapper" class="map-wrapper">
    <canvas
      id="canvas"
      v-on:dblclick="movePlayer($event)"
      width="2570"
      height="1926"
      ref="canvas"
    ></canvas>
  </div>
</template>

<script lang="js">
import { WebsocketMixin } from "@/mixins/websocketMixin.js"
import $ from 'jquery'

export default {
  name: "Map",
  mixins: [WebsocketMixin],
  props: {
        playersdata: Object
  },
  methods: {
       movePlayer: function(event) {
          console.log(this.$store.getters.gameRunning);
          if(!this.$store.getters.gameRunning) {
              return
          }
          const clickCoords = this.getXY(event)
          const ticketType = this.$store.getters.getCurrentTicketType

          const data = {
              event: "move",
              ticketType: ticketType,
              x: parseInt(clickCoords.x),
              y: parseInt(clickCoords.y)
          }
          console.log(data);
          this.sendObjectOverWebsocket(data, 'move')
          this.redraw()
        },
        getXY: function(event) {
            const canvas = this.$refs["canvas"]
            const rect = canvas.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top}
        },
        handleMapDrag: function() {
            const parent = $("#map-wrapper");
            const childPos = $("#canvas");

            $("#canvas").draggable({
                drag: function (event, map) {
                    const boundaryOffset = 20
                    const headerOffset = document.getElementById("header").offsetHeight
                    const footerOffset = document.getElementById("footer").offsetHeight

                    const mapWrapperWidth = parent.width()
                    const mapWidth = childPos.width()

                    const mapWrapperHeight = parent.height()
                    const mapHeight = childPos.height()

                    const mapBoundaryRight = mapWrapperWidth - mapWidth - boundaryOffset
                    const mapBoundaryBottom = mapWrapperHeight - mapHeight - boundaryOffset - footerOffset

                    // Check for top boundary
                    if (map.position.top > boundaryOffset + headerOffset) {
                        map.position.top = boundaryOffset + headerOffset;
                    }
                    // Check for left boundary
                    if (map.position.left > boundaryOffset) {
                        map.position.left = boundaryOffset;
                    }
                    // Check for bottom boundary
                    if (map.position.top < mapBoundaryBottom) {
                        map.position.top = mapBoundaryBottom;
                    }
                    // Check for right boundary
                    if (map.position.left < mapBoundaryRight) {
                        map.position.left = mapBoundaryRight;
                    }
                },

                scroll: false
            });
        },
        redraw: function() {
            const cnvs = this.$refs["canvas"]
            cnvs.style.position = 'absolute';
            const ctx = cnvs.getContext('2d');
            const img = new Image();
            img.id = 'map'
            img.src = require('../../assets/map_large.png')
            img.onload = () => {
                ctx.drawImage(img,0,0);
                for (let i = 0; i < this.playersdata.players.length; i++) {
                    const player = this.playersdata.players[i];
                    ctx.beginPath();
                    ctx.arc(player.x, player.y, 26, 0, 2 * Math.PI, false);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = player.color;
                    ctx.stroke();
                }
            };
        }
    },
    watch: {
        playersdata: function() {
            this.redraw()
        }
    },
    mounted: function() {
        this.handleMapDrag()
        this.redraw()
    }
};
</script>

<style scoped>
/* === Map === */

.map-wrapper {
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  cursor: grab;
  transform: translate3d(0, 0, 0);
  z-index: 0;
  overflow: hidden;
}

#canvas {
  overflow: hidden;
}
</style>
