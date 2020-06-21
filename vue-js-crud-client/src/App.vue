<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">nested-set-test-app</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/categories" class="nav-link">Categories</a>
        </li>
        <li class="nav-item">
          <a href="/about" class="nav-link">About</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>