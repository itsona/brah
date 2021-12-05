<template>
    <v-navigation-drawer  v-model="drawer" fixed temporary class="sidebar-drawer">
        <v-list dense class="py-0 sidebar">
            <v-list-item-group class="drawer-items">
                <v-list-item
                    v-for="(item, idx) in items"
                    class="expanded-item"
                    :class="{ 'title-active': itemActive(item) }"
                    :key="idx"
                >
                    <router-link :to="{ name: item.route }">
                        <v-list-item-icon class="sidebar-icon">
                            <v-icon class="mr-6 ml-2"> 
                                {{ item.icon }}
                            </v-icon>
                          {{$t(item.name)}}
                        </v-list-item-icon>
                    </router-link>
                </v-list-item>
                <v-list-item
                    class="drawer-open-btn">
                    <v-list-item-icon class="sidebar-icon" @click="clickDrawer">
                      <v-icon class="mr-6 ml-2">
                        chevron_left
                      </v-icon>
                      Close sidebar
                    </v-list-item-icon>
                </v-list-item>
                <v-list-item
                    @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                    class="daylight">
                    <v-list-item-icon class="sidebar-icon" >
                      <v-icon class="mr-6 ml-2">
                        wb_sunny
                      </v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>

        </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
	name: "SideNavigationDrawer",
	props: ["items"],
	data () {
		return {
			drawer: false,
		};
	},
	methods: {
		clickDrawer () {
			this.drawer = !this.drawer;
		},
		itemActive (item) {
			if (item.name === "Settings") {
				if (this.$route.path.split("/")[1] === "settings") {
					return true;
				}
			}
			if (this.$route.name === item.route) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>

<style lang="scss">
.expanded-item {
    width: 100%;
    display: flex;
    height: 70px;
    border-bottom: 1px solid var(--border-color);
}
.drawer-open-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.daylight {
  position: absolute;
  width: 100%;
  bottom: 70px
}

.drawer-items {
  height: 100vh;
  box-sizing: border-box;
}
.list {
  height: 100vh;
}

.sidebar-icon {
  color: #00d369;
}

.sidebar-drawer {
    box-shadow: none !important;
    box-shadow: inset 0px 2px 2px #ccc !important;
    left: 0 !important;
    position: fixed;
    z-index: 10000;
    height: 100vh !important;
    .item-title {
        color: var(--text-sub-black);
        font-size: 14px !important;
        font-weight: 600 !important;
    }
    .v-list-item.title-active {
        border-right: 2px solid var(--primary);
    }
    a {
        text-decoration: none;
    }
}
</style>
