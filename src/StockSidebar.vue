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
                <div class="drawer-open-btn" @click="clickDrawer">
                    <v-icon class="sidebar-icon">
                        chevron_right
                    </v-icon>
                </div>
            </div>
        </div>
        <router-view></router-view>
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
				{ name: "home", icon: "home", route: "stock-home" },
				{ name: "Overview", icon: "analytics", route: "stock-overview" },
				{ name: "Operate", icon: "build", route: "stock-operate" },
				{ name: "Assortment", icon: "category", route: "stock-assortment" },
				{ name: "Transfers", icon: "swap_calls", route: "stock-transfers" },
				{ name: "Settings", icon: "settings", route: "stock-settings-main" },
			],
		};
	},
	methods: {
		itemActive (item) {
			if (item.name === "Settings") {
				if (this.$route.path.split("/")[1] === "settings") {
					return true;
				}
			}
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
  height: 100vh;
  color: var(--text-sub-black);
  border-right: 1px solid rgba(180,180, 180, 0.6);
}
.sidebar {
  width: 50px;
}

.sidebar-icon {
  width: 50px;
  height: 50px;
}

.drawer-open-btn {
  display: flex;
  position: absolute;
  bottom: 0;
}

</style>
