export default function(fields){
    let form = {};
    for(let field in fields){
        if(typeof fields[field].value !== 'undefined'){
            let  value = fields[field].value;
            if(value === null)
                continue;
            value = value === false ? 0:(value === true) ? 1:value;
            form[field] = value;
        }
    }
    return form;
}
