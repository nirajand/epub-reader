# epublio-reader


The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

At the minimum you will need to give ReactReader you will need this:

    An url that points to the epub-file
    location (in epub) and a locationChanged function to store the change in location
    Set a height for the container


```
import React, { useState } from 'react'
import { ReactReader } from 'react-reader'

export const App = () => {
  const [location, setLocation] = useState<string | number>(0)
  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  )
}
```

ReactReader props

    title [string] - the title of the book, displayed above the reading-canvas
    showToc [boolean] - whether to show the toc / toc-nav
    readerStyles [object] - override the default styles
    epubViewStyles [object] - override the default styles for inner EpubView
    swipeable [boolean, default false] - enable swiping left/right with react-swipeable. Warning this will disable interacting with epub.js iframe content like selection

ReactReader props passed to inner EpubView

    url [string, required] - url to the epub-file, if its on another domain, remember to add cors for the file. Epubjs fetch this by a http-call, so it need to be public available.
    loadingView [element] - if you want to customize the loadingView
    location [string, number, null] - set / update location of the epub
    locationChanged [func] - a function that receives the current location while user is reading. This function is called everytime the page changes, and also when it first renders.
    tocChanged [func] - when the reader has parsed the book you will receive an array of the chapters
    epubInitOptions [object] - pass custom properties to the epub init function, see epub.js
    epubOptions [object] - pass custom properties to the epub rendition, see epub.js's book.renderTo function
    getRendition [func] - when epubjs has rendered the epub-file you can get access to the epubjs-rendition object here
    isRTL [boolean] - support for RTL reading direction, thanks to @ktpm489

EpubView props
EpubView is just the iframe-view from EpubJS if you would like to build the reader yourself, see above for props.
