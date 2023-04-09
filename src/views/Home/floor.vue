<template>
    <div class="firstFloor">
        <div>{{ title }}</div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line x1="80" y1="5" x2="120" y2="5" style="stroke: rgb(0, 0, 0); stroke-width: 2" />
            <circle cx="140" cy="5" r="4" stroke="black" stroke-width="2" fill="white" />
            <line x1="160" y1="5" x2="200" y2="5" style="stroke: rgb(0, 0, 0); stroke-width: 2" />
        </svg>
        <div>添加本站链接即可成为“友情特约”，数量有限！</div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['title']
}
</script>

<style lang="scss" scoped>
.firstFloor {
    @include wh(100%, 12rem);
    text-align: center;
    background-color: #202529;

    >div:first-child {
        font-size: 2.5rem;
        padding-top: 2rem;
        margin-bottom: 1.2rem;
        color: #ddd;
    }

    svg {
        height: 1rem;
        margin-bottom: 1rem;
    }

    >div:last-child {
        color: gray;
    }
}
</style>