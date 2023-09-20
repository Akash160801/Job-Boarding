// Function to fetch and populate job listings from data.json
function fetchAndPopulateJobListings() {
  const jobListingsSection = document.getElementById('job-listings')

  // Fetch data from data.json
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      // Store the original data for filtering
      const originalData = data

      // Function to filter job listings based on keywords and location
      function filterJobListings() {
        const keywordInput = document
          .getElementById('keyword-input')
          .value.toLowerCase()
        const locationInput = document
          .getElementById('location-input')
          .value.toLowerCase()

        const filteredData = originalData.filter((job) => {
          const jobTitle = job.jobTitle.toLowerCase()
          const location = job.location.toLowerCase()

          // Check if the job title or location contains the keyword
          return (
            jobTitle.includes(keywordInput) && location.includes(locationInput)
          )
        })

        // Clear existing job listings
        jobListingsSection.innerHTML = ''

        // Populate job listings with the filtered data
        filteredData.forEach((job) => {
          const jobListing = document.createElement('div')
          jobListing.classList.add('job-listing')

          // Populate job listing content
          jobListing.innerHTML = `
                        <h3>${job.jobTitle}</h3>
                        <p>${job.companyName}</p>
                        <p>${job.location}</p>
                        <p>Programming Languages: ${job.languages.join(
                          ', '
                        )}</p>
                        <p>Posted Date: ${job.postedDate}</p>
                        <a href="${
                          job.applyLink
                        }" target="_blank" class="apply-button">Apply Now</a>
                    `

          // Append the job listing element to the job listings section
          jobListingsSection.appendChild(jobListing)
        })
      }

      // Call the filter function when the user inputs change
      document
        .getElementById('keyword-input')
        .addEventListener('input', filterJobListings)
      document
        .getElementById('location-input')
        .addEventListener('input', filterJobListings)

      // Initialize job listings with the original data
      filterJobListings()
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

// Call the function to fetch and populate job listings when the page loads
window.addEventListener('load', fetchAndPopulateJobListings)
