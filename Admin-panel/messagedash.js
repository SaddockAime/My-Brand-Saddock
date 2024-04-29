
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector(".table tbody");
  
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
          window.location.href = '../login.html';
        }
        const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/messages/viewMessages", {
          headers:{
            'Authorization': `Bearer ${token}`
          },
            method: 'GET',
        });
        const responseData = await response.json();
    
        console.log("Data from backend:", responseData);

        const messages = responseData.data;
        
        tableBody.innerHTML = "";
        let count = 1;

        messages.forEach((sender) => {
          const row = `
            <tr>
              <td>${count}</td>
              <td>${sender.name}</td>
              <td>${sender.email}</td>
              <td>${sender.message}</td>
              <td>
                <button class="button-trash" id="deleteMessage" data-id="${sender._id}"><i class="fa fa-solid fa-trash"></i></button>
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
    fetchMessages();


  // Function to handle delete message
  const deleteMessage = async (event) => {
    try {
        const messageId = event.target.dataset.id;
        const token = localStorage.getItem('token')
        if(!token){
          window.location.href = '../login.html';
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");

        if (confirmDelete) {
            const response = await fetch(`https://my-brand-saddock-backend.onrender.com/api/messages/deleteMessage/${messageId}`, {
              headers:{
                'Authorization': `Bearer ${token}`
              },
                method: "DELETE",
            });

            if (response.ok) {
                event.target.closest("tr").remove();
                console.log("Message deleted successfully");
            } else {
                console.error("Error deleting message:", response.statusText);
            }
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
  
  document.addEventListener("click", (e) => {
    // e.preventDefault();
    
    if (e.target && e.target.id === "deleteMessage") {
      deleteMessage(e);
    }     
  });
});
  