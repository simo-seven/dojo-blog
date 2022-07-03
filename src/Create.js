import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    //we're creating some states to track the input values
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const[isLoading, setIsLoading] = useState(false);
    const history = useHistory(); //evoquing the useHistory hook

    const handleSubmit = (e) => {
        //setting a default action when the form is beeing submitted. In this case we'll prevent the page to refresh
        e.preventDefault();
        const blog = { title, body, author };

        setIsLoading(true);

        //creating the post request to our endpoint (in this case %PUBLIC_URL% ecc)
        fetch('%PUBLIC_URL%:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" }, //telling the json server the type of content we're sending
            body: JSON.stringify(blog) //transforming the object into a json string
        }).then(() => {
            console.log('new blog added');
            setIsLoading(false);
            //history.go(-1); once we've added the blog, we go back one step in the history
            history.push('/'); //redirecting to the homepage
        })
    }


    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value = {title} /*we're associating the input value with the variable defined upwards */
                onChange={(e) => setTitle(e.target.value)} /*updating the state of the title even if it has a default value (in our case it's just an empty string*/
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isLoading && <button>Add Blog</button>}
                {isLoading && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;