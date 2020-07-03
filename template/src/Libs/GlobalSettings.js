import {mapMutations, mapState} from "vuex";

export default {
    data(){
        return {

        }
    },
    async created(){
        if(this.settings !== null)//settings fetched, don't etch again
            return ;

        let Graph = this.$graph;

        try{
            this.fetching = true;
            let Settings = new Graph().service('GlobalSetting/getOne');
            Settings = await Settings.get();
            this.SET_SETTINGS(Settings.getData());
        }catch (e) {
            this.onError(e);
        }
        this.fetching = false;
    },
    methods:{
        ...mapMutations([
            'SET_SETTINGS'
        ])
    },
    computed:{
        ...mapState([
            'settings'
        ])
    }
}
