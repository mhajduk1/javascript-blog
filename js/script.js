'use strict'
 const titleClickHandler = function(event){
   const clickedElement = this;
   event.preventDefault();
   /* remove class 'active' from all article links  */
   const activeLinks = document.querySelectorAll('.titles a.active');
   for(let activeLink of activeLinks){
     activeLink.classList.remove('active');
   }
   /* add class 'active' to the clicked link */
   clickedElement.classList.add('active');
     console.log('clickedElement:', clickedElement);
     console.log("clickedElement:", this);
   /* remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('.post.active');
   for (let activeArticle of activeArticles) {
         activeArticle.classList.remove('active');
       }
   /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
   /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  targetArticle.classList.add('active');
   /* add class 'active' to the correct article */
 }
 const links = document.querySelectorAll('.titles a');
 for(let link of links){
   link.addEventListener('click', titleClickHandler);
 }
