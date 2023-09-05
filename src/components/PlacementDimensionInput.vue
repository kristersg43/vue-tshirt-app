<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["placements"]),
  },
  methods: {
    ...mapMutations(["updatePlacements"]),
    updatePlacementDimensions(placement, dimensionType) {
      const newDimensions = { ...this.placements[placement] };
      newDimensions[dimensionType] = parseInt(newDimensions[dimensionType]);
      this.updatePlacements({
        placement,
        dimensions: newDimensions,
      });
    },
  },
};
</script>

<template>
  <div class="section-container">
    <h2 class="section-title">Placement dimensions</h2>
    <div class="input-group">
      <div v-for="(dimension, placement) in placements" :key="placement">
        <div class="input-item">
          <h3 class="input-title">{{ placement }}</h3>
          <div class="input-item-group">
            <label :for="`width-${placement}`" class="input-label">Width:</label>
            <input
              :id="`width-${placement}`"
              v-model="dimension.width"
              type="number"
              class="data-input"
              :aria-label="`Width for ${placement}`"
              min="0"
              @input="updatePlacementDimensions(placement, 'width')"
            />
          </div>
          <div class="input-item-group">
            <label :for="`height-${placement}`" class="input-label">Height:</label>
            <input
              :id="`height-${placement}`"
              v-model="dimension.height"
              type="number"
              class="data-input"
              :aria-label="`Height for ${placement}`"
              min="0"
              @input="updatePlacementDimensions(placement, 'height')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  @media (max-width: 1366px) {
    .placement-input-group {
      flex-direction: column;
    }
  }
</style>
