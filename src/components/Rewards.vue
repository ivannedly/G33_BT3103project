<template>
<div>
    <div class="reward-title">Rewards</div><br>
    <div class="whole-list">
        <div class="reward-list">
            <a>$3 off next train/bus ride!</a>
        </div>
        <a style="float:right" v-if="reward1">Reach Level 10 to lock reward!</a><br><br>

        <div class="reward-list">
            <a>$5 off next train/bus ride!</a>
        </div>
        <a style="float:right" v-if="reward2">Reach Level 20 to lock reward!</a><br><br>

        <div class="reward-list">
            <a>$10 cashback!</a>
        </div>
        <a style="float:right" v-if="reward3">Reach Level 30 to lock reward!</a><br><br>
        
        <div class="reward-list">
            <a>$15 cashback</a>
        </div>
        <a style="float:right" v-if="reward4">Reach Level 40 to lock reward!</a><br>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            reward1: true,
            reward2: true,
            reward3: true,
            reward4: true,
        }
    }
}
</script>

<style scoped>
.reward-title {
    text-align: center;
    font-size: 40px;
    padding-top: 20px;
}
.whole-list {
    position:relative;
    padding-left: 50px;
    padding-right: 50px;
}
.reward-list {
    border: 1px solid black;
    border-radius: 2px;
    text-align: center;
    font-size: 20px;
    padding-top: 10px;
    color: grey;
    background-color:aliceblue;
    height: 40px;
}
</style>