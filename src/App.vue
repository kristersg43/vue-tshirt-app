<template>
  <div id='app'>
    <PlacementDimensionInput />
    <LayerDataInput />
    <VisualsPlacement
      :placementDimensions="placements"
      :rectangles="layerData"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PlacementDimensionInput from './components/PlacementDimensionInput.vue';
import LayerDataInput from './components/LayerDataInput.vue';
import VisualsPlacement from './components/VisualsPlacement.vue';

export default {
  components: {
    PlacementDimensionInput,
    LayerDataInput,
    VisualsPlacement,
  },
  computed: {
    ...mapState(['placements', 'layerData']),
  },
};
</script>
