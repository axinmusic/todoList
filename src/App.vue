<template>
  <div>
    <Banner />
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <router-link
            class="list-group-item"
            active-class="active"
            :to="{
              // path: '/about',
              name: 'guanyu',
            }"
            >About</router-link
          >
          <router-link class="list-group-item" active-class="active" to="/home"
            >Home</router-link
          >
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- <h2>我是Home的内容</h2> -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
export default {
  name: 'App',
  components: { Banner },
}
</script>
