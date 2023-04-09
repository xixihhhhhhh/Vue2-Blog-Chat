<template>
    <div class="file-card" @mouseover="hover = true" @mouseleave="hover = false"
        @click="$router.push({ name: 'oneUser', params: { id: user.id } })">
        <div class="file-card-img">
            <img :src="user.img" alt="" class="file-img">
            <div class="file-card-title" :class="{ 'file-card-title-hover': hover }">{{ user.name.slice(0, 10) }}</div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hover: false,
            File: {},
            baseurl: 'http://fileimg.mgaronya.com/',
        }
    },
    created() {
        console.log(this.user);
    }
}
</script>
  
<style scoped>
.file-card {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    cursor: pointer;
    margin: 10px;
}

.file-card-img {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.file-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.file-card-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    color: #fff;
    font-size: 22px;
    white-space: nowrap;
    font-weight: 600;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.5);
}

.file-card-title:before {
    content: "";
    position: absolute;
    left: 0;
    width: 0%;
    height: 4px;
    background-color: #f1c40f;
    transition: all 0.5s ease;
}

.file-card-title:after {
    content: "";
    position: absolute;
    right: 0;
    width: 0%;
    height: 4px;
    background-color: #3498db;
    transition: all 0.5s ease;
}

.file-card-title:before {
    top: 0;
}

.file-card-title:after {
    bottom: 0;
}

.file-card-title:hover:before,
.file-card-title:hover:after {
    width: 100%;
}

.file-card-title:hover {}

.file-card-title-hover {
    /* transform: translateY(-100%); */
}

.file-card:hover {
    transform: scale(1.05);
}

.file-card:hover .file-card-title {
    /* transform: translateY(0); */
}</style>