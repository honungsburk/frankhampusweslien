# Frank Hampus Weslien's personal website (under construction)

This website gathers all projects by Frank Hampus Weslien into one place.

## Development

You have to run three commands to get the a local instance up and running.
This project uses firebase. You can run local emulators by running `firebase emulators:start`.
Then you probably want to seed the database, you can run `npm run seed` to do that.
Finally you run the dev server by writing `npm run dev` and you are done!

## Logging

We use the Roarr library. It is a structural logger so to view the information in your console you need
the CLI tool `npm install @roarr/cli -g`

```bash
npm run seed -- --wipe --franks-fine-forms ./devSeedData --motion ./devSeedData --stained-glass ./devSeedData --algomarble ./devSeedData | roarr pretty-print
```

## TODO:

### V1

- [ ] Add rules to firestore
- [ x ] Add quering and filtering
- [ x ] Add price info to images
- [ x ] Add dev images to git lfs
- [ x ] Markdown link don't work
- [ ] Limit image max height
- [ ] Loading image should have appropriate size
- [ x ] Add price Info
- [ x ] Support video
- [ x ] Proper About pages
- [ x ] assetID
- [ x ] link to cardano scan
- [ x ] created time
- [ ] Firebase local search
- [ x ] Add filter
- [ x ] Add load images on scroll
- [ x ] Add tags
- [ x ] home page
- [ x ] Top bar
- [ x ] hero page
- [ x ] custom loading page
- [ x ] Custom 404 page
- [ x ] Custom Error page
- [ x ] Work page
- [ ] FAQ page
- [ x ] wallet integration
- [ ] Art page
- [ x ] Individual artwork pages
- [ ] Script to upload all data
- [ ] shallow art data + deep art data
- [ ] Configure verbose level on script

### V2

- [ ] Project Pages???
- [ ] Buy new collection
- [ ] Reward page
- [ ] Community names
- [ ] Add a twitter bot!
- [ ] Add a dsicord bot!
