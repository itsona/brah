<template>
  <v-bottom-navigation
      class="fixed "
      style="z-index: 1000"
      grow
      color="#00d369"
      :value="value"
  >
    <v-btn value="Invoices" @click="onButtonClick('User.Invoices')">
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn value="Invoice" @click="onButtonClick('User.Invoice.Create')">
      <v-icon >mdi-plus</v-icon>
    </v-btn>

    <v-btn value="Customers" @click="onButtonClick('User.Customers')">
      <v-icon >mdi-account-plus</v-icon>
    </v-btn>

    <v-btn value="Account" @click="onButtonClick('User.Account.Profile')">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
name: "bottom-navigationp",
  computed: {
    value() {
      if(!this.$route.name) return 'Invoices'
      const navigations = this.$route.name.split('.');
      return navigations[1];
      // return this.$route.name;
    }
  },
  methods: {
    onButtonClick(route){
      this.$router.push({name: route});
    }
  }
}
</script>

<style scoped>

</style>
