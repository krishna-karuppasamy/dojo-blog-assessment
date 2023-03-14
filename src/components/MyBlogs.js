import { useSelector } from "react-redux";

export function MyBlogs(){

    const data = useSelector(s=>s.blogPost);

    console.log(data);

    return(

        <div>jsjsjs {JSON.stringify(data)}</div>

    );
}