import BuildForm from "./BuildForm";
import { Response } from "@__path/graph";
import {mapGetters, mapMutations} from "vuex";
import debounce from "lodash.debounce"
export default {
    data(){
        return {
            Graph: null,
            service:'',
            form:{},
            data: null,
            columns: [],
            current_page: 1,
            total_pages: 1,
            search_query:{
                value: null,
                errors:[]
            },
            search_col: null,
            fetching: false,
            silent_fetch: false,
            fetching_more: false,
            loading: false,
            error: null,
            $__cache_key: null,
            cache: true
        }
    },
    created(){
        this.Graph = new this.$graph();
        this.Graph.service(this.service);

    },
    methods:{
        sendRequest: async function (method, values = {}, done = null, errorFunc = null, successFunc = null) {

            try {
                let res = await this.Graph[method](values);
                if (successFunc) {
                    successFunc(res);
                }
                if (done) {
                    done(res);
                }
                return res;
            } catch (e) {

                if(e instanceof Response){
                    if (done instanceof Function) done();
                    if (errorFunc instanceof Function) errorFunc(e);
                    return e;
                }

            }

        },
        async nextPage(){
            // console.log('in the end');
            if(this.current_page >= this.total_pages){
                console.log('__>> page ended');
                return ;
            }
            this.current_page += 1;
            this.fetching_more = true;
            this.executeFetch((res) => {
                this.data = [
                    ...this.data,
                    ...res.getData()
                ]
            })

        },
        initiateFetch(...columns){
            if(columns.length){
                this.columns = columns;
                this.Graph.fetch(...columns);
            }else{
                this.Graph.fetch(...this.columns);
            }
            this.Graph.service(this.service);

            //set page
            // this.Graph.page(this.current_page);
        },
        async executeFetch(resFunc = null){
            this.Graph.page(this.current_page);
            this.Graph.service(this.service);
            this.Graph.fetch(...this.columns);
            if(this.search_col){
                if(this.search_query.value && typeof this.search_query.value == 'string' && this.search_query.value.trim().length){
                    this.Graph.search(this.search_col,this.search_query.value);
                }else{
                    this.Graph.search(this.search_col, null);
                }
            }
            this.error = null;
            return new Promise(async (resolve,reject) => {
                try {
                    let res = await this.sendRequest('get', {},(res) => {
                        this.onSuccess(res);
                        this.fetching = false;
                        this.fetching_more = false;
                    },(res) => {
                        this.fetching = false;
                        this.fetching_more = false;
                        this.onFetchError(res);
                        this.error = res;
                    });
                    if(!resFunc){
                        this.data = res.getData();
                        this.current_page = res.getCurrentPage();
                        this.total_pages = res.getTotalPages();
                        if(this.cache){
                            //if should cache, then cache
                            this.CACHE_RESPONSE({key: this.$__cache_key, response: res},{}/*useless*/);
                        }
                    }else {
                        resFunc(res);
                        this.current_page = res.getCurrentPage();
                        this.total_pages = res.getTotalPages();
                    }
                    resolve(res)
                }catch (e) {
                    reject(e)
                }
            })
        },
        async fetch(...columns){
        //    do fetching
            this.initiateFetch(...columns);
            //check if there is cache available, if yes, use it instead
            this.$__cache_key = this.Graph.getCacheHash();

            if(this.is_cached(this.$__cache_key) && this.cache){
                //we have a cached version
                //set it as the data
                let res =  this.get_cached_response(this.$__cache_key);
                this.data = res.getData();
                this.current_page = res.getCurrentPage();
                this.total_pages = res.getTotalPages();
                console.info('[cache]: Data came from cache');
                this.onSuccess(res);
                return ;
            }
            this.fetching = !(this.silent_fetch && this.data === null);
            return this.executeFetch(null)

        },
        async refresh(){
            this.DELETE_CACHE(this.$__cache_key);
            await  this.executeFetch(null)

        },
        async fetchSearchResult(){
            this.DELETE_CACHE(this.$__cache_key);
            await  this.executeFetch(null);
        },
        async set(values = null,func = null){
            if(this.loading)
                return;
            //    do fetching
            this.clearFormErrors();
            values  = values ? values : BuildForm(this.form);
            if(!func)
                this.Graph.func('set');
            else
                this.Graph.func(func);

            if (!this.$__cache_key){
            //    set to page 1
                this.Graph.page(1);
            //update cache key
                this.$__cache_key = this.Graph.getCacheHash();
            }

            this.loading = true;
            return await this.sendRequest('set',values,(res) => {
                this.loading = false;
            },(res) => {
                this.bindFormErrors(res.getData());
                this.onError(res);
            },(res) => {
                this.onAdded(res);
                this.DELETE_CACHE(this.$__cache_key)
            });
        },
        async update(values = null,func = null){
            if(this.loading)
                return;
            //    do fetching
            this.clearFormErrors();
            values  = values ? values : BuildForm(this.form);

            if(!func)
                this.Graph.func('update');
            else
                this.Graph.func(func);

            if (!this.$__cache_key){
                //    set to page 1
                this.Graph.page(1);
                //update cache key
                this.$__cache_key = this.Graph.getCacheHash();
            }
            this.loading = true;
            return await this.sendRequest('set',values,(res) => {
                this.loading = false;
            },(res) => {
                this.bindFormErrors(res.getData());
                this.onError(res);
            }, (res) => {
                this.onUpdated(res);
                this.DELETE_CACHE(this.$__cache_key)
            });
        },
        async _delete(func = null){
            if(this.loading)
                return;
            //    do fetching
            this.clearFormErrors();

            if(!func)
                this.Graph.func('delete');
            else
                this.Graph.func(func);

            if (!this.$__cache_key){
                //    set to page 1
                this.Graph.page(1);
                //update cache key
                this.$__cache_key = this.Graph.getCacheHash();
            }
            console.log(this.$__cache_key)


            this.loading = true;
            return await this.sendRequest('set',{},(res) => {
                this.loading = false;
            },(res) => {
                this.bindFormErrors(res.getData());
                this.onError(res);
            },(res) => {
                this.onDeleted(res);
                this.DELETE_CACHE(this.$__cache_key)
            });
        },

        bindFormErrors(error_fields){
            for (let field in error_fields){
                if(typeof this.form[field] !== 'undefined')
                    this.form[field].errors = error_fields[field];
                else
                    console.warn(`[form]: ${field} is not present in form object`)
            }
        },
        clearFormErrors(){
            this.$toast.clear();
            for(let field in this.form){
                this.form[field].errors = [];
            }
        },
        onUpdated(res){

        },
        onDeleted(res){

        },
        formToObj(formData = null) {
            let object = {};
            for (let key in formData || this.form){
                let value = this.form[key];
                object[key] = value.value;
            }
            return object
        },
        onAdded(res){

        },
        onError(res){
            this.$toast.error(res.getMsg());
        },
        onFetchError(res){

        },
        onSuccess(res){

        },
        ...mapMutations([
            'CACHE_RESPONSE',
            'DELETE_CACHE'
        ])

    },
    computed:{
        $_request_state(){
            return {
                loading: this.loading,
                fetching: this.fetching,
                is_empty: this.data === null || (this.data instanceof Array ? this.data.length < 1:!this.data),
                error: this.error,
                retryFunc: this.refresh
            }
        },
        ...mapGetters([
            'is_cached',
            'get_cached_response'
        ])
    },
    watch:{
        "search_query.value": debounce(function (){
            console.log('Searched: ' + this.search_query.value);
            this.fetchSearchResult();
        },500),
        "$__cache_key"(){
            this.refresh();
        }
    }
}
