// category

const loadCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data))
    .catch((error) => console.log(error));
};

const displayCategory = (category) => {
  const menuContent = document.getElementById("menu-content");
 
  category.news_category.forEach((content) => {
    const contentLi = document.createElement("li");
    contentLi.classList.add("m-4");

    contentLi.innerHTML = `
   
   <a onclick= "loadArticle(${content.category_id})">${content.category_name}</a>
    `;

    menuContent.appendChild(contentLi);
  });

};

const loadArticle = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayArticle(data.data))
    .catch((error) => console.log(error));
};

// loading spinner
const loadSpinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
      spinner.classList.remove("hidden");
    } else {
      spinner.classList.add("hidden");
    }
  };

const displayArticle = (news) => {
  const newsContainer = document.getElementById("news-container");

  newsContainer.textContent = "";

  // load Spinner
    loadSpinner(true);
  

  // search result
  const id = document.getElementById("number");
  const noResult = document.getElementById("no-result-found");


  if (news.length) {
    noResult.classList.remove("hidden");
    id.innerText = parseInt(news.length);
  } else {
    id.innerText = "No";
    noResult.classList.remove("hidden");
  }

  news.forEach((content) => {
    const { author, thumbnail_url, title, details, total_view, _id } = content;
    const { name, published_date, img } = author;

    const div = document.createElement("div");
    div.classList.add(
      "card",
      "lg:flex",
      "grid",
      "grid-cols-1",
      "lg:card-side",
      "bg-base-100",
      "shadow-xl",
      "mb-4"
    );

    div.innerHTML = `
    <figure>
        <img src="${thumbnail_url}" class="" alt="Album">
    </figure>
    <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${
              details.length > 20 ? details.slice(0, 20) + "..." : details
            }</p>
        <div class="card-actions justify-between">
            <section class= "flex gap-5" >
            <figure>
                <img src="${img}" class="w-10 rounded-full" alt="" />
            </figure>
            <div>
                <p>${name === null
                    ? "No Data Found"
                    : name === "system"
                    ? "No Data Found"
                    : name}</p>
                <p>${published_date === null
                    ? "No Data Found"
                    : published_date === "system"
                    ? "No Data Found"
                    : published_date}</p>
            </div>
            </section>
            <div>
                <p><span><i class="fa-regular fa-eye"></i></span> ${total_view == null
                    ? "No Data Found"
                    : total_view === "system"
                    ? "No Data Found"
                    : total_view}</p>
            </div>
            <label onclick="newsDetails('${_id}')" for="my-modal-3" class="btn modal-button">Show Details</label>
        </div>
    </div>
    
    `;
    newsContainer.appendChild(div);
  });

 // stop spinner
loadSpinner(false);
  
};



// Modal

const newsDetails = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (newsDetails) => {
  const { author, details, image_url, title, total_view } = newsDetails;

  const { name, img, published_date } = author;

  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = ` 
<figure><img src="${image_url}" alt="Shoes" class= 'p-4'  /></figure>
<section class= "flex gap-5 mb-5" >
            <figure>
                <img src="${img}" class="w-10 rounded-full" alt="" />
            </figure>
            <div>
                <p>${
                  name === null
                    ? "No Data Found"
                    : name === "system"
                    ? "No Data Found"
                    : name
                }</p>
                <p>${
                  published_date === null
                    ? "No Data Found"
                    : published_date === "system"
                    ? "No Data Found"
                    : published_date
                }</p>
            </div>
            <div>
            <p><span><i class="fa-regular fa-eye"></i></span> ${
              total_view == null
                ? "No Data Found"
                : total_view === "system"
                ? "No Data Found"
                : total_view
            }</p>
        </div>
</section>
           
<h2 class="card-title">${title}</h2>
<p>${details}</p>


`;

};


loadCategory();
loadArticle(01);

