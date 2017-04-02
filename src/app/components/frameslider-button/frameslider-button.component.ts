//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild }    from '@angular/core';
import { ElementRef }   from '@angular/core';


//--------------------------------------------------------------------------------------------------
// Component Delcaration Section:
//--------------------------------------------------------------------------------------------------
@Component({
              selector    : 'frameslider-button',
              templateUrl : './frameslider-button.component.html',
              styleUrls   : ['./frameslider-button.component.css']
})
//--------------------------------------------------------------------------------------------------
// Class Delcaration Section:
//--------------------------------------------------------------------------------------------------
export class FramesliderButtonComponent implements OnInit 
{
    //----------------------------------------------------------------------------------------------
    // ViewChild Elements Section:
    //----------------------------------------------------------------------------------------------
    @ViewChild('buttonComponent')  elementView  : ElementRef;
    @ViewChild('labelElement')     labelElement : ElementRef;


    //----------------------------------------------------------------------------------------------
    // Input Properties Section:
    //----------------------------------------------------------------------------------------------
    // Position Attributes
    @Input("pos-x") posX                                               : number;
    @Input("pos-y") posY                                               : number;
    
    // Style Attributes
    @Input("label-color") labelColor                                   : string;
    @Input("label-unselected-color") labelUnselectedColor              : string;
    @Input("label-selected-color") labelSelectedColor                  : string;

    @Input("bg-color") bgColor                                         : string;
    @Input("unselected-bg-color") unselectedBgColor                    : string;
    @Input("selected-bg-color") selectedBgColor                        : string;

    @Input("image-border-color") imageBorderColor                      : string;
    @Input("unselected-image-border-color") unselectedImageBorderColor : string;
    @Input("selected-image-border-color") selectedImageBorderColor     : string;

    @Input("label-font-size") labelFontSize                            : number;

    @Input("h-padding") hPadding                                       : number;
    @Input("v-padding") vPadding                                       : number;
    
    @Input("rounded") rounded                                          : boolean;
    @Input("image-border-width") imageBorderWidth                      : number;

    @Input("selected-id") selectedId                                   : string;
    
    // Data
    @Input() id                                                        : string;
    @Input() photo                                                     : string;
    @Input() text                                                      : string;


    //----------------------------------------------------------------------------------------------
    // Output Events Section:
    //----------------------------------------------------------------------------------------------    
    @Output("frameClick")  frameClick  = new EventEmitter<string>();


    //----------------------------------------------------------------------------------------------
    // Public Properties Section:
    //----------------------------------------------------------------------------------------------
    public buttonHeight                   : number;
    public buttonWidth                    : number;


    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------    
    constructor() { }
    

    //----------------------------------------------------------------------------------------------
    // Initialize Component Section:
    //----------------------------------------------------------------------------------------------    
    public ngOnInit() : void 
    {
        this.bgColor          = this.unselectedBgColor;
        this.labelColor       = this.labelUnselectedColor;
        this.imageBorderColor = this.unselectedImageBorderColor;
    }


    //----------------------------------------------------------------------------------------------
    // Component Lyfecycle Event Handler Methods Section:
    //----------------------------------------------------------------------------------------------
    ngOnChanges(pChanges) : void
    {
        for (let propName in pChanges) 
        {
          if (propName === "selectedId")
          {
              let chng = pChanges[propName];

              if (chng.currentValue === this.id)
              {
                  this.bgColor = this.selectedBgColor;
                  this.labelColor = this.labelSelectedColor;
                  this.imageBorderColor = this.selectedImageBorderColor;
              }
              else
              {
                  this.bgColor = this.unselectedBgColor;
                  this.labelColor = this.labelUnselectedColor;
                  this.imageBorderColor = this.unselectedImageBorderColor;
              }            
          }
        }
    }


    //----------------------------------------------------------------------------------------------
    // Event Handler Methods Section:
    //----------------------------------------------------------------------------------------------
    public updateDimensions() : void 
    {
        this.buttonWidth      = this.elementView.nativeElement.offsetWidth;
        this.buttonHeight     = this.elementView.nativeElement.offsetHeight; 
    }

    //----------------------------------------------------------------------------------------------
    public fsb_click($pId : string)
    {
        // Fire Event
        this.frameClick.emit(this.id);
    }
}
