<template>
  <div class="v-spinner text-center" style="width: 50px" v-if="loading">
    <div class="v-ring v-ring1" v-bind:style="spinnerBasicStyle">
      <div class="v-ring v-ring2" v-bind:style="spinnerStyle">
      </div>
      <div class="v-ring v-ring3" v-bind:style="spinnerStyle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "Loader",
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: "#5dc596"
		},
		size: {
			type: String,
			default: "60px"
		},
		margin: {
			type: String,
			default: "2px"
		},
		radius: {
			type: String,
			default: "100%"
		}
	},
	data() {
		return {
			loader: false,
		};
	},
	created: function () {
		this.$store.watch(
			(state) => state.loader,
			() => {
				this.loader = this.$store.state.loader;
			}
		);
	},
	computed: {
		spinnerStyle() {
			return {
				height: this.size,
				width: this.size,
				border: parseFloat(this.size) / 10 + "px solid" + this.color,
				opacity: 0.4,
				borderRadius: this.radius
			};
		},
		spinnerBasicStyle() {
			return {
				height: this.size,
				width: this.size,
				position: "relative"
			};
		}
	}
};
</script>

<style scoped>
.v-spinner {
  z-index: 999;
  margin: 0 auto;
}

.v-spinner .v-ring1 {
}

.v-spinner .v-ring2 {
  -webkit-animation: v-ringRightRotate 2s 0s infinite linear;
  animation: v-ringRightRotate 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  perspective: 800px;
  position: absolute;
}

.v-spinner .v-ring3 {
  -webkit-animation: v-ringLeftRotate 2s 0s infinite linear;
  animation: v-ringLeftRotate 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  perspective: 800px;
  position: absolute;
}

@-webkit-keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);

  }
}

@keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);

  }
}

@-webkit-keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);

  }
}

@keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);

  }
}
</style>
