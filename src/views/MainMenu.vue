<template>
  <main class="d-flex align-items-center justify-content-center">
    <div class="index-wrapper">
      <div class="row my-3 d-flex justify-content-center">
        <h3>Scotland Yard</h3>
      </div>
      <div class="row my-3 d-flex justify-content-center">
        <router-link class="main-menu-button" to="/lobby" :enabled="isMounted"
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
  </main>
</template>

<script lang="js">

export default{
  name: "MainMenu",
  props: {
    isMounted: Boolean,
  },
};
</script>

<style scoped>
/* ==== Index ==== */

input[type="file"] {
  display: none;
}

/* If the screen size is 601px wide or more */
@media screen and (min-width: 751px) {
  h3 {
    font-family: Michroma;
    font-weight: bold;
    font-size: 400%;
    padding-bottom: 1em;
    color: #ffffff;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
      0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
      0 20px 20px rgba(0, 0, 0, 0.15);
  }
}

/* If the screen size is 600px wide or less */
@media screen and (max-width: 750px) {
  h3 {
    font-family: Michroma;
    font-weight: bold;
    font-size: 200%;
    padding-bottom: 1em;
    color: #ffffff;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
      0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
      0 20px 20px rgba(0, 0, 0, 0.15);
  }
}

.index-wrapper {
  background-color: #cae4ff;
  border: 2px solid #000000;
  border-radius: 10%;
  padding: 2em 2em;
  margin-top: 6em;
}

/* === Buttons === */

/* If the screen size is 601px wide or more */
@media screen and (min-width: 751px) {
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
}

/* If the screen size is 600px wide or less */
@media screen and (max-width: 750px) {
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
    font-size: 150%;
    font-weight: bold;
    padding: 16px 30px;
    text-decoration: none;
    text-shadow: 3px 3px 2px #393947;
    white-space: nowrap;
  }
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
</style>
