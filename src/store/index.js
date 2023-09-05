import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    placements: {
      Front: { width: 200, height: 320, x: 210, y: 50 },
      Back: { width: 200, height: 320, x: 600, y: 50 },
      "Left Sleeve": { width: 70, height: 250, x: 160, y: 50 },
      "Right Sleeve": { width: 70, height: 250, x: 410, y: 50 },
    },
    layerData: {
      rectangle1: {
        center: true,
        placement: "Front",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 150 },
        color: "#0000FF", // Blue color
      },
      rectangle2: {
        center: true,
        placement: "Front",
        position: { x: 0, y: 0 },
        size: { width: 70, height: 150 },
        color: "#FF0000", // Red color
      },
    },
    calculatedPositions: {
      Front: {},
      Back: {},
      "Left Sleeve": {},
      "Right Sleeve": {},
    },
  },
  mutations: {
    updatePlacements(state, payload) {
      state.placements[payload.placement] = payload.dimensions;
    },
    updateLayerData(state, { layer, data }) {
      state.layerData[layer] = data;
    },  
  },
});
