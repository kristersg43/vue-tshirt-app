<script>
export default {
  name: "VisualsPlacement",
  props: ["placementDimensions", "rectangles"],
  computed: {
    placements() {
      return this.$store.state.placements;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPlacements();
    });
  },
  watch: {
    placements: {
      deep: true,
      handler() {
        this.drawPlacements();
      },
    },
    rectangles: {
      deep: true,
      handler() {
        this.drawPlacements();
      },
    },
  },
  methods: {
    drawPlacements() {
      this.drawPlacement("Front", this.$refs.frontCanvas);
      this.drawPlacement("Back", this.$refs.backCanvas);
      this.drawPlacement("Left Sleeve", this.$refs.leftSleeveCanvas);
      this.drawPlacement("Right Sleeve", this.$refs.rightSleeveCanvas);
    },
    drawPlacement(placement, canvas) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw T-Shirt parts
        const dimensions = this.placementDimensions[placement];
        if (dimensions) {
          const tShirtColors = {
            Front: "purple",
            Back: "green",
            "Left Sleeve": "orange",
            "Right Sleeve": "black",
          };
          const fillColor = tShirtColors[placement] || "#62AD6D";
          ctx.fillStyle = fillColor;
          const centerX = canvas.width / 2 - dimensions.width / 2;
          const centerY = canvas.height / 2 - dimensions.height / 2;
          ctx.fillRect(centerX, centerY, dimensions.width, dimensions.height);
        }

        // Draw logo rectangles
        const layerData = this.rectangles;
        if (layerData) {
          for (const rectKey in layerData) {
            const rect = layerData[rectKey];
  
            // Calculate the center of each rectangle
            const rectCenterX =
              (parseInt(rect.position.x) + rect.size.width) / 2;
            const rectCenterY =
              (parseInt(rect.position.y) + rect.size.height) / 2;

            // Calculate the center of the canva
            const placemenCenterX = this.placementDimensions["Front"].width / 2;
            const placementCenterY =
              this.placementDimensions["Front"].height / 2;

            // Calculate the relative distance in percentage
            const deltaX =
              ((placemenCenterX - rectCenterX) /
                this.placementDimensions["Front"].width) *
              100;
            const deltaY =
              ((placementCenterY - rectCenterY) /
                this.placementDimensions["Front"].height) *
              100;

            const newX = (deltaX / 100) * this.placementDimensions[placement].width;
            const newY = (deltaY / 100) * this.placementDimensions[placement].height;

            // Calculate the aspect ratios for width for front
            const aspectRWidth =
              rect.size.width / this.placementDimensions["Front"].width;
            const aspectRatio = rect.size.width / rect.size.height;

            ctx.fillStyle = rect.color;
            if (
              this.placementDimensions["Front"].width === dimensions.width ||
              this.placementDimensions["Front"].height === dimensions.height
            ) {
              ctx.fillRect(newX, newY, rect.size.width, rect.size.height);
            } else {
              const updatedWidth = dimensions.width * aspectRWidth;
              const updatedHeight = updatedWidth / aspectRatio;
              ctx.fillRect(newX, newY, updatedWidth, updatedHeight);
            }
          }
        }
      }
    },
  },
};
</script>

<template>
  <div class="placement-canvas">
    <div class="shirt-parts">
      <div class="shirt-item">
        <h2>Front Side</h2>
        <canvas
          v-if="placements && placements['Front']"
          ref="frontCanvas"
          class="canvas"
          :width="placements['Front'].width"
          :height="placements['Front'].height"
        ></canvas>
      </div>
      <div class="shirt-item">
        <h2>Back Side</h2>
        <canvas
          v-if="placements && placements['Back']"
          ref="backCanvas"
          class="canvas"
          :width="placements['Back'].width"
          :height="placements['Back'].height"
        ></canvas>
      </div>
      <div class="shirt-item">
        <h2>Left Sleeve</h2>
        <canvas
          v-if="placements && placements['Left Sleeve']"
          ref="leftSleeveCanvas"
          class="canvas"
          :width="placements['Left Sleeve'].width"
          :height="placements['Left Sleeve'].height"
        ></canvas>
      </div>
      <div class="shirt-item">
        <h2>Right Sleeve</h2>
        <canvas
          v-if="placements && placements['Right Sleeve']"
          ref="rightSleeveCanvas"
          class="canvas"
          :width="placements['Right Sleeve'].width"
          :height="placements['Right Sleeve'].height"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<style>
.placement-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.shirt-parts {
  display: flex;
  gap: 20px;
}

.canvas {
  border: 1px solid #ccc;
}

h2 {
  margin: 0;
  padding: 10px;
}
</style>
