<template>
    <div class="note-flex">
        <div class="note-main">
            <div class="note-image"></div>
            <div class=""></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    noteData: Object
});
</script>

<style scoped>
/**note */
@media screen and (max-width: 950px){
    
}
@media screen and (min-width: 950px){
    
}
.note-flex{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.note-main{
    max-width: 1728px;
    min-width: 320px;
    margin: 0 auto;
}
</style>