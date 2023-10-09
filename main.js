
        function fetchArtworkDetails() {
            const selectedArtworkId = document.getElementById('artwork-select').value;
            
            const apiUrl = `https://api.artic.edu/api/v1/artworks/${selectedArtworkId}?fields=id,title,image_id`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                   
                    const artworkDetails = document.getElementById('artwork-details');
                    artworkDetails.innerHTML = ''; // Clear previous results

                    const artwork = data.data;

                    const title = document.createElement('h2');
                    title.textContent = artwork.title;

                    const image = document.createElement('img');

                    const iiifUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
                    image.setAttribute('src', iiifUrl);
                    image.setAttribute('alt', artwork.title);

                    artworkDetails.appendChild(title);
                    artworkDetails.appendChild(image);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }


        function fetchAllArtworksList() {

            const apiUrl = 'https://api.artic.edu/api/v1/artworks?fields=id,title';


            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const artworksSelect = document.getElementById('artwork-select');

                    data.data.forEach(artwork => {
                        const option = document.createElement('option');
                        option.value = artwork.id;
                        option.textContent = artwork.title;
                        artworksSelect.appendChild(option);
                    });

                    fetchAdditionalArtworkImages();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }


        function fetchAdditionalArtworkImages() {
  


            const artworksSelect = document.getElementById('artwork-select');

  
            imageIdentifiers.forEach(imageId => {
                const option = document.createElement('option');
                option.value = imageId;
                option.textContent = `Image ${imageId}`;
                artworksSelect.appendChild(option);
            });
        }

        window.addEventListener('load', () => {
            fetchAllArtworksList();
        });