
const addBlog = document.getElementById('addBlog');


function showAdd() {
    addBlog.style.display = 'block';
}

function cancelAdd() {
    addBlog.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.querySelector(".blog1");

    const fetchBlogs = async () => {
        try {
            const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/blogs/viewBlogs", {
                method: 'GET',
            });
            const responseData = await response.json();

            console.log("Data from backend:", responseData);
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
                    <button class="button-trash delete-blog" data-id="${blog._id}"><i class="fa fa-solid fa-trash"></i></button>
                `;

                blogContainer.appendChild(blogElement);
            });
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    fetchBlogs();

    const deleteBlog = async (event) => {
        try {
            const blogId = event.target.dataset.id;

            const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

            if (confirmDelete) {
                const response = await fetch(`https://my-brand-saddock-backend.onrender.com/api/blogs/deleteBlog/${blogId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    event.target.closest(".blog1").remove();
                    console.log("Blog deleted successfully");
                } else {
                    console.error("Error deleting blog:", response.statusText);
                }
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    // Function to handle adding a new blog
const addNewBlog = async (event) => {
    event.preventDefault();

    const form = document.getElementById('addblogform');
    // const validateForm = () => {
    //     const title = form.title.value.trim();
    //     const description = form.description.value.trim()
    //     const content = form.content.value.trim();
    //     const image = form.image.files[0]; // Get the selected image file

    //     if (!title || !description || !content || !image) {
    //         window.alert("Please fill in all fields and select an image.");
    //         return false; // Prevent form submission
    //     }

    //     return true; // Allow form submission
    // };

    const formData = new FormData(form)

    console.log(formData);

    try {
        const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/blogs/createBlogs", {
            method: 'POST',

            body: formData
        });

        if (response.ok) {
            const newBlog = await response.json();
            console.log("New blog added:", newBlog);
            cancelAdd();
            window.location.reload();
        } else {
            console.error("Error adding blog:", response.statusText);
        }
        console.log(response)
    } catch (error) {
        console.error("Error adding blog:", error);
    }

};


document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-blog")) {
            deleteBlog(e);
    }

    if (e.target && e.target.id === "add") {
            addNewBlog(e);
    }

    });
});
