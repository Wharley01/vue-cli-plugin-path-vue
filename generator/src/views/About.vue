<template>
  <div class="about">
    <h1>This is an about now</h1>
    <h1 v-if="$state">{{$state.name}}</h1>
    <router-link to="/">Go home</router-link>
  </div>
</template>
