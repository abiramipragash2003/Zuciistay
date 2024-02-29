// Function to decode the JWT token and extract the username
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub;
}

// Function to fetch bookings for a specific user
async function fetchBookingsForUser(token) {
    const username = decodeToken(token);
    const apiUrl = `http://localhost:9090/booking/${username}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        
        const bookings = await response.json();
        return bookings;
    } catch (error) {
        console.error(error);
    }
}

// Usage example
const token = localStorage.getItem('token'); // Retrieve token from localStorage
if (token) {
    fetchBookingsForUser(token)
        .then(bookings => {
            // Handle the fetched bookings data
            console.log('Bookings:', bookings);
            if(typeof bookings === "object")
            {
                bookings.forEach(element => {
                    const div=document.createElement("div");
                    div.className="card bg-gray-100 p-6 rounded-lg";
                    const  h2=document.createElement("h2");
                    h2.className="text-xl font-semibold mb-4";
                    const  h3=document.createElement("h3");
                    h3.className="text-xl font-semibold mb-4";
                    const para3=document.createElement("p");
                    para3.className="text-gray-600";
                    const para=document.createElement("p");
                    para.className="text-gray-600";
                    const para1=document.createElement("p");
                    para1.className="text-gray-600";
                    const para2=document.createElement("p");
                    para2.className="text-gray-600";
    
                    h2.innerText= element.place;
                    h3.innerText= "BookingId:"+ element.bookingId;
                    para3.innerText="Hotel Name:"+element.hotelName;
                    para.innerHTML="Check-in  :"+element.fromDate;
                    para1.innerHTML="Check-out :"+element.toDate;
                    para2.innerText="Room Type :"+element.roomType;
    
                    div.appendChild(h2);
                    div.appendChild(h3);
                    div.appendChild(para3);
                    div.appendChild(para);
                    div.appendChild(para1);
                    div.appendChild(para2);
    
                    const parentDiv=document.getElementById("show-booking");
                    parentDiv.appendChild(div);
                    
                    
                });
            }
            else{
                const para=document.createElement("p");
                para.innerHTML=bookings;
            }
            
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
} else {
    console.error('Token not found in localStorage');
}

