# North Carolina Tech Resource Finder

The North Carolina Tech Resource Finder is a web application built by [HR&A Advisors](https://www.hraadvisors.com/) for the [North Carolina Office of Digital Equity and Literacy](https://www.ncbroadband.gov/). This app has been integrated with NCDIT's [existing system of digital solutions](https://github.com/State-of-North-Carolina-DIT/digital-solutions), which uses Drupal.

## Technology Stack

The Resource Finder uses the following technologies:

- [Node.js](https://nodejs.org/en) for building and working on the app.
- [TypeScript](https://typescriptlang.org) for static types.
- [React](https://react.dev/) for front-end component development.
- [TailwindCSS](https://tailwindcss.com/) for styling components.
- [AWS s3](https://aws.amazon.com/) for data warehousing and server-side storage. Note that data is stored in NCDIT's s3 buckets, and is only available to the app through Cloudfront or through direct request to NCDIT.
- [Cyberduck](https://cyberduck.io/) for data updates through NCDIT's s3 Cloudfront distribution. Credentials are stored by HR&A employees and can be requested from the firm or from NCDIT directly.
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides) for client side map rendering.
- [Mapbox Studio](https://www.mapbox.com/mapbox-studio) for map tile rendering.
- [Prettier](https://prettier.io) for code formatting.
- [ESLint](https://eslint.org) for linting.
- [Vercel](https://vercel.com/) for app deployment and hosting at a demo URL.

## Development Workflow

This app requires [Node.js](https://nodejs.org/en), [Git](https://git-scm.com/), and [Yarn](https://yarnpkg.com/). Please install prior to starting development.

1. Ensure that mapboxgl.accessToken in the ResourceFinder.tsx file is set to a current, accurate, and live Mapbox Studio token. This can be configured on [Mapbox Studio](https://www.mapbox.com/mapbox-studio).
2. Once the above has been verified, run _npm install_
3. Run _npm run dev_

This project uses branches and Github's pull request feature for development collaboration. Contributions should follow the following structure:

1. Create a new local branch running _git checkout --b newBranch_
2. Write new code on the new branch and test locally
3. Add new code by running _git add files_, and commit code with a description by running _git commit -m 'Message Description'_
4. Push new code to the remote with _git push origin -u newBranch_
5. On Github, open a pull request with your updated code. Flag any necessary reviewers

## Demo Site Deployment Workflow

The demo site for this app is currently deployed through Vercel at https://nc-resource-finder.vercel.app/. Merging new code to the main branch will trigger a new build, which should take a few minutes to deploy to the live site.

## Drupal Integration

While development of new features follows the above workflow, the site is built as a bespoke integration to NCDIT's existing system of digital tools. This requires the site to be integrated to NCDIT's Drupal instance, which requires read and write permissions on NCDIT's Github. Contact NCDIT to acquire these for future development.

Once permissions have been acquired, the following steps can be taken to integrate a custom React component into NCDIT's Drupal instance:

1. In the project repo, run _npm run build_
2. In the resulting _dist_ folder, navigate to _assets/index.js_. This file, which will likely have some characters after the word _index_ in its file name, is your minimized Javascript for the Resource Finder app. Search in this file for "about-", to identify the line of code where the "About" image is referenced. Ensure that the full path of this image is _/modules/custom/nc_resourcefinder/dist/assets/_.
3. Copy the _dist_ folder.
4. In NCDIT's digital-solutions repo, open a new Git branch. Navigate to _/modules/custom/nc_resourcefinder_. If this folder does not already exist, create one.
5. Delete the _dist_ folder already present in this folder, and replace it with the new folder you copied from this repo.
6. For this minimized Javascript to be executed, there must be five files in the custom module _nc_resourcefinder_

- a Controller.php file
- an info.yml file
- a librarries.yml file
- a module.yml file
- a routing.yml file
  If these files do not exist, consult the custom module titled _nc_json_views_ for examples on how to integrate a custom Javascript component into a Drupal instance.

7. Contribute code on this branch using the same Git workflow as above, understanding that you are pushing to NCDIT's codebase and will receive reviews from NCDIT employees. 8. On Github, open up a pull request to NCDIT's _develop_ branch.
