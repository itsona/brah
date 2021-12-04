<template>
  <v-card class="buy-manage-budget-modal">
    <v-card-title class="text-body-1 font-weight-medium my-2 justify-space-between">
      raime
      <v-btn icon @click="$emit('close')"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text--primary">
      <h6 class="text-subtitle-1 font-weight-medium mt-4">General</h6>
      <v-text-field
        v-model="order.name"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-row class="dialog-footer text-right py-2 px-4">
        <v-col>
          <v-row>
            <v-col>
              <v-btn
                  color="primary"
                  depressed
                  text
                  @click="$emit('close')"
              >Cancel</v-btn>
              <v-btn
                  color="primary"
                  depressed
                  outlined
                  class="mx-4"
              >Save</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-actions>
  </v-card>

</template>

<script>
export default {
	name: "orderModal",
	props: ["order"]
};
</script>

<style scoped>

</style>
