const sideMenu = document.getElementById("sidemenu");
function openmenu(){
    sideMenu.style.right = "0";
    }
function closemenu(){
    ideMenu.style.right = "-200px";
}

document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.querySelector(".blog1");
    const fetchBlog = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id){
        console.error('No ID found in the URL parameters');
        return;
    }
    console.log(id)
        
        try {
            const response = await fetch(`https://my-brand-saddock-backend.onrender.com/api/blogs/viewBlogById/${id}`, {
                method: 'GET',
            });
            const responseData = await response.json();

            console.log("Data from backend:", responseData);
            blogContainer.innerHTML = "";
            const blog = responseData.data;

          
                const blogElement = document.createElement("div");
                blogElement.classList.add("blog1");

                blogElement.innerHTML = `
                    <img class="blogimage" src="${blog.image.url}" alt="">
                    <p class="blogTitle">${blog.title}</p>
                    <p class="blogDescription">${blog.description}</p>
                    <p class="blogcont">${blog.content}</p>
                    <p class="blogdate">Published ${new Date(blog.date).toDateString()}</p>
                `;

                blogContainer.appendChild(blogElement);
       
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    fetchBlog();
    
});