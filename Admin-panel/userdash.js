
 document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector(".table tbody");
  
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
          window.location.href = '../login.html';
        }
        const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/users/viewusers", {
          headers:{
            'Authorization': `Bearer ${token}`
          },
            method: 'GET',
        });
        const responseData = await response.json();
    
        console.log("Data from backend:", responseData);

        const users = responseData.data;
        
        tableBody.innerHTML = "";

        let count = 1;
  
        users.forEach((user) => {
          const row = `
            <tr>
              <td>${count}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>
                <button class="button-trash" id="deleteUser" data-id="${user._id}"><i class="fa fa-solid fa-trash"></i></button>
              </td>
            </tr>
          `;
          tableBody.innerHTML += row;
          count++;
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();


  // Function to handle delete user
  const deleteUser = async (event) => {
    try {
        const userId = event.target.dataset.id;
        const token = localStorage.getItem('token')
        if(!token){
          window.location.href = '../login.html';
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            const response = await fetch(`https://my-brand-saddock-backend.onrender.com/api/users/deleteUser/${userId}`, {
              headers:{
                'Authorization': `Bearer ${token}`
              },
                method: "DELETE",

            });

            if (response.ok) {
                event.target.closest("tr").remove();
                console.log("User deleted successfully");
            } else {
                console.error("Error deleting user:", response.statusText);
            }
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
  
  document.addEventListener("click", (e) => {
    // e.preventDefault();
    
    if (e.target && e.target.id === "deleteUser") {
      deleteUser(e);
    }     
  });
});
  