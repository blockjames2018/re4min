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
  background: #eee;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(132deg, #d8dad9 0%, #d8dad9 100%);
}
</style>
