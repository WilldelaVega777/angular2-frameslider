//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { Component } from '@angular/core';

//--------------------------------------------------------------------------------------------------
// Component Delcaration Section:
//--------------------------------------------------------------------------------------------------
@Component({
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: ['./app.component.css']
})
//--------------------------------------------------------------------------------------------------
// Class Delcaration Section:
//--------------------------------------------------------------------------------------------------
export class AppComponent 
{
    //----------------------------------------------------------------------------------------------
    // Public Properties Section:
    //----------------------------------------------------------------------------------------------
    public ds                                     : Array<any>;
    public frameClickedId                         : string;


    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------       
    constructor() 
    {
        this.ds = [
            {
                id        : "001",
                photo     : "/images/re1.jpg",
                text      : "RE 1"
            },
            {
                id        : "002",
                photo     : "/images/re2.jpg",
                text      : "RE 2"
            },
            {
                id        : "003",
                photo     : "/images/re3.jpg",
                text      : "RE 3"
            },
            {
                id        : "004",
                photo     : "/images/re4.jpg",
                text      : "RE 4"
            },
            {
                id        : "005",
                photo     : "/images/re5.jpg",
                text      : "RE5"
            },
            {
                id        : "006",
                photo     : "/images/re6.jpg",
                text      : "RE 6"
            },
            {
                id        : "007",
                photo     : "/images/re7.jpg",
                text      : "RE 7"
            }
        ];
    }


    //----------------------------------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------------------------------
    public registerFrameClick(event) : void
    {
        this.frameClickedId = event;
    }

}
