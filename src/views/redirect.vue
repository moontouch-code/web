<template></template>

<script>
import { setClickTimes } from "../apis/login";
export default {
  name: "redirect",
  beforeCreate() {
    setClickTimes({
      appId: "87245bf5fb0fb9a83f3682d09642ca60",
      type: "REDIRECT",
    }).then(() => {
      window.location.href =
        "https://docs.google.com/document/d/1yfypJAlp12LTv8u_lrrIxzIMxMc5bIKn/edit?usp=sharing&ouid=113706627568301833138&rtpof=true&sd=true";
    });
  },
  methods: {},
};
</script>
