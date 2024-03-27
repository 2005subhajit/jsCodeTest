
const SELECTED_PAGE = 'landing';

/**
 * Returns JSON data from file
 * @param {string} url  Path of JSON file
 * @returns JSON data 
 */
async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      return null;
    }
  }




/**
 * To call first API and check with SELECTED_PAGE constant
 */
const callCollectionTypeApi = () => {
    
    fetchJSON('api/collectiontype.json')
    .then(data => {


        const selectData = data;
        selectData.forEach(newsBtn => {

            if(newsBtn.collectiontype == SELECTED_PAGE) {
                selectPage(newsBtn.collectionid);
            }

            
        });



    })
    .catch(error => {
        console.error(error); // This will log any errors that occur during the fetch
    });
};

/**
 * Show JSON data related content
 * @param {number} pageId Collection id from selected collection type
 */
const selectPage = (pageId) => {
    appFolder = pageId;
    fetchJSON('api/collection/'+appFolder+'/collection.json')
    .then(data => {
        console.log(data); // This will log the fetched JSON data to the console
        newsData = data;

        const newsGrid = document.getElementById("newsGrid");
        const firstGrid = document.getElementById("newsFirtsCol");
        const secondGrid = document.getElementById("newsSecondCol");

        firstGrid.innerHTML = '';
        secondGrid.innerHTML = '';

        // Loop through JSON data and create news items
        let i=1;
        let img;
        let title;
        let intro;
        newsData.forEach(news => {
            
            const newsItem = document.createElement("div");
            // newsItem.classList.add('w-100'); 
            newsItem.classList.add('p-3');
            newsItem.classList.add('clearfix');
            newsItem.classList.add('border-bottom');
            

            let timeAgo = news.published+"m";
            if(news.published>59) {
                timeAgo = Math.round(news.published/60)+"h";
            }
            
            
            if(i<=1) {
                img = `<img src="${news.imageUrl}" class="img-fluid " />`;
                title = `<h2>${news.title.toUpperCase()}</h2>`;
                intro = `<p>${news.intro}</p> <div class="clearfix"></div> <i class="fa-regular fa-clock"></i> `+timeAgo;

                intro = intro + ` <i class="fa-regular fa-comment"></i> `+news.commentCount;

            } else if(i==2) {
                img = `<img src="${news.imageUrl}" class="w-100" />`;
                title = `<h3>${news.title}</h2>`;
                intro = `<p>${news.intro}</p>  <div class="clearfix"></div><i class="fa-regular fa-clock"></i>`+timeAgo;
                intro = intro + ` <i class="fa-regular fa-comment"></i> `+news.commentCount;
            } else {
                img = `<img src="${news.imageUrl}" class="col-md-3 float-end" />`;
                title = `<h4>${news.title}</h2>`;
                intro = `<div class="clearfix"></div> <i class="fa-regular fa-clock"></i> `+timeAgo;
                    intro = intro + ` <i class="fa-regular fa-comment"></i> `+news.commentCount;
            }
            
            newsItem.innerHTML = img+title+intro;

            if(i<=4) {
                if(i<=1) {
                    firstGrid.appendChild(newsItem);
                } else {
                    secondGrid.appendChild(newsItem);
                }
            }
            i = i+1;
        });

    })
    .catch(error => {
        console.error(error); // This will log any errors that occur during the fetch
    });




       
}
  




window.onload = callCollectionTypeApi;