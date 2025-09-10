<template>
  <div class="loading-overlay">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: linear-gradient(135deg, #1e5799 0%, #2989d8 50%, #7db9e8 100%);
  overflow: hidden;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 8px;
  animation: bounce 1.5s infinite ease-in-out both;
  box-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #7db9e8;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.15s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
