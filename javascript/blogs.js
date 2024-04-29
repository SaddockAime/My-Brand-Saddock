//sideMenu
const sideMenu = document.getElementById("sidemenu");
function openmenu(){
    sideMenu.style.right = "0";
    }
function closemenu(){
    sideMenu.style.right = "-200px";
}


document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.querySelector(".blog1");
    const loading = document.getElementById("loading");
    loading.style.display = "block"; // Display loading style


    const fetchBlogs = async () => {
        try {
            const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/blogs/viewBlogs", {
                method: 'GET',
            });
            const responseData = await response.json();

            //console.log("Data from backend:", responseData);
            blogContainer.innerHTML = "";
            const blogs = responseData.data;

            blogs.forEach((blog) => {
                const blogElement = document.createElement("div");
                blogElement.classList.add("blog1");

                blogElement.innerHTML = `
                    <img class="blogimage" src="${blog.image.url}" alt="">
                    <p class="blogTitle">${blog.title}</p>
                    <p class="blogDescription">${blog.description}</p>
                    <p class="blogcont">${blog.content}</p>
                    <p class="blogdate">Published ${new Date(blog.date).toDateString()}</p>
                    <button class="button-blog" id="viewBlog" onclick="navigatToOneBlogPage('${blog._id}')"><i class="fa fa-solid fa-eye"></i></button>
                `;
                blogElement.addEventListener('click', () => {
                    //console.log('blog-clidke');
                    //console.log(blog._id)
                    const blog1 = blog._id;
                    window.location.href = `oneBlog.html?id=${blog1}`;
                })
                
                blogContainer.appendChild(blogElement);
            });
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            loading.style.display = "none"; // Hide loading style after fetching data
        }
    };

    fetchBlogs();
    
});


const navigatToOneBlogPage = (_id) => {
    window.location.href = `oneBlog.html?${_id}`;
};