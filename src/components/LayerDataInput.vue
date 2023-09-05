<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["layerData", "placements"]),
  },
  methods: {
    ...mapMutations(["updateLayerData", "moveRectangle"]),
    updateLayerData() {
      const updatedRectangle1 = {
        ...this.layerData.rectangle1,
        size: {
          width: parseFloat(this.layerData.rectangle1.size.width),
          height: parseFloat(this.layerData.rectangle1.size.height),
        },
        color: this.layerData.rectangle1.color,
      };

      const updatedRectangle2 = {
        ...this.layerData.rectangle2,
        size: {
          width: parseFloat(this.layerData.rectangle2.size.width),
          height: parseFloat(this.layerData.rectangle2.size.height),
        },
        color: this.layerData.rectangle2.color,
      };

      // Keeps the changes away from Rectangle 1
      if (this.isInsideFront(updatedRectangle1)) {
        this.$store.commit("updateLayerData", {
          layer: "rectangle1",
          data: updatedRectangle1,
        });
      }

      // Keeps the changes away from Rectangle 2
      if (this.isInsideFront(updatedRectangle2)) {
        this.$store.commit("updateLayerData", {
          layer: "rectangle2",
          data: updatedRectangle2,
        });
      }
    },
    isInsideFront(rectangle) {
      const frontPlacement = this.placements["Front"];
      if (!frontPlacement) return false;

      const x1 = rectangle.position.x;
      const y1 = rectangle.position.y;
      const x2 = x1 + rectangle.size.width;
      const y2 = y1 + rectangle.size.height;

      return (
        x1 >= frontPlacement.x &&
        y1 >= frontPlacement.y &&
        x2 <= frontPlacement.x + frontPlacement.width &&
        y2 <= frontPlacement.y + frontPlacement.height
      );
    },
  },
};
</script>

<template>
  <div class="section-container">
    <h2 class="section-title">Design</h2>
    <div class="input-group">
      <div class="input-item">
        <h3 class="input-title">Item 1</h3>
        <div class="input-group">
          <label class="input-label" for="rect1-x" type="number">X:</label>
          <input
            v-model="layerData.rectangle1.position.x"
            type="number"
            id="rect1-x"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect1-y" type="number">Y:</label>
          <input
            v-model="layerData.rectangle1.position.y"
            type="number"
            id="rect1-y"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect1-width" type="number"
            >Width:</label
          >
          <input
            v-model="layerData.rectangle1.size.width"
            type="number"
            id="rect1-width"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect1-height" type="number"
            >Height:</label
          >
          <input
            v-model="layerData.rectangle1.size.height"
            type="number"
            id="rect1-height"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect1-color">Color:</label>
          <input
            v-model="layerData.rectangle1.color"
            type="color"
            id="rect1-color"
            class="color-data-input"
          />
        </div>
      </div>
      <div class="input-item">
        <h3 class="input-title">Item 2</h3>
        <div class="input-group">
          <label class="input-label" for="rect2-x" type="number">X:</label>
          <input
            v-model="layerData.rectangle2.position.x"
            type="number"
            id="rect2-x"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect2-y" type="number">Y:</label>
          <input
            v-model="layerData.rectangle2.position.y"
            type="number"
            id="rect2-y"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect2-width" type="number"
            >Width:</label
          >
          <input
            v-model="layerData.rectangle2.size.width"
            type="number"
            id="rect2-width"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect2-height" type="number"
            >Height:</label
          >
          <input
            v-model="layerData.rectangle2.size.height"
            type="number"
            id="rect2-height"
            class="data-input"
            @input="updateLayerData"
          />
        </div>
        <div class="input-group">
          <label class="input-label" for="rect2-color">Color:</label>
          <input
            v-model="layerData.rectangle2.color"
            type="color"
            id="rect2-color"
            class="color-data-input"
          />
        </div>
      </div>
    </div>
  </div>
</template>
