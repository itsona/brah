<template>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar
                flat
            >
              <v-btn
                  outlined
                  class="mr-4"
                  color="darken-1"
                  @click="setToday"
              >
                {{$t('today')}}
              </v-btn>
              <v-btn
                  fab
                  text
                  small
                  color="darken-1"
                  @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn
                  fab
                  text
                  small
                  color="darken-1"
                  @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-btn
                  text
                  color="darken-1"
                  class="ml-8 text-capitalize"
                  @click="addOrder"
              >
                <v-icon small class="mr-2">
                  add
                </v-icon>
                {{$t('new_order')}}
              </v-btn>
              <v-spacer></v-spacer>
              <v-menu
                  bottom
                  right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      outlined
                      color="darken-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <span>{{ $t(typeToLabel[type].toLowerCase()) }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'category'">
                    <v-list-item-title>{{$t('day')}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>{{$t('week')}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>{{$t('month')}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="590">
            <v-calendar
                ref="calendar"
                :key="calendarKey"
                v-model="focus"
                color="secondary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                category-show-all
                :categories="categories"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
            >
              <template v-slot:day-body="{ date, week }">
                <div
                    class="v-current-time"
                    :class="{ first: date === week[0].date }"
                    :style="{ top: nowY }"
                ></div>
              </template>
            </v-calendar>
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
            >
              <v-card
                  min-width="350px"
                  flat
              >
                <v-toolbar
                    :color="selectedEvent.color"
                    dark
                >
                  <v-btn icon @click="editDialog = true; isCreate = false">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="deleteDialogVisible = true">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span><v-row class="justify-space-between detail">{{$t('price')}}: <span class="detail-item">
                    {{(selectedEvent && selectedEvent.details && selectedEvent.details.price) ||
                  (prices[((selectedEvent && selectedEvent.details &&selectedEvent.details.order_type) || 'hair_trim')])}}{{$t('currency')}}</span></v-row><br></span>
                  <span
                      class="d-grid"
                      v-for="(item, key) in selectedEvent.details"
                      :key="key">
                    <v-row class="justify-space-between detail" v-if="key !== 'price'">
                      {{$t(key)}}: <span class="detail-item">
                      {{key === 'order_type' || key === 'pay_type' ? $t(item) : item}}
                    </span></v-row><br></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      text
                      @click="selectedOpen = false"
                  >
                    {{ $t('cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
        <v-dialog
            v-model="editDialog"
            width="600px"
            scrollable
        >
          <order-modal
              v-if="editDialog"
              :prices="prices"
              :order="{...selectedEvent}"
              :order_types="Object.keys(prices)"
              :names="names"
              :isCreate="isCreate"
              @close="editDialog = false"
              @saved="selectEvent"
              @added="addEvent"
            ></order-modal>
        </v-dialog>
        <v-dialog
          v-model="deleteDialogVisible"
          content-class="align-self-start mt-12"
          width="600px"
          max-width="90%">
        <v-card class="p-relative">
          <v-card-title class="text-body-1 font-weight-medium">
            {{$t('delete_order')}}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="text-body-1 pt-8">
              {{$t('delete_order_ask')}}</div>
          </v-card-text>
          <v-card-actions>
            <v-row class="dialog-footer text-right py-2">
              <v-col>
                <v-btn
                    color="primary"
                    depressed
                    text
                    @click="deleteDialogVisible = false"
                >{{$t('cancel')}}</v-btn>
                <v-btn
                    depressed
                    outlined
                    @click="onDeleteClick"
                    class="red--text mx-4"
                >{{ $t('yes') }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-row>
</template>



<script>
import OrderModal from "./orderModal";
export default {
	name: "App",
	components: {OrderModal},
	data: () => ({
		categories: [],
		ready: false,
		focus: "",
		editDialog: false,
		deleteDialogVisible: false,
		isCreate: false,
		calendarKey: 0,
		type: "category",
		typeToLabel: {
			month: "Month",
			week: "Week",
			category: "day",
		},
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange"],
		names: ["თამუნა", "ხვიჩა", "მაია", "გოჩა",],
		styilistColor: {
			"თამუნა": "blue",
			"ხვიჩა": "indigo",
			"მაია": "cyan",
			"გოჩა": "orange"
		},
		prices: {"hair_trim": "15", "hair_brush": "10", "hair_paint": "25", "beard_trim": "20"}
	}),
	mounted () {
		this.ready = true;
		this.scrollToTime();
		this.updateTime();
		this.ready = true;
		this.$refs.calendar.checkChange();
	},
	methods: {
		getCurrentTime () {
			return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0;
		},
		onDeleteClick(){
			this.events = this.events.filter((event)=> event.index !== this.selectedEvent.index);
			window.localStorage.setItem("events", JSON.stringify(this.events));
			this.updateRange();
			this.deleteDialogVisible = false;
			// this.selectedEvent = null;
		},
		selectEvent(event){
			event.color = this.styilistColor[event.name];
			this.events.forEach((item, index)=> {
				if(event.index === item.index) {
					this.events[index] = event;
				}
			});
			window.localStorage.setItem("events", JSON.stringify(this.events));
			this.updateRange();
			this.editDialog = false;
		},
		addEvent(event){
			event.timed= true;
			event.color= this.styilistColor[event.name];
			event.index = this.events.length;
			this.events.push(event);
			window.localStorage.setItem("events", JSON.stringify(this.events));
			this.updateRange();
			this.editDialog = false;
			this.isCreate = false;
		},
		scrollToTime () {
			const time = this.getCurrentTime();
			const first = Math.max(0, time - (time % 30) - 30);
			this.cal.scrollToTime(first);
		},
		updateTime () {
			setInterval(() => this.cal.updateTimes(), 60 * 1000);
		},
		viewDay ({ date }) {
			this.focus = date;
			this.type = "category";
		},
		getEventColor (event) {
			return event.color;
		},
		setToday () {
			this.focus = "";
			this.type = "category";
		},
		prev () {
			this.$refs.calendar.prev();
		},
		next () {
			this.$refs.calendar.next();
		},
		showEvent ({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				this.selectedElement = nativeEvent.target;
				requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				requestAnimationFrame(() => requestAnimationFrame(() => open()));
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		updateRange () {
			// window.localStorage.removeItem("events");
			if(!window.localStorage.getItem("events")) {
				const events = [
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 05 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 05 2021 16:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 05 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 05 2021 16:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 04 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 04 2021 12:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							order_type: "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 04 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 04 2021 12:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 02 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 02 2021 14:40:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							order_type: "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 02 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 02 2021 14:40:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 08 2021 11:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 08 2021 13:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							order_type: "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 08 2021 11:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 08 2021 13:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 11 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 11 2021 16:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							order_type: "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 11 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 11 2021 16:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 14 2021 12:20:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 14 2021 12:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							order_type: "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 14 2021 12:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 14 2021 12:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 06 2021 13:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 06 2021 14:40:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							order_type: "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 06 2021 13:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 06 2021 14:40:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 18 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 18 2021 15:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							order_type: "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 18 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 18 2021 15:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 14 2021 11:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 14 2021 11:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							order_type: "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 14 2021 11:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 14 2021 11:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 04 2021 17:20:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 04 2021 17:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							order_type: "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 04 2021 17:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 04 2021 17:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 09 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 09 2021 15:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							order_type: "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 09 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 09 2021 15:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 19 2021 13:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 19 2021 13:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							order_type: "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 19 2021 13:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 19 2021 13:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 21 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 21 2021 14:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							order_type: "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 21 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 21 2021 14:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name: "მაია",
						start: new Date("Sat Dec 22 2021 16:20:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 22 2021 16:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 22 2021 16:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 22 2021 16:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 24 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 24 2021 16:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 24 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 24 2021 16:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 28 2021 13:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 28 2021 13:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 28 2021 13:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 28 2021 13:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 28 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 28 2021 14:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 28 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 28 2021 14:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 24 2021 11:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 24 2021 11:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 24 2021 11:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 24 2021 11:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 27 2021 10:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 27 2021 10:25:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 27 2021 10:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 27 2021 10:25:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 30 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 30 2021 14:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 30 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 30 2021 14:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 29 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 29 2021 16:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 29 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 29 2021 16:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 10 2021 17:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 10 2021 17:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 10 2021 17:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 10 2021 17:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 30 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 30 2021 17:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 30 2021 16:00:00GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 30 2021 17:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 12 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 12 2021 12:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 12 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 12 2021 12:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 17 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 17 2021 13:15:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 17 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 17 2021 13:15:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 15 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 15 2021 12:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 15 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 15 2021 12:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 16 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 16 2021 17:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 16 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 16 2021 17:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 16 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 16 2021 14:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 16 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 16 2021 14:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 13 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 13 2021 12:25:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 13 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 13 2021 12:25:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 13 2021 13:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 13 2021 13:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 13 2021 13:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 13 2021 13:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 13 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 13 2021 16:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 13 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 13 2021 16:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 21 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 21 2021 16:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 21 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 21 2021 16:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"მაია",
						start: new Date("Sat Dec 20 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 20 2021 15:25:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["მაია"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 20 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 20 2021 15:25:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 14 2021 13:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 14 2021 13:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 14 2021 13:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 14 2021 13:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 25 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 25 2021 13:30:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 25 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 25 2021 13:30:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა: წვერის გასწორება",
						start: new Date("Sat Dec 25 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 25 2021 16:20:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 25 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 25 2021 16:20:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 07 2021 14:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 07 2021 15:00:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 07 2021 14:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 07 2021 15:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"გოჩა",
						start: new Date("Sat Dec 06 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 06 2021 12:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["გოჩა"],
						timed: true,
						details: {
							"order_type": "hair_paint",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 06 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 06 2021 12:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"თამუნა",
						start: new Date("Sat Dec 07 2021 16:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 07 2021 16:45:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["თამუნა"],
						timed: true,
						details: {
							"order_type": "hair_brush",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 07 2021 16:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 07 2021 16:45:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
					{
						name:"ხვიჩა",
						start: new Date("Sat Dec 03 2021 11:00:00 GMT+0400 (Georgia Standard Time)"),
						end: new Date("Sat Dec 03 2021 12:00:00 GMT+0400 (Georgia Standard Time)"),
						color: this.styilistColor["ხვიჩა"],
						timed: true,
						details: {
							"order_type": "beard_trim",
							"client": "testClient1",
							"start_time": new Date("Sat Dec 03 2021 11:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"end_time": new Date("Sat Dec 03 2021 12:00:00 GMT+0400 (Georgia Standard Time)").toLocaleTimeString(),
							"pin": "012345678912"
						}
					},
				];
				events.forEach((item, index)=> {
					item.index = index;
					item.details.pay_type = index % 3 ? "cash" : "card";
				});
				window.localStorage.setItem("events", JSON.stringify(events));
				this.events = events;
			}else {
				const events = window.localStorage.getItem("events");
				const eventsFromStorage = JSON.parse(events);
				const calendarEvents = eventsFromStorage.map((item)=> {
					return {
						...item,
						start: new Date(item.start),
						end: new Date(item.end),
						categories: item.name
					};
				});
				this.events = [...calendarEvents];
			}
			const categories = this.events.map((item)=> item.name);
			const setCategories = new Set(categories);
			this.categories = [...setCategories];
			console.log(this.categories);
		},
		rnd (a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},
		addOrder(){
			this.isCreate = true;
			this.editDialog = true;
			const event =  {};
			for(const key in this.events[0]){
				event[key] = "";
			}
			event.details = {};
			event.details.pay_type = "card";
			this.selectedEvent = event;
		}
	},
	computed: {
		cal () {
			return this.ready ? this.$refs.calendar : null;
		},
		nowY () {
			return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
		},
	}
};
</script>

<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>

<style lang="scss">
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

<style scoped>
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

.detail {
  padding: 0 10px;
  font-size: 1.3em;
}

#detail-item {
  font-weight: bold;
}

</style>
