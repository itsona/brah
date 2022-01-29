<template>
  <div class="sidebar mr-4 ">
    <side-navigation-drawer :items="items" ref="drawer" />
    <div class="sidebar-wrapper">
      <div class="sidebar-items">
        <router-link :to="{ name: item.route }"
                     v-for="(item, idx) in items"
                     :key="idx"
                     style="text-decoration: none; color: inherit;">
          <div
              class="sidebar-item"
              :class="{ 'item-active': itemActive(item) }"
          >
            <v-icon class="sidebar-icon"> {{ item.icon }} </v-icon>
          </div>

        </router-link>
        <v-spacer></v-spacer>
        <div class="drawer-open-btn" @click="clickDrawer">
          <v-icon class="sidebar-icon">
            chevron_right
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigationDrawer from "./SideNavigationDrawer.vue";

export default {
	name: "StockSidebar",
	data () {
		return {
			drawer: false,
			items: [
				{ name: "home", icon: "home", route: "Home" },
				{ name: "clients", icon: "people", route: "Clients" },
				{ name: "Reports", icon: "analytics", route: "Reports" },
				{ name: "assortment", icon: "category", route: "stock-assortment" },
				{ name: "transfers", icon: "swap_calls", route: "stock-transfers" },
				{ name: "operate", icon: "build", route: "stock-operate" },
				{ name: "settings", icon: "settings", route: "stock-settings-main" },
			],
		};
	},
	methods: {
		itemActive (item) {
			return this.$route.name === item.route;
		},
		clickDrawer () {
			this.$refs.drawer.clickDrawer();
		}

	},
	components: {
		SideNavigationDrawer
	}
};
</script>

<style lang="scss" scoped>
.sidebar{
  width: 100%;
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  color: var(--text-sub-black);
}
.sidebar {
  width: 70px;
}

.sidebar-items {
  height: 100vh;
  position: fixed;
  border-right: 1px solid rgba(180,180, 180, 0.6);
}

.sidebar-icon {
  width: 70px;
  height: 70px;
}

.drawer-open-btn {
  display: flex;
}

</style>
