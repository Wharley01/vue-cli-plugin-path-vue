import {mapMutations, mapState} from "vuex";

export default {
    data(){
        return {

        }
    },
    async created(){
        if(this.profile !== null)//profile fetched, don't fetch again
            return ;

        let Graph = this.$graph;

        try{
            this.fetching = true;
            let Profile = new Graph().service('Seller/getOne').fetch(
                "id",
                "main_product_id"
            );
            Profile = await Profile.get();

            this.SET_PROFILE(Profile.getData());
        }catch (e) {
            this.onError(e);
        }
        this.fetching = false;
    },
    methods:{
        ...mapMutations([
            'SET_PROFILE'
        ])
    },
    computed:{
        ...mapState([
            'profile'
        ])
    }
}
