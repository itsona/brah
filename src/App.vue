<template>
  <v-app color="primary">
    <v-row class="ma-0">
      <vue-progress-bar/>
      <stock-sidebar></stock-sidebar>
      <v-col col="12">
        <v-tabs v-model="activeTab">
          <v-tabs-slider />
          <v-tab class="px-8">Active</v-tab>
          <v-tab class="px-8">Invited</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <calendar/>
          </v-tab-item>
          <v-tab-item>
            <v-col col="12" style="min-height: 80vh; padding-top: 24px">
              <v-row class="justify-space-between">

                <v-card
                    class="mx-6 pa-4 px-8"
                >
                  <v-card-title>{{$t('total_day_income')}}</v-card-title>
                  <v-card-text>
                    <v-row  class="font-32 align-center">
                      <span class="title-red ">225 ₾</span>
                      <v-icon color="red" class="px-3 d-block"
                              style="width: 50px">show_chart_sharp</v-icon>
                      <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-card
                    class="mx-6 pa-4 px-8"
                >
                  <v-card-title>{{$t('total_day_income')}}</v-card-title>
                  <v-card-text>
                    <v-row  class="font-32 align-center">
                      <span class="title-green ">225 ₾</span>
                      <v-icon color="green" class="px-3 d-block"
                              style="width: 50px">show_chart_sharp</v-icon>
                      <span style="color: unset">({{$t('yesterday')}}: 188 ₾)</span>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-card
                    class="mx-6 pa-4 px-8"
                >
                  <v-card-title>{{$t('total_day_income')}}</v-card-title>
                  <v-card-text>
                    <v-row  class="font-32 align-center">
                      <span class="title-red ">225 ₾</span>
                      <v-icon color="red" class="px-3 d-block"
                              style="width: 50px">show_chart_sharp</v-icon>
                      <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-card
                    class="mx-6 pa-4 px-8"
                >
                  <v-card-title>{{$t('total_day_income')}}</v-card-title>
                  <v-card-text>
                    <v-row  class="font-32 align-center">
                      <span class="title-red ">225 ₾</span>
                      <v-icon color="red" class="px-3 d-block"
                              style="width: 50px">show_chart_sharp</v-icon>
                      <span style="color: unset">({{$t('yesterday')}}: 248 ₾)</span>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-row>
              <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="5"
                  class="pt-12 mt-15"
              ></v-data-table>
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <snackbar></snackbar>
  </v-app>
</template>

<script>

import Calendar from "./calendar";
import StockSidebar from "./StockSidebar";
import Snackbar from "./components/Snackbar";
export default {
	name: "App",
	components: {StockSidebar, Calendar, Snackbar},
	data() {
		return {
			activeTab: 0,
			headers: [
				{
					text: this.$t("employee"),
					align: "start",
					sortable: true,
					value: "employee",
				},
				{
					text: this.$t("orders_count"),
					sortable: true, value: "orders_count" },
				{
					text: this.$t("orders_net"),
					sortable: true, value: "orders_net" },
				{
					text: this.$t("orders_net_payed"),
					sortable: true, value: "orders_net_payed" },
				{
					text: this.$t("orders_net_bought"),
					sortable: true, value: "orders_net_bought" },
			],
			desserts: [
				{
					employee: "ხვიჩა",
					orders_count: 27,
					orders_net: 185,
					orders_net_payed: 112,
					orders_net_bought: 8,
				},
				{
					employee: "მაია",
					orders_count: 76,
					orders_net: 85,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "გოჩა",
					orders_count: 120,
					orders_net: 2732,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "თამუნა",
					orders_count: 61,
					orders_net: 850,
					orders_net_payed: 0,
					orders_net_bought: 220,
				},
				{
					employee: "მაია",
					orders_count: 76,
					orders_net: 85,
					orders_net_payed: 42,
					orders_net_bought: 77,
				},
				{
					employee: "გოჩა",
					orders_count: 120,
					orders_net: 2732,
					orders_net_payed: 0,
					orders_net_bought: 0,
				},
				{
					employee: "თამუნა",
					orders_count: 61,
					orders_net: 850,
					orders_net_payed: 0,
					orders_net_bought: 220,
				},
			]
		};
	},
	created() {
		this.$i18n.locale = window.localStorage.getItem("locale") || "ka";
		this.$vuetify.theme.dark = !!window.localStorage.getItem("dark");
	}
};
</script>

