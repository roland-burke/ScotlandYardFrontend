<template>
  <v-footer id="footer" padless dense fixed>
    <v-col class="text-center paddingSize" cols="4">
      <a href="https://github.com/tim-koehler/ScotlandYard" target="_blank"
        >ScotlandYard Core</a
      >
    </v-col>
    <v-col class="text-center paddingSize" cols="4">
      <a
        href="https://github.com/roland-burke/ScotlandYardServer"
        target="_blank"
        >ScotlandYard Server</a
      >
    </v-col>

    <v-col class="text-center paddingSize" cols="4">
      <a
        href="https://github.com/roland-burke/ScotlandYardFrontend"
        target="_blank"
        >ScotlandYard Frontend</a
      >
    </v-col>
  </v-footer>
</template>

<script lang="js">
export default ({
  name: "Footer",
});
</script>

<style scoped>
#footer {
  border-top: solid rgb(131, 131, 131) 2px;
}

/* If the screen size is 600px wide or less */
@media screen and (max-width: 750px) {
  .paddingSize {
    padding: 0px !important;
  }
}
</style>
