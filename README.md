# angular2-frameslider
Angular 2 version of the Frameslider component.

### Considering Contributing?

Read our contributing guidelines and become a contributing member of Angular UI Tree!

[CONTRIBUTING](https://github.com/WilldelaVega777/angular-frameslider/blob/master/CONTRIBUTING.md)


## Features

- Takes its data source from a standard object array.

## Supported browsers
- Chrome (stable)
- Safari
- Firefox
- IE 9 and 10


## Demo
Watch the Tree component in action on the [demo page](http://angular-ui-tree.github.io/angular-ui-tree/).

## Requirements

- Angularjs

## Usage

### Download

- [Download](https://github.com/WilldelaVega777/angular2-frameslider/archive/master.zip) from github.


### Code

In your constructor method add your datasource as an object array as follows...

```js
    constructor() 
    {
        this.ds = [
            {
                id        : "001",
                photo     : "images/re1.jpg",
                text      : "RE 1"
            },
            {
                id        : "002",
                photo     : "images/re2.jpg",
                text      : "RE 2"
            },
            {
                id        : "003",
                photo     : "images/re3.jpg",
                text      : "RE 3"
            },
            {
                id        : "004",
                photo     : "images/re4.jpg",
                text      : "RE 4"
            },
            {
                id        : "005",
                photo     : "images/re5.jpg",
                text      : "RE5"
            },
            {
                id        : "006",
                photo     : "images/re6.jpg",
                text      : "RE 6"
            },
            {
                id        : "007",
                photo     : "images/re7.jpg",
                text      : "RE 7"
            }
        ];
    }
```

Injecting `ui.tree`, `ui-tree-nodes`, `ui-tree-node`, `ui-tree-handle` to your html.

#### HTML 
```html
        <frameslider #fs
                    (frame-clicked)                 = "registerFrameClick($event)"
                    [data-source]                   = "ds"
                    [rounded-corners]               = "true"
                    width                           = "600"
                    opacity                         = "0.8"
                    image-width                     = "100"
                    image-height                    = "60"
                    unselected-background-color     = "#222"
                    selected-background-color       = "#500204"
                    unselected-label-color          = "#aaa"
                    selected-label-color            = "white"
                    unselected-frame-border-color   = "#ae8913"
                    selected-frame-border-color     = "#f1c40f"
                    frame-border                    = "1"
                    rounded-button                  = "true"
                    selector-color                  = "white"
        >
        </frameslider>
```
**Developing Notes:**