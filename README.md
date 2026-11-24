# Pocket Pals on Netlify

Deploy (pick one):
1. GitHub: push this folder to a repo -> Netlify "Add new site" -> "Import an existing project". Defaults are fine (netlify.toml sets everything).
2. CLI:  npm i -g netlify-cli && netlify login && netlify deploy --prod

Then open your site URL on each phone. Parent sets a PIN and adds kids; Settings shows a
family code. On other phones choose "My family is already set up on another phone" and enter it.

Without the function (e.g. a plain drag-and-drop of public/ only) the app still works,
but data stays on one phone.
