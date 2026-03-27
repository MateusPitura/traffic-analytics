<h1 align="center"> 
  <p>Traffic Analytics</p> 
<h1> 

<p> 
  <img src="https://img.shields.io/badge/Release-Mar%202026-green">  
  <img src="https://img.shields.io/github/stars/MateusPitura/traffic-analytics?style=social"> 
</p>  

## Description

A script that can be embedded in a website to collect traffic data. The data is then stored in a database and can be accessed through a dashboard

The script, hosted with jsDelivr, collects data when a page is visited, as well as when an element with a dataset attribute is clicked or a global function is called. A Cloudflare Worker collects the data, processes it, enriches it with additional information such as location, and sends it to Firebase. Then, a backend in TypeScript and a frontend in React, running locally, consume the data to display it in a dashboard

- [Features](#features)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Authors](#authors)

## Features 

📍 **Location:** enriches collected data with geographic information

📊 **Data Collection:** captures traffic data on page visits and page interactions

📈 **Dashboard:** displays the collected data through a local dashboard

<p align="center"> 
  <img src="link do gif ou vídeo" width="25%"> 
</p> 

## How to Run

**For devs:** 

1. Add the script to your website: 

```html
<script src="https://cdn.jsdelivr.net/gh/MateusPitura/traffic-analytics@latest/script/dist/analytics.js" async></script>
```

2. Run the dashboard with: `docker compose up`

3. Configure `backend/serviceAccountKey.json` to access Firebase

4. Add a secret in Cloudflare Worker with `npx wrangler secret put FIREBASE_PROJECT_ID`

## Technologies Used

<!--Link for badges: https://github.com/Ileriayo/markdown-badges -->

<p align="left">
	<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare"/>
    <img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34" alt="Firebase"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" alt="ReactQuery"/>
    <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" alt="ReactHookForm"/>
    <img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white" alt="RadixUI"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express"/>
</p> 

## Authors 

| Mateus Pitura | 
|------|
| <p align="center"><img src="https://avatars.githubusercontent.com/u/119008106" width="100" height="100"></p> |  
| <a href="https://www.linkedin.com/in/mateuspitura/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&goColor=white"> |