<template>
  <div id="map-wrapper" ref="map-wrapper" class="map-wrapper">
    <canvas
      id="canvas"
      v-on:dblclick="movePlayer($event)"
      width="2570"
      height="1926"
      ref="canvas"
      draggable="handleMapDrag"
    ></canvas>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import $ from 'jquery'

export default defineComponent({
  name: "Map",
  props: {
        playersdata: Object
  },
  methods: {
        movePlayer: function(event) {
            if(this.$root.model.win) {
                return
            }
            const clickCoords = this.getXY(event)
            const ticketType = this.getSelectedTicketType()

            const data = {
                event: "move",
                ticketType: ticketType,
                x: parseInt(clickCoords.x),
                y: parseInt(clickCoords.y)
            }
            this.$root.sendObjectOverWebsocket(data, 'move')
            this.redraw()
        },
        getXY: function(event) {
            const canvas = $("#canvas")
            const rect = canvas.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top}
        },
        getSelectedTicketType: function() {
            const radios = $("#transport");
            for (let i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    radios[0].checked = true;
                    return radios[i].value;
                }
            }
        },
        handleMapDrag: function (event, map) {
            const parent = this.$refs["map-wrapper"]
            const childPos = this.$refs["canvas"]

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
        redraw: function() {
            const cnvs = this.$refs["canvas"]
            cnvs.style.position = 'absolute';
            const ctx = cnvs.getContext('2d');
            const img = new Image();
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
            img.src = '~@/assets/map_large.png';
            img.id = 'map'
        }
    },
    watch: {
        playersdata: function() {
            this.redraw()
        }
    },
    mounted: function() {
        //this.handleMapDrag()
        this.redraw()
    }
});
</script>