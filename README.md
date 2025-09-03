# DutchExam.online — Landing Page

## ℹ️ About
**DutchExam.online** is an online platform to help people prepare for the Dutch inburgering exam 🇳🇱.  
This repository currently hosts the **MVP landing page**, built with HTML/CSS/JavaScript and deployed on Netlify.  

The landing page includes a **modern responsive design** and an **AJAX-powered subscription form** that stores leads via **Netlify Forms** (without reloading the page).

## 🚀 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** Netlify
- **Domain:** dutchexam.online
- **Forms:** Netlify Forms (AJAX submission + modal confirmation)

## ✨ Features
- Modern responsive UI with animated background
- Hero section with call-to-action
- Email capture form (AJAX, no reload)
- Netlify Forms integration (anti-spam honeypot included)
- Success modal with confirmation message
- Accessible and mobile-first design

## 📦 Deployment
1. Repository is linked with Netlify.
2. Every push to the `main` branch triggers an automatic deploy.
3. Custom domains configured:
   - `dutchexam.online`
   - `inburg.nl` (alias/redirect)

## 📧 Email Capture
The subscription form is connected to **Netlify Forms**.  
Leads can be viewed in the Netlify dashboard or exported as CSV.  

> Later, integration with **Mailchimp / ConvertKit** can be added for automated newsletters and campaigns.

## 🔜 Next Steps
- Add backend (.NET API) for exercises and subscriptions.
- Connect frontend app (React/Next.js) for interactive training.
- Enhance analytics with Google Analytics & event tracking.
- Upgrade email capture → Mailchimp or another ESP for newsletters.

---

© 2025 DutchExam.online
