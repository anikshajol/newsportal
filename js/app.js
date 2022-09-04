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
    
    const {author, thumbnail_url,title,details,image_url,total_view}= content
  const {name,published_date,img} = author

    const div = document.createElement('div');
    div.classList.add("card", "lg:flex", "grid", "grid-cols-1", "lg:card-side", "bg-base-100", "shadow-xl", "mb-4",)


    div.innerHTML=`
    <figure><img src="${thumbnail_url}" class="" alt="Album">
    </figure>
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <p>${details.length>20?details.slice(0,20)+'...':details}</p>
      <div class="card-actions justify-between">
    <section class= "flex gap-5" >
    <figure>
    <img src="${img}" class="w-10 rounded-full" alt="" />
  </figure>
<div>
<p>${name}</p>
<p>${published_date}</p>
</div>
    </section>
    <div>
    <p>${total_view}</p>
  </div>

        <button class="btn btn-primary">Show More</button>
      </div>
    </div>
    
    `
    newsContainer.appendChild(div)

});

}


loadCategory()