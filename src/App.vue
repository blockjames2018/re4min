<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  min-height: 100%;
}
body {
  padding: 0;
  margin: 0;
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #202427;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(132deg, #2d2b31 0%, #334866 100%);
}
</style>
