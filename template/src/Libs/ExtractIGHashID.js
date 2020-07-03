export default function (link) {
    let regex = /\/p\/([^\s\/]+)\/?/;
    let test = link.match(regex);
    if(!test){
        throw new Error('Invalid instagram URL')
        return  false;
    }else{
        return test[1];
    }
}
