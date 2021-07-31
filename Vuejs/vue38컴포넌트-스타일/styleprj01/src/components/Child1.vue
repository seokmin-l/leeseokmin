<style>
.main {
    border: 1px solid black;
    background-color: green;
}
</style>
<template>
    <div class="main">
        {{ msg }}
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            msg: "Child1"
        };
    }
};
</script>