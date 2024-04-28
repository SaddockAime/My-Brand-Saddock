
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
            const response = await fetch("http://localhost:7070/api/blogs/viewBlogs", {
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
                    <button class="button-edit" id="editBlog" data-id="${blog._id}"><i class="fa fa-solid fa-pencil"></i></button>
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
                const response = await fetch(`http://localhost:7070/api/blogs/deleteBlog/${blogId}`, {
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

    const formData = new FormData(form)

    console.log(formData);

    try {
        const response = await fetch("http://localhost:7070/api/blogs/createBlogs", {
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


//*******************update blog**************************************
const editBlog = async (event) => {
    try {
        const blogId = event.target.dataset.id;
        console.log('Blog ID:', blogId);

        // Create a form for editing the blog post
        const editFormContainer = document.createElement("div");
        editFormContainer.style.position = "fixed";
        editFormContainer.style.display = "flex";
        editFormContainer.style.top = "50%";
        editFormContainer.style.left = "50%";
        editFormContainer.style.transform = "translate(-50%, -50%)";
        editFormContainer.style.backgroundColor = "#000000";
        editFormContainer.style.color = "#FFFFFF";
        editFormContainer.style.padding = "1rem";
        editFormContainer.style.border = "1px solid black";
        editFormContainer.style.zIndex = 1000;
        editFormContainer.style.width = "800px";
        editFormContainer.style.padding = "10px"; 
        editFormContainer.style.borderRadius = "10px";
        editFormContainer.style.marginLeft = "60px";

        // Create form elements
        const form = document.createElement("form");
        form.id = "editBlogForm";

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Edit Title:";
        const titleInput = document.createElement("input");
        titleInput.style.width = "285%";
        titleInput.style.height = "20px";
        titleInput.type = "text";
        titleInput.id = "editTitle";
        titleInput.name = "editTitle";
        titleInput.required = true;

        const descLabel = document.createElement("label");
        descLabel.textContent = "Edit Description:";
        const descInput = document.createElement("textarea");
        descInput.style.width = "285%";
        descInput.style.height = "70px";
        descInput.id = "editDescription";
        descInput.name = "editDescription";
        descInput.required = true;

        const contentLabel = document.createElement("label");
        contentLabel.textContent = "Edit Content:";
        const contentInput = document.createElement("textarea");
        contentInput.style.width = "285%";
        contentInput.style.height = "250px";
        contentInput.id = "editContent";
        contentInput.name = "editContent";
        contentInput.required = true;

        const imageLabel = document.createElement("label");
        imageLabel.textContent = "Edit Image:";
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.id = "editImage";
        imageInput.name = "editImage";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Save";

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.style.marginLeft = "0.5rem";

        // Add form elements to form
        form.appendChild(titleLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(titleInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(descLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(descInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(contentLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(contentInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(imageLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(imageInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(submitButton);
        form.appendChild(cancelButton);

        // Add form to the container
        editFormContainer.appendChild(form);

        // Add the form container to the body
        document.body.appendChild(editFormContainer);

        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();

            const editTitleInput = document.getElementById('editTitle');
            const editTitle = editTitleInput.value.trim();
            const editDescInput = document.getElementById('editDescription');
            const editDesc = editDescInput.value.trim();
            const editContentInput = document.getElementById('editContent');
            const editContent = editContentInput.value.trim();
            const editImageInput = document.getElementById('editImage').files[0];
            
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('description', editDesc);
            formData.append('content', editContent);
            formData.append('image', editImageInput);

            const response = await fetch(`http://localhost:7070/api/blogs/updateBlog/${blogId}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                console.log("Blog post edited successfully");
                editFormContainer.remove();
                window.location.reload();
            } else {
                console.error("Error editing blog post:", response.statusText);
            }
        });

        cancelButton.addEventListener("click", () => {
            editFormContainer.remove();
        });

    } catch (error) {
        console.error("Error editing blog post:", error);
    }
};



document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-blog")) {
            deleteBlog(e);
    }

    if (e.target && e.target.id === "add") {
            addNewBlog(e);
    }

    if (e.target && e.target.id === "editBlog") {
        editBlog(e);
}

    });
});
