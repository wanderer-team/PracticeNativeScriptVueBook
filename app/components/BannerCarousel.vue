<template functional>
  <carousel
    indicatorColor="#ffffff"
    :finite="true"
    :bounce="false"
    :showIndicator="true"
    verticalAlignment="top"
    android:indicatorAnimation="swap"
    color="white"
  >
    <carousel-item
      id="slide1"
      verticalAlignment="middle"
    >
      <image
        src="~/assets/images/banner.png"
        stretch="aspectFill"
      />
    </carousel-item>
    <carousel-item
      id="slide2"
      backgroundColor="#6497b1"
      verticalAlignment="middle"
    >
      <label
        text="Banner 2"
        backgroundColor="#500000"
        horizontalAlignment="center"
      />
    </carousel-item>
    <carousel-item
      id="slide3"
      backgroundColor="#005b96"
      verticalAlignment="middle"
    >
      <label
        text="Banner 3"
        backgroundColor="#500000"
        horizontalAlignment="center"
      />
    </carousel-item>
  </carousel>
</template>

<script>
export default {
  name: 'BannerCarousel',
}
</script>
