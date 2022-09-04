const loadCategory = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategory(data.data))
    .catch(error => console.log(error))
}



const displayCategory = (category)=>{
const menuContent = document.getElementById('menu-content')

// console.log(category);

category.news_category.forEach(content => {
    // console.log(content.category_id);
    const contentLi = document.createElement('li');
contentLi.classList.add('m-4')

    contentLi.innerHTML = `
   
   <a onclick= "loadArticle(${content.category_id})">${content.category_name}</a>
    `

    menuContent.appendChild(contentLi)

});


}

const loadArticle=(id)=>{
    // https://openapi.programming-hero.com/api/news/category/{category_id}

    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    // console.log('load',id);
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayArticle(data.data))
   
}

const displayArticle=(news)=>{
    const newsContainer = document.getElementById('news-container');

    newsContainer.textContent = ''

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


loadCategory()