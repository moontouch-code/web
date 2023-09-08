<template></template>

<script>
import { setClickTimes } from "../apis/login";
export default {
  name: "beeEvent",
  beforeCreate() {
    setClickTimes({
      appId: "87245bf5fb0fb9a83f3682d09642ca60",
      type: "BEEEVENT",
    }).then(() => {
      window.location.href =
        "https://docs.google.com/document/d/1IJLSWSlnaSq6mhtdp2WKTe9De0bBgCPi/edit?usp=sharing&ouid=113706627568301833138&rtpof=true&sd=true";
    });
  },
  methods: {},
};
</script>
