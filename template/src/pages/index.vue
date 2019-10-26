<template>
    <section class="home">
        <img src="@/assets/path-logo.png" class="home-logo">
        <h1 class="big-txt">
            Heyy! This Page is powered by path-vue Server side rendering
        </h1>
        <h2 class="grey-txt">Modern, Flexible, Simple and Elegant PHP Framework</h2>
        <p>
            Path is a PHP framework crafted for modern PWA and SPA
        </p>
        <div>
            <p class="border">
                This page was server side rendered, the data below was bound from ./path/Routes.php:48-49
            </p>
            <!--          because $state variable only available when component is rendered from the server-->
            <div class="center">
                <div class="flex">
                    <b>State name:</b>
                    <span>
                      {{$store.state.name}}
                  </span>
                </div>
                <div class="flex">
                    <b>State school:</b>
                    <span>
                      {{$store.state.school}}
                  </span>
                </div>

            </div>
        </div>
        <p class="flex buttons">
            <a target="_blank" href="https://path.adewale.dev/docs/v0.0.1/">Docummentation</a>
            <a target="_blank" href="https://github.com/Wharley01/Path">Contribute</a>
        </p>
    </section>
</template>

<script>
    // @ is an alias to /src
    import axios from "axios"
    export default {
        name: 'home',
        components: {

        },
        data(){
            return {
                count: 0
            }
        },

        async created () {
            let cats = await axios.get('https://path.adewale.dev');
            console.log(cats);
        }
    }
</script>
<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Poppins:300,400,400i,500,600&display=swap");
    body{
        font-family: 'Poppins', sans-serif;
    }
    $color: #3f51b5;
    $grey: #888888;
    .home-logo{
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .home{
        margin-top: 100px;
        text-align: center;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    .flex{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }
    .big-txt{
        font-size: 40px;
    }
    .grey-txt{
        color: $grey;
    }
    .buttons{
        margin-top: 50px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        a{
            background: $color;
            padding: 10px 20px;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 18px;
            border-radius: 14px;
        }
    }
    .border{
        border: 2px solid #a9a9a9;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .center{
        text-align: center;
    }
</style>
