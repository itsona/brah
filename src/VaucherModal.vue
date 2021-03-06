<template>
  <v-card class="buy-manage-budget-modal">
    <v-card-title class="text-body-1 font-weight-medium my-2 justify-space-between font-weight-bold">
      {{$t(isCreate? 'add_order' :'edit_order')}}
      <v-btn icon @click="$emit('close')"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text--primary">
      <h6 class="text-subtitle-1 font-weight-medium mt-4"></h6>
      <validation-observer ref="observer">
        <v-autocomplete
            :items="names"
            outlined
            :label="$t('employee')"
            v-model="innerOrder.name"
        ></v-autocomplete>
        <v-autocomplete
            :items="order_types.map((item)=> {
                return {
                  text: $t(item),
                  value: item,
                }
                })"
            outlined
            :label="$t('order_type')"
            v-model="innerOrder.details.order_type"
        ></v-autocomplete>

        <validation-provider
            v-slot="{ errors }"
            :name="$t('words.client')"
            rules="required">
          <v-text-field
              outlined
              :label="$t('client')"
              :error-messages="errors"
              v-model="innerOrder.details.client"
          >
          </v-text-field>
        </validation-provider>

        <validation-provider
            v-slot="{ errors }"
            :name="$t('words.pin')"
            rules="max:11|min:11">
          <v-text-field
              outlined
              type="number"
              :error-messages="errors"
              v-model="innerOrder.details.pin"
              :label="$t('pin')"
          >
          </v-text-field>
        </validation-provider>
      </validation-observer>
      <v-text-field
          outlined
          type="number"
          :value="prices[innerOrder.details.order_type]"
          :label="$t('price')"
          @input="(event)=> innerOrder.details.price = event"
      ></v-text-field>
      <v-select
          :items="[{text: $t('card'), value: 'card'}, {text: $t('cash'), value: 'cash'}]"
          :label="$t('pay_type')"
          outlined
          v-model="innerOrder.details.pay_type"
      ></v-select>
      <v-menu
          ref="menu"
          v-model="selectedDate"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              outlined
              :label="$t('exact_date')"
              readonly
              v-model="date"
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            no-title
            v-model="date"
            class="mt-4"
        ></v-date-picker>
      </v-menu>
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
              >{{$t('cancel')}}</v-btn>
              <v-btn
                  color="primary"
                  depressed
                  outlined
                  class="mx-4"
                  @click="saveOrder"
              >{{$t('save')}}</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-actions>
  </v-card>

</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {scrollToValidation} from "./js/common/helpers";

export default {
	name: "VaucherModal",
	props: ["order", "names","order_types","isCreate", "prices"],
	components: {ValidationObserver, ValidationProvider },
	data () {
		return {
			start: "",
			start_date: false,
			end: "",
			selectedDate: false,
			end_date: false,
			date: "",
			innerOrder: {},
		};
	},
	methods: {
		allowedStep: m => m % 5 === 0,
		async saveOrder(){
			this.innerOrder.start = new Date(this.date + ":" + this.start);
			this.innerOrder.end = new Date(this.date + ":" + this.end);
			this.innerOrder.details.start_time = this.innerOrder.start.toLocaleTimeString();
			this.innerOrder.details.end_time = this.innerOrder.end.toLocaleTimeString();
			const r = await this.$refs.observer.validate();
			scrollToValidation();
			if(!r) return;
			this.$emit(this.isCreate ? "added": "saved", this.innerOrder);
		}
	}
};
</script>

<style scoped>

</style>
