<template>
  <footer class="footer fixed-bottom" id="footer">
    <div class="container-fluid text-center">
      <span class="text-muted"
        >More information about
        <a href="https://github.com/tim-koehler/ScotlandYard" target="_blank"
          >ScotlandYard Core</a
        >
        and
        <a
          href="https://github.com/roland-burke/ScotlandYardServer"
          target="_blank"
          >ScotlandYard Server</a
        ></span
      >
    </div>
  </footer>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style scoped>
.footer {
  background-color: #c4c4c4;
  min-height: 2.5em;
  max-height: 3em;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
</style>
