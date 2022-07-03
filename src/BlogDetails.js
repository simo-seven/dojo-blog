import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {
    //this allow us to grab parameters from the route
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('https://thedojoblog.netlify.app/:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('https://thedojoblog.netlify.app/:8000/blogs/' + blog.id, {
            method: 'DELETE' //sending the delete request
        }).then(() => {
            history.push('/'); //redirecting the user to the homepage after the blog has been deleted
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;