<style lang="scss" scoped>
.title-red {
  color: red;
}
.title-green {
  color: green;
}

</style>

<style>
.lngbox {
  border: none;
}

@font-face {
  font-family: FiraGo_Regular;
  src: url("fonts/FiraGO-Regular.woff");
}

@font-face {
  font-family: FiraGo_SemiBold;
  src: url("fonts/FiraGO-SemiBold.woff");
}

body {
  font-family: "FiraGo_Regular", sans-serif;
}

html {
  overflow-y: unset;
   --scrollbarBG: #CFD8DC;
   --thumbBG: #90A4AE;
 }
.v-calendar-daily__scroll-area::-webkit-scrollbar {
  width: 11px;
}
.v-calendar-daily__scroll-area {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.v-calendar-daily__scroll-area::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.v-calendar-daily__scroll-area::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}

.v-application {
  font-family: "FiraGo_Regular" !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "FiraGo_SemiBold", sans-serif;
  font-weight: 400;
}

.font-weight-600 {
  font-weight: 600;
}

.font-color-primary {
  color: #293961 !important;
}

.cursor-pointer {
  cursor: pointer;
}

.header-entry:hover {
  color: rgb(0, 211, 105);
}

@media screen {
}

@media (max-width: 1000px) {
  .hide-under-1000 {
    display: none;
  }
}

@media (max-width: 1330px) {
  .hide-under-1330 {
    display: none;
  }
}
</style>

<style>
.introhighlightClass1 {
  background: white;
  /* z-index: -1; */
  /* box-shadow: 2px 22px 100px 10px rgb(131, 131, 131); */
  border: 1px solid rgb(255, 255, 255) !important;
  /* border-bottom: 3px solid rgb(91, 255, 118); */
  /* border-radius: 5px; */
}

.introhighlightClass2 {
  /* z-index: -1; */
  /* box-shadow: 2px 22px 100px 10px rgb(131, 131, 131); */
  background: none;
  border: 1px solid rgb(255, 255, 255) !important;
  /* border-bottom: 3px solid rgb(91, 255, 118); */
  border-radius: 5px;
}

.introjs-overlay {
  z-index: 5 !important;
  opacity: 0.3 !important;
}

.tooltipClass {
  border-radius: 10px !important;
}

.tooltipClass .introjs-tooltiptext {
  margin: 30px 10px 50px 10px;
  font-family: "FiraGo_Regular";
  font-size: 15px;
  color: #293961;
}

.tooltipClass .introjs-progressbar {
  background-color: rgb(0, 211, 105);
}

.introjs-tooltipReferenceLayer {
  z-index: 9999999;
}

.introjs-button:hover {
  background-color: #ffffff;
  box-shadow: none;
}

.introjs-button {
  border-radius: 28px;
  border: 1px solid rgb(204, 204, 204);
  background-color: #ffffff;
  align-items: center;
  background-image: none;
  font-size: 12px;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
}

.introjs-disabled {
  display: none;
}

.leftnavbar {
  z-index: 999999;
}

.color_green {
  color: #00d369 !important;
}

.finish_txt_ka_mobile {
  margin-left: -15px;
}

.choose_temp_text {
  left: 0;
  margin-top: 60px;
}

.fixed {
  position: fixed;
  bottom: 0;
}

.free-trial-info{
  width: 100%;
}

@media (max-width: 960px) {
  .choose_temp_text {
    margin-left: -5px;
    margin-top: 80px;
  }
}

@media (max-width: 600px) {
  .mb-xs-25 {
    margin-bottom: 100px;
  }

  .finish_txt_ka_mobile {
    margin-left: -10px;
  }
}

.row {
  margin-block: 0;
}

@media (max-width: 1250px) {
  .extra_discount_txt {
    font-size: 22px !important;
  }
}

@media (max-width: 1000px) {
  .extra_discount_txt {
    font-size: 18px !important;
  }
}
</style>
