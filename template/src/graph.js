import Graph from "@__path/graph";

const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
import {PROJECT} from "../path/project.pconf"

Graph.setRequestConfig({
    headers:{
        Authorization: `Bearer ${AUTH_TOKEN}`
    },
    withCredentials: true,
    baseURL: PROJECT.server
});

export default Graph
