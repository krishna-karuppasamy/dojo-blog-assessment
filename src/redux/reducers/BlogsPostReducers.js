export function BlogsPostReducers(state = { data: [] }, action) {
 // console.log(action.type + " state " + state.data);
  switch (action.type) {
    case "create_blog": {
      let a = [...state.data];
      
      console.log('maxa ' + Math.max(...a.map((num)=>Number(num.id))));
        

      let tempBlog = {
        id: Math.max(...a.map((num)=>Number(num.id)))+1,
        username: "Krishna",
        content: action.data,
        image: "https://via.placeholder.com/600/1ee8a4",
        likes: 0,
        mail: "",
        comments: [
          {
            name: "",
            comment: "",
          },
          {
            name: "",
            comment: "",
          },
        ],
      };
      a.push(tempBlog);
      
      
      a.sort((a,b)=> b.id-a.id);

      //console.log('create_blog: ' + JSON.stringify(a));
      return { data: a };
    }
    case "load_blog": {
        //console.log('load resource: ' + action.data);
        let latest = [...action.data];
        latest.sort((a,b)=>{
        //  console.log('sort: ' + JSON.stringify(a));
          return b.id-a.id;
        });
        //a.push(action.data);
        //console.log('load resource sort: ' + JSON.stringify(a));
        return { data: latest };
      }
      case "update_comment": {
        
        console.log('update comment : '+action.data[0]+ " " + action.data[1]);
        let a = [...state.data].map((dataa)=>{
          // console.log(dataa.id+' ' + action.data);
           if(dataa.id==action.data[0]){
             let temp=dataa.comments;
             let comments = {
                "name":"you",
                "comment":action.data[1] 
             };
             dataa.comments.push(comments);
             return dataa;
           }else{
             return dataa;
           }

         });

         //console.log('Final data ' + JSON.stringify(a));

        return { data: a };
      }



      case "update_blog": {
        //let a = [...state.data];
        let a = [...state.data].map((dataa)=>{
         // console.log(dataa.id+' ' + action.data);
          if(dataa.id==action.data){
            let temp=dataa;
            temp.likes=temp.likes+1;
            return temp;
          }else{
            return dataa;
          }
        });
        

        //console.log('update blog: ' + JSON.stringify(a));
        
        return { data: a };
      }
    default: {
      return { data: state.data };
    }
  }
}

export default BlogsPostReducers;
