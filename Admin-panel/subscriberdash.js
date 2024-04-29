document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector(".table tbody");
  
    const fetchSubs = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
          window.location.href = '../login.html';
        }
        const response = await fetch("https://my-brand-saddock-backend.onrender.com/api/subscribers/viewSubscribers", {
          headers:{
            'Authorization': `Bearer ${token}`
          },
            method: 'GET',
        });
        const responseData = await response.json();
    
        console.log("Data from backend:", responseData);

        const subs = responseData.data;
        
        tableBody.innerHTML = "";

        let count = 1;
  
        subs.forEach((sub) => {
          const row = `
            <tr>
              <td>${count}</td>
              <td>${sub.email}</td>
              <td>
                <button class="button-trash" id="deleteSubscriber" data-id="${sub._id}"><i class="fa fa-solid fa-trash"></i></button>
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
    fetchSubs();



    const deleteSubscriber = async (event) => {
      try {
          const subscriberId = event.target.dataset.id;
          const token = localStorage.getItem('token')
          if(!token){
            window.location.href = '../login.html';
          }
          const confirmDelete = window.confirm("Are you sure you want to delete this subscriber?");
  
          if (confirmDelete) {
              const response = await fetch(`https://my-brand-saddock-backend.onrender.com/api/subscribers/deleteSubscriber/${subscriberId}`, {
                headers:{
                  'Authorization': `Bearer ${token}`
                },
                  method: "DELETE",
              });
  
              if (response.ok) {
                  event.target.closest("tr").remove();
                  console.log("subscriber deleted successfully");
              } else {
                  console.error("Error deleting subscriber:", response.statusText);
              }
          }
      } catch (error) {
          console.error("Error deleting subscriber:", error);
      }
  };

  document.addEventListener("click", (e) => {
    // e.preventDefault();
    
    if (e.target && e.target.id === "deleteSubscriber") {
      deleteSubscriber(e);
    }     
  });

});