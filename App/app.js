// Global Variables

const outputContainer = document.getElementById('output-container');
const body = document.getElementsByTagName('body');

// 

const getAddress = async (e) => {

    e.preventDefault();

    // Retrieve Value from input
    let address = addressInput.value;
    // Basic validation if input field is empty
    if(addressInput.value === "") {
        return alert('Please Enter a Address');
    } 



    // API key and Endpoint variables
    const apiKey = "Basic Y29kZS5sYWI5OEBnbWFpbC5jb206NzVjYzdjYjBlNGIwODcyMDI0MGQyNDJhNzRhMGRiMmNlZTllNWQwMQ==";
    const endPoint =`https://epc.opendatacommunities.org/api/v1/non-domestic/search?address=${address}`;

    // Try catch block to retrieve data from API
    
    try {
        
       const res = await fetch(endPoint, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: apiKey,

        }
       });

       const data = await res.json();
       const rows = data.rows;
    // Loop through rows array to select data 
       rows.forEach(row => {

    // Variables to display data on cards and specific ref number for selected button
        let address = row.address;
        let buildingRefNum = row['building-reference-number'];
        let propertyType = row['property-type'];

    // Cards HTML with assigened variables
        const cards = `  
        
        <div class="cards">
            <div class="card-address">
            <p class="card-title">Address:</p>
            <p class="card-content">${address}</p>
            </div>
            <div class="line"></div>

            <div class="card-property-type">
            <p class="card-title">Property Type:</p>
            <p class="card-content">${propertyType}</p>
            </div>

            <button id=${buildingRefNum} class="modalBtn">View Details</button>
      
            
        </div>`


        // Instert the Cards in the HTML (output-container) 
       outputContainer.innerHTML += cards;
       

    //   Modal for Extra Details of selected Address
       let modal = document.querySelectorAll('.modalBtn');

        modal.forEach((button) => {

         button.addEventListener('click', function() {

             let fetchDataId = data.rows;
             
             fetchDataId.forEach((addressRow) => {

                console.log(addressRow)

                // EPC Details variable 
                let lodgeDate = addressRow['lodgement-date'];
                let currentEngRating = addressRow['current-energy-rating'];
                let potentialEngRating = addressRow['potential-energy-rating'];
                let currentEngEfficiency = addressRow['current-energy-efficiency'];
                let potentialEngEfficiency = addressRow['potential-energy-efficiency'];
                let propertyTypeTwo = addressRow['property-type'];
                let constructionAgeBand = addressRow['construction-age-band'];
                let tenure = addressRow.tenure;

                // Location Variables
                let address = addressRow.address;
                let postTown = addressRow['post-town'];
                let postCodeInfo = addressRow.postcode;
                let county = addressRow.county;
                let localAuth = addressRow['local-authority'];
                let constituency = addressRow.constituency;

                // Other Variables
                let lmkKey = addressRow['lmk-key'];

                let buildRefNumTwo = addressRow['building-reference-number'];
                if(buildRefNumTwo === buildingRefNum) {
                    console.log(addressRow)
                    console.log('clicked')

                    const modal = `
                    
                    <div id="myModal" class="modal">
                      <div class="modal-content">
                        <span class="close">&times;</span>
                        </div>
                      </div>
                    </div>`;
                } 
             });

         })
       });
    });






    } catch (error) {
        console.log(error)
    }
    
};


// Get Postcode 

// Similar Process to getAddress Function



const getPostcode = async (e) => {

    e.preventDefault();

    let postcode = postcodeInput.value.trim().toUpperCase().replace(/\s/g, "");


    if(postcodeInput.value === "") {
        return alert('Please Enter A PostCode');
    } 

    const apiKey = "Basic Y29kZS5sYWI5OEBnbWFpbC5jb206NzVjYzdjYjBlNGIwODcyMDI0MGQyNDJhNzRhMGRiMmNlZTllNWQwMQ==";
    const endPoint =`https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}`;
    
    try {
        
       const res = await fetch(endPoint, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: apiKey,

        }
       });

       const data = await res.json();
       const rows = data.rows;
    //    Loop through rows array
    rows.forEach(row => {

        let address = row.address;
        let buildingRefNumPostCode = row['building-reference-number'];
        let propertyType = row['property-type'];

        const cards = `  
        
        <div class="cards">
            <div class="card-address">
            <p class="card-title">Address:</p>
            <p class="card-content">${address}</p>
            </div>
            <div class="line"></div>

            <div class="card-property-type">
            <p class="card-title">Property Type:</p>
            <p class="card-content">${propertyType}</p>
            </div>
            <button id=${buildingRefNumPostCode} class="modalBtnTwo">View Details</button>
        </div> 
        
        `

        outputContainer.innerHTML += cards;
        let modalTwo = document.querySelectorAll('.modalBtnTwo');
        modalTwo.forEach((buttonTwo) => {
            buttonTwo.addEventListener('click', function() {

                let fetchDataIdTwo = data.rows;

                fetchDataIdTwo.forEach((postcodeRow) => {
                    let buildRefNumThree = postcodeRow['building-reference-number'];
                    if(buildRefNumThree === buildingRefNumPostCode) {
                        console.log(postcodeRow)
                    }  else {
                        console.log('not matched')
                    }

                });
            });

        });

       });


    } catch (error) {
        console.log(error)
    }

};

// Search Address Btn
const submitAddressBtn = document.getElementById('address-search-btn').addEventListener('click', getAddress);
let addressInput = document.getElementById('input-address')

// Search Postcode Btn
const submitPostcodeBtn = document.getElementById('postcode-search-btn').addEventListener('click', getPostcode);
const postcodeInput = document.getElementById('input-postcode');

