# tire-shop-site
Tire shop website repository

Here are simple ways to host it.

**Option 1: Netlify Drop**
1. Open [Netlify Drop](https://app.netlify.com/drop).
2. Unzip `tire-shop-site.zip`.
3. Drag the unzipped folder into the Netlify Drop page.
4. Netlify will upload it and give you a live website URL.
5. To use your own domain, create/sign in to Netlify, open the site settings, and add a custom domain.

**Option 2: GitHub Pages**
1. Create a GitHub account if you do not have one.
2. Create a new repository, for example `tire-shop-site`.
3. Upload these files from the zip:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
4. Go to repository `Settings`.
5. Open `Pages`.
6. Under “Build and deployment,” choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Click `Save`.
8. GitHub will give you a website link after a minute or two.

**Option 3: Vercel**
1. Go to [Vercel](https://vercel.com).
2. Create an account or sign in.
3. Click `Add New Project`.
4. Import a GitHub repo containing the site files.
5. Keep the default settings.
6. Click `Deploy`.

**Fastest Path**
Use Netlify Drop. Since this is a static HTML/CSS/JS site, you only need to unzip the file and drag the folder into Netlify.
