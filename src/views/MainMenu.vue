<template>
  <main role="main" class="d-flex align-items-center justify-content-center">
    <div class="main">
      <div class="index-wrapper">
        <div class="row my-3 d-flex justify-content-center">
          <router-link class="main-menu-button" to="/lobby"
            >Start Game</router-link
          >
        </div>
        <div class="row my-3 d-flex justify-content-center">
          <label class="main-menu-button">
            <input type="file" />
            Load Game
          </label>
        </div>
        <div class="row d-flex justify-content-center">
          <router-link class="main-menu-button" to="/about">About</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainMenu",
});
</script>

<style scoped>
/* ==== Index ==== */

input[type="file"] {
  display: none;
}

.index-wrapper {
  background-color: #cae4ff;
  border: 2px solid #000000;
  border-radius: 10%;
  padding: 10% 10%;
  margin-top: 20vh;
}

/* === Buttons === */

.main-menu-button {
  box-shadow: 5px 4px 5px 3px #c7c7c7;
  background: linear-gradient(to bottom, #7cb7eb 5%, #2b4d7a 100%);
  background-color: #7cb7eb;
  border-radius: 20px;
  border: 4px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Michroma;
  font-size: 250%;
  font-weight: bold;
  padding: 16px 30px;
  text-decoration: none;
  text-shadow: 3px 3px 2px #393947;
  white-space: nowrap;
}
.main-menu-button:hover {
  background: linear-gradient(to bottom, #2b4d7a 5%, #7cb7eb 100%);
  background-color: #2b4d7a;
  text-decoration: none;
  color: #000000;
}
.main-menu-button:active {
  position: relative;
  top: 1px;
}
.main {
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
