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

   /* remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('.post.active');
   for (let activeArticle of activeArticles) {
     activeArticle.classList.remove('active');
   }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');


  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  /* remove contents of titleList */
  function clearMessages(){
    const titleList = document.querySelector(optTitleListSelector);
	   document.getElementById('messages').innerHTML = titleList;
     console.log(document.getElementById('messages'));
     console.log(titleList);
  }
  function generateTitleLinks(){
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll('.post');
    for(let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHtml = '<li><a href = "#"' + articleId + '><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
  }

  /* get the title from the title element */

  /* insert link into titleList */

}

generateTitleLinks();
 }

 const links = document.querySelectorAll('.titles a');
 for(let link of links){
   link.addEventListener('click', titleClickHandler);
 }
