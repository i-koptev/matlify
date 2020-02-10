---
templateKey: blog-post
title: Drink Coffee Slug
postTitle:
  en: EN Post Title
  ru: RU Заголовок статьи
postDescription:
  en: EN Post Description
  ru: RU Описание статьи
date: 2020-02-10T13:27:42.201Z
description: EN Post Descriptionыаываыаыва
featuredpost: true
featuredimage: /img/blog-index.jpg
postBody:
  en: >-
    ### Third level heading


    As mr started arrival subject by believe. How one dull get busy dare far.
    Mrs assured add private married removed believe did she. 


    Small for ask shade water manor think men begin. Sportsman do offending
    supported extremity breakfast by listening. Bed uncommonly his discovered
    for estimating far. Sentiments two occasional a


    #### Список:


    * item one

    * item two

    * item three


    ```javascript

    const postLinks = posts.map(post => (
                <li key={post.node.fields.slug}>
                    <Link to={post.node.fields.slug}>
                        <h2>{post.node.frontmatter.title}</h2>
                    </Link>
                </li>
            ))
    ```


    ![Coffee...](/img/blog-index.jpg)
  ru: >-
    ### Заголовок третьего уровня


    Новый абзац. По своей сути рыбатекст является альтернативой традиционному
    lorem ipsum, который вызывает у некторых людей недоумение при попытках
    прочитать рыбу текст. 


    Новый абзац. В отличии от lorem ipsum, текст рыба на русском языке наполнит
    любой макет непонятным смыслом и придаст неповторимый колорит советских
    времен.


    #### Список:


    * первый пункт

    * второй пункт

    * третий пункт


    ```javascript

    const postLinks = posts.map(post => (
                <li key={post.node.fields.slug}>
                    <Link to={post.node.fields.slug}>
                        <h2>{post.node.frontmatter.title}</h2>
                    </Link>
                </li>
            ))
    ```


    ![Кофеёк...](/img/blog-index.jpg)
tags:
  - coffee
  - кофеёк
---

