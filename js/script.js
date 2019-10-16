'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector ='.post-tags .list',
  optArticleAuthorsSelector ='.post-authors';

const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();

  //this.event.preventDefault();

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
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

  /* get the title from the title element */

  /* insert link into titleList */

}

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* create HTML of the link */
    html = html + linkHTML;
  }

  /* insert link into titleList */
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();
function generateTags(){
  /* find all articles */
  const articles =  document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* make html variable with empty string */
    let html = '';

    /* find tags wrapper */
    const wrapperTag = article.querySelector (optArticleTagsSelector);

    

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split('');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {

      /* generate HTML of the link */
      const   linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHtml;

      /* insert HTML of all the links into the tags wrapper */
      wrapperTag.innerHTML = html;

    /* END LOOP: for each tag */
    }
    
  }


  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active');
  /* START LOOP: for each active tag link */
  for( let activeTag of activeTags) {
  /* remove class active */
    activeTag.classlist.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const links = document.querySelectorAll('.post-tags a, .tags a');

  /* find all links to tags */
  const tag_links =  document.querySelectorAll('a.active[href^="#tag-"]', 'a[href="' + links + '"]');
  /* START LOOP: for each link */
  for( let link of tag_links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
/*********************************************************************************/
function generateAuthors(){

  /* find all articles */
  const articles =  document.querySelectorAll(optArticleSelector);
  //console.log(authors);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author wrapper */
    const authorList = document.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor  + '</a></li>' + ' ';
    
    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert link into authorList */
    authorList.innerHTML = html;
  }
  
  /* END LOOP: for every article: */
}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = author.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for( let activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classlist.remove('active');

  /* END LOOP: for each active tag link */
  }

}

authorClickHandler();

function addClickListenersToAuthors(){
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* find all links to authors */
  const author_links =  document.querySelectorAll('a.active[href^="#author-"]', 'a[href="' + href + '"]');
  /* START LOOP: for each link */
  for( let author of author_links){

    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();