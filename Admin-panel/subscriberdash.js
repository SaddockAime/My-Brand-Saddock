document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector(".table tbody");
  
    const fetchSubs = async () => {
      try {
        const response = await fetch("http://localhost:7070/api/subscribers/viewSubscribers", {
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
                <button class="button-trash" id="deleteUser" data-id="${sub._id}"><i class="fa fa-solid fa-trash"></i></button>
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
});