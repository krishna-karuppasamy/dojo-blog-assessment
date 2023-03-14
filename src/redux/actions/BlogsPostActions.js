export function blogsPostActionGenerator(action, dataa){
    switch(action){
        case 'create_blog':{
            return {type:'create_blog', data: dataa};
        }
        case 'load_resource':{
            return {type:'load_blog', data: dataa};
        }
        case 'update_blog':{
            return {type:'update_blog', data: dataa};
        }
        case 'update_comment':{
            return {type:'update_comment', data: dataa};
        }
        default:{
            return {type:'default', data: action};
        }
    }
   

}

export default blogsPostActionGenerator;