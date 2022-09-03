const loadCategory = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategory(data.data))
    .catch(error => console.log(error))
}


const displayCategory = (category)=>{
const menuContent = document.getElementById('menu-content')

console.log(category);





category.news_category.forEach(content => {
    const contentLi = document.createElement('li');
contentLi.classList.add('m-4')

    contentLi.innerHTML = `
   
   <a>${content.category_name}</a>
    `

    menuContent.appendChild(contentLi)

});


}


loadCategory()