const loadNews = async()=>{
    const url = `https://openapi.programming-hero.com/api/news/category/01
    `
    const res = await fetch(url);
    const data =await res.json();

    displayNews(data.data);
}




const displayNews = news =>{
// console.log(news);
const newsContainer = document.getElementById('news-container');

news.forEach(content => {
    console.log(content);
  
    const div = document.createElement('div');
    div.classList.add("card", "grid", "grid-cols-1", "lg:card-side", "bg-base-100", "shadow-xl", "mb-4", "p-2")

    div.innerHTML=`
    <figure><img src="${content.image_url}" class="w-1/2" alt="Album">
    </figure>
    <div class="card-body">
      <h2 class="card-title">${content.title}</h2>
      <p>${content.details}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Show More</button>
      </div>
    </div>
    
    `
    newsContainer.appendChild(div)

});

}




loadNews()