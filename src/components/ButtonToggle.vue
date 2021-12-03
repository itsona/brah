<template>
  <div class="container">
    <v-btn rounded
           class="font-weight-bold button text-capitalize "
           :color="value === 1 ? 'white' : '#314678' "
           depressed
           :dark="value !== 1"
           @click="$emit('value-changed', 1)"
    >{{firstText}}</v-btn>
    <v-btn rounded
           class="font-weight-bold text-capitalize"
           :color="value === 2 ? 'white' : '#314678' "
           depressed
           :dark="value !== 2"
           @click="$emit('value-changed', 2)"
    >{{secondText}}</v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonToggle",
  props: {
    value: {
      type: Number,
      default(){
        return 1;
      }
    },
    firstText: {
      type: String,
      default(){
        return "";
      }
    },
    secondText: {
      type: String,
      default(){
        return "";
      }
    },
  }
}
</script>

<style scoped>
  .container {
    background: #314678;
    border-radius: 24px;
    padding: 8px;
  }
</style>
