<template>
  <v-card class="buy-manage-budget-modal">
    <v-card-title class="text-body-1 font-weight-medium my-2 justify-space-between font-weight-bold">
      {{$t('edit_order')}}
      <v-btn icon @click="$emit('close')"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text--primary">
      <h6 class="text-subtitle-1 font-weight-medium mt-4"></h6>
      <validation-observer>
          <v-autocomplete
              :items="names"
              outlined
              :label="$t('order_type')"
            v-model="order.name"
          ></v-autocomplete>
          <v-autocomplete
              :items="order_types.map((item)=> $t(item))"
              outlined
              :label="$t('employee')"
              v-model="order.details.order_type"
          ></v-autocomplete>

        <validation-provider
            v-slot="{ errors }"
            :name="$t('words.email')"
            rules="required">
          <v-text-field
              outlined
              :label="$t('client')"
              :error-messages="errors"
            v-model="order.details.client"
          >
          </v-text-field>
        </validation-provider>

        <v-text-field
            outlined
            v-model="order.details.pin"
            :label="$t('pin')"
        >
        </v-text-field>
      </validation-observer>
      <v-menu
          ref="menu"
          v-model="start_date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="start"
              outlined
              :label="$t('start_time')"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
      <v-time-picker
          v-model="start"
          :allowed-minutes="allowedStep"
          class="mt-4"
          format="24hr"
          :max="end"
      ></v-time-picker>
      </v-menu>
      <v-menu
          ref="menu"
          v-model="end_date"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="end"
              outlined
              :label="$t('end_time')"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
      <v-time-picker
          v-model="end"
          :allowed-minutes="allowedStep"
          class="mt-4"
          format="24hr"
          :min="start"
      ></v-time-picker>
      </v-menu>
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
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
	name: "orderModal",
	props: ["order", "names","order_types"],
	components: {ValidationObserver, ValidationProvider },
	data () {
		return {
			start: "0:0",
			start_date: false,
			end: "23:55",

			end_date: false,
		};
	},
	methods: {
		allowedStep: m => m % 5 === 0,
	},
};
</script>

<style scoped>

</style>
