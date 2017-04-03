//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';
import { Input }             from '@angular/core';
import { Output }            from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ViewChild }         from '@angular/core';
import { ElementRef }        from '@angular/core';


//--------------------------------------------------------------------------------------------------
// Public Constants Section:
//--------------------------------------------------------------------------------------------------
// Render Button Constants:
export const FONT_SIZE_FACTOR           = .2334;
export const INTERLINE_FACTOR           = 1.43;
export const VERTICAL_PADDING_FACTOR    = .17;
export const HORIZONTAL_PADDING_FACTOR  = .1;
export const MAX_SPEED                  = 3;
export const DECELERATION_FACTOR        = 0.945;



// Render FrameSlider Constants:


// Animate FrameSlider Constants:
export const STOPPED                    = 0;
export const IN_MOTION                  = 1;

//--------------------------------------------------------------------------------------------------
// Public Enums Section:
//--------------------------------------------------------------------------------------------------
export const enum AnimationDirection {
    RTL     = 1,
    NEUTRAL = 2,
    LTR     = 3
}

//--------------------------------------------------------------------------------------------------
export const enum AnimationType {
    RENDER_FRAMES     = 1,
    CYCLED_ANIMATION  = 2
}

//--------------------------------------------------------------------------------------------------
// Component Delcaration Section:
//--------------------------------------------------------------------------------------------------
@Component({
              selector: 'frameslider',
              templateUrl: './frameslider.component.html',
              styleUrls: ['./frameslider.component.css']
})
//--------------------------------------------------------------------------------------------------
// Class Delcaration Section:
//--------------------------------------------------------------------------------------------------
export class FramesliderComponent implements OnInit {

    //----------------------------------------------------------------------------------------------
    // ViewChild Elements Section:
    //----------------------------------------------------------------------------------------------
    @ViewChild('frameslider')          frameslider          : ElementRef;
    @ViewChild('framesliderContainer') framesliderContainer : ElementRef;
    @ViewChild('containerA')           containerA           : ElementRef;
    @ViewChild('containerB')           containerB           : ElementRef;


    //----------------------------------------------------------------------------------------------
    // Input Properties Section:
    //---------------------------------------------------------------------------------------------
    @Input("width") width                                              : number;
    @Input("data-source") dataSource                                   : Array<any>;
    @Input("rounded-corners") rounded                                  : boolean;
    @Input("background-color") backgroundColor                         : string;
    @Input("unselected-background-color") unselectedBackgroundColor    : string;
    @Input("selected-background-color") selectedBackgroundColor        : string;
    @Input("label-color") labelColor                                   : string;
    @Input("unselected-label-color") unselectedLabelColor              : string;
    @Input("selected-label-color") selectedLabelColor                  : string;
    @Input("frame-border") frameBorder                                 : number;
    @Input("frame-border-color") frameBorderColor                      : string;
    @Input("unselected-frame-border-color") unselectedFrameBorderColor : string;
    @Input("selected-frame-border-color") selectedFrameBorderColor     : string;
    @Input("rounded-button") roundedButton                             : boolean;
    @Input("selector-color") selectorColor                             : string;
    @Input("image-width") imageWidth                                   : number;
    @Input("image-height") imageHeight                                 : number;
    @Input("opacity") opacity                                          : number;


    //----------------------------------------------------------------------------------------------
    // Output Events Section:
    //---------------------------------------------------------------------------------------------- 
    @Output("frame-clicked") frameClicked = new EventEmitter<string>();


    //----------------------------------------------------------------------------------------------
    // Public Properties Section:
    //----------------------------------------------------------------------------------------------
    public buttonWidth                                                 : number;
    public buttonHeight                                                : number;
    public selectedButtonId                                            : string;
    public readingMouse                                                : boolean = false;
    public scrollOffset                                                : number  = 2;
    public animationDirection                                          : number;
    public animationType                                               : number;
    public initializing                                                : boolean = true;
    public _x                                                          : number = 20;
    public _y                                                          : number;

 
    public containerAtLeft                                             : ElementRef;
    public containerAtRight                                            : ElementRef;
    public posLTRContainerAtLeft                                       : number;
    public posLTRContainerAtRight                                      : number;
    public posRTLContainerAtLeft                                       : number;
    public posRTLContainerAtRight                                      : number;


    // Debug:
    public debugMessage                                                : string;


    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------       
    constructor() {}

    //----------------------------------------------------------------------------------------------
    // OnInit Interface Implementation Section:
    //---------------------------------------------------------------------------------------------- 
    ngOnInit()
    {
        if (this.rounded === true)
        {
            this.frameslider.nativeElement.style.borderRadius          = '.5em .5em';
            this.framesliderContainer.nativeElement.style.borderRadius = '.5em .5em';
        }
    }

    //----------------------------------------------------------------------------------------------
    // Component Lyfecycle Event Handler Methods Section:
    //----------------------------------------------------------------------------------------------
    ngAfterViewInit()
    {
        this.initializeComponent();
    }


    //----------------------------------------------------------------------------------------------
    // Event Handler Methods Section: (Mouse Related)
    //----------------------------------------------------------------------------------------------
    public fs_mouseover() : void
    {
        this.readingMouse = true;
    }

    //----------------------------------------------------------------------------------------------
    public fs_mousemove(event) : void
    {
        if (this.readingMouse)
        {
            let leftMargin: number = this.frameslider.nativeElement.offsetLeft;
            if (typeof(this.frameslider.nativeElement.offsetParent) != "undefined")
            {
                leftMargin += this.frameslider.nativeElement.offsetParent.offsetLeft;
            }

            let percentage = Math.round((event.clientX - leftMargin) * 100 / this.getFSWidth());
            let CoordinateX = ((percentage * 2) - 100);
            
            this._x = CoordinateX;
            
            // Debug:
            // this.debugSingleOutput("Posición X: " + leftMargin.toString());
        }
    }

    //----------------------------------------------------------------------------------------------
    public fs_mouseout() : void
    {
        this.readingMouse = false;
        this.initializing = false;
    }

    //----------------------------------------------------------------------------------------------
    public frameButton_click(id: string) : void
    {
        this.selectedButtonId = id;
        this.frameClicked.emit(id);
    }


    //----------------------------------------------------------------------------------------------
    // Public Methods Section: (Layout Related) 
    //----------------------------------------------------------------------------------------------
    public getFSWidth() : number
    {
        return parseInt(this.width.toString());
    }

    //----------------------------------------------------------------------------------------------
    public getButtonHeight() : number
    {
        let fsHeight = ( (this.getButtonVerticalPadding() * 2) + 
                         parseInt(this.imageHeight.toString()) + 
                         (parseInt(this.frameBorder.toString()) * 2) + 
                         (this.getFSBLabelFontSize() * INTERLINE_FACTOR)
                       );
        return fsHeight;
    }
    
    //----------------------------------------------------------------------------------------------
    public getButtonWidth() : number
    {
        let fsWidth = ( (this.getButtonHorizontalPadding() * 2) + 
                         parseInt(this.imageWidth.toString()) + 
                         (parseInt(this.frameBorder.toString()) * 2)
                       );
        return fsWidth;
    }

    //----------------------------------------------------------------------------------------------
    public getContainerWidth() : number
    {
        return (this.getButtonWidth() * this.dataSource.length);
    }

    //----------------------------------------------------------------------------------------------
    public getFSBLabelFontSize() : number
    {
        return Math.round(this.imageHeight * FONT_SIZE_FACTOR);
    }

    //----------------------------------------------------------------------------------------------
    public getButtonHorizontalPadding() : number
    {
        return (this.imageWidth * HORIZONTAL_PADDING_FACTOR);
    }

    //----------------------------------------------------------------------------------------------
    public getButtonVerticalPadding() : number
    {
        return (this.imageHeight * VERTICAL_PADDING_FACTOR);
    }

    //----------------------------------------------------------------------------------------------
    public getRoundedButton() : number
    {
        let retVal : number = 0;
        if (this.roundedButton)
        {
            retVal = 8;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public getPosX(index: number) : number
    {
        return (this.getButtonWidth() * index);
    }

    //----------------------------------------------------------------------------------------------
    public getPosY($index: number) : number
    {
        return 0;
    }


    //----------------------------------------------------------------------------------------------
    // Private Methods Section:
    //----------------------------------------------------------------------------------------------
    private initializeComponent() : void
    {
        this.setContainerPosition(this.containerA, 0);
        this.setContainerPosition(this.containerB, this.getContainerWidth() * -1)

        this.containerAtLeft  = this.containerB;
        this.containerAtRight = this.containerA;
        this.animationType    = AnimationType.CYCLED_ANIMATION

        this.redraw();
    } 

    //----------------------------------------------------------------------------------------------
    // Animation Related Methods Section:
    //----------------------------------------------------------------------------------------------
    private redraw() : void
	{
        this.doAnimation();
        requestAnimationFrame(() => this.redraw());
	}

    //----------------------------------------------------------------------------------------------
    private doAnimation() : void
    {
        if ((this.readingMouse) || (this.initializing == true))
        {
            // Determines Motion
            this.calculateScroll(IN_MOTION);
        }
        else
        {
            // Daccelerates the Motion until stop
            this.calculateScroll(STOPPED);
        }
        
        this.animateFS();
    }

    //----------------------------------------------------------------------------------------------
    private calculateScroll(pInMotion: number) : void
    {
        if (pInMotion === IN_MOTION)
        {
            this.scrollOffset = (Math.round((-1 * (this._x * MAX_SPEED)) / 50));
        }
        else
        {
            this.scrollOffset = ((this.scrollOffset * DECELERATION_FACTOR));
        }
        
        if (this.scrollOffset === 0)
        {
            if (this.animationDirection === AnimationDirection.LTR)
            {
                this.scrollOffset = 1;
            }
            
            if (this.animationDirection === AnimationDirection.RTL)
            {
                this.scrollOffset = -1;
            }
        }

        if (this.scrollOffset > 0)
        {
            this.animationDirection = AnimationDirection.LTR;
        }
        else if (this.scrollOffset === 0)
        {
            this.animationDirection = AnimationDirection.NEUTRAL;
        }
        else if (this.scrollOffset < 0)
        {
            this.animationDirection = AnimationDirection.RTL;
        }
    }

    //----------------------------------------------------------------------------------------------
    private animateFS(): void
    {
        //----------------------------------------------------------
        // Diagnostics:
        //----------------------------------------------------------
        //this.runCordinateDiagnostics();

        //----------------------------------------------------------
        // Determine Next Positions
        //----------------------------------------------------------
        let nextLTRPositionForLeftContainerWillBe : number =
            (this.posLTRContainerAtLeft + this.scrollOffset);
            
        let nextRTLPositionForLeftContainerWillBe : number =
            (this.posRTLContainerAtLeft + this.scrollOffset);
            
        let nextLTRPositionForRightContainerWillBe : number = 
            (this.posLTRContainerAtRight + this.scrollOffset);

        let nextRTLPositionForRightContainerWillBe : number =
            (this.posRTLContainerAtRight + this.scrollOffset);

        //----------------------------------------------------------
        // Apply Animation Logic
        //----------------------------------------------------------
        if (this.animationType === AnimationType.CYCLED_ANIMATION)
        {
            //-----------------------------------------------------------------------
            // LTR: SwithContainers if Next Position -> Current Container is near
            //      its limit (at the left)
            //-----------------------------------------------------------------------
            let halfButtonWidth : number = (this.getButtonWidth() / 2);
            if (
                (this.animationDirection === AnimationDirection.LTR) &&
                (nextLTRPositionForLeftContainerWillBe > (halfButtonWidth * -1))
            )
            {
                this.switchContainers();
            }

            //-----------------------------------------------------------------------
            // RTL: SwitchContainers if Next Position -> Current Container is near
            //      its limit (at the right)
            //-----------------------------------------------------------------------
            if ((this.animationDirection === AnimationDirection.RTL) &&
                (nextRTLPositionForRightContainerWillBe < (this.getFSWidth() + halfButtonWidth))
            )
            {
                this.switchContainers();
            }
        }

        //----------------------------------------------------------
        // Apply ScrollOffset (Container At Left)
        //----------------------------------------------------------
        this.setContainerPosition(this.containerAtLeft, (this.getContainerPosition(this.containerAtLeft) + this.scrollOffset));

        //----------------------------------------------------------
        // Apply ScrollOffset (Container At Right)
        //----------------------------------------------------------
        this.setContainerPosition(this.containerAtRight, (this.getContainerPosition(this.containerAtRight) + this.scrollOffset));
        
        //----------------------------------------------------------
        // Run Recalculation of Cordinates...
        //----------------------------------------------------------
        this.recalculateValues();
    }
    
    //----------------------------------------------------------------------------------------------
    private recalculateValues() : void
    {
        this.posLTRContainerAtRight    = this.getContainerPosition(this.containerAtRight);

        this.posLTRContainerAtLeft     = this.getContainerPosition(this.containerAtLeft);

        this.posRTLContainerAtRight    = this.getContainerPosition(this.containerAtRight) +
            this.getContainerWidth();

        this.posRTLContainerAtLeft     = this.getContainerPosition(this.containerAtLeft)  +
            this.getContainerWidth();
    }

    //----------------------------------------------------------------------------------------------
    private switchContainers() : void
    {
        // Move Containers
        if (this.animationDirection === AnimationDirection.LTR)
        {
            this.setContainerPosition
                (
                    this.containerAtRight,
                    (this.posLTRContainerAtLeft - this.getContainerWidth())
                );
        }

        if (this.animationDirection === AnimationDirection.RTL)
        {
            this.setContainerPosition(
                    this.containerAtLeft,
                    (this.posRTLContainerAtRight)
            );
        }

        // Invert Names: ESTO VA A DAR PROBLEMAS PORQUE CREO QUE NO SE PUEDE 
        // ASIGNAR UN OJBETO A OTRO UNA VEZ HECHA LA PRIMERA ASIGNACION.
        if (this.containerAtRight.nativeElement.id === this.containerA.nativeElement.id)
        {
            this.containerAtRight   = this.containerB;
            this.containerAtLeft    = this.containerA;
        }
        else
        {   
            this.containerAtRight   = this.containerA;
            this.containerAtLeft    = this.containerB;
        }
    }


    //----------------------------------------------------------------------------------------------
    // Utility Methods Section
    //----------------------------------------------------------------------------------------------
    private getContainerId(container: ElementRef) : string
    {
        let retVal : string = "";

        if (container && container.nativeElement)
        {
            retVal = (container.nativeElement.id) 
        }

        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    private getContainerPosition(container: ElementRef) : number
    {
        let retVal : number = 0;

        if (container && container.nativeElement)
        {
            retVal = (container.nativeElement.offsetLeft) 
        }

        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    private setContainerPosition(container: ElementRef, position: number) : void
    {
        if (container && container.nativeElement)
        {
            container.nativeElement.style.left = (position + 'px');
        }
    }


    //----------------------------------------------------------------------------------------------
    // DEBUG METHODS SECTION:
    //----------------------------------------------------------------------------------------------
    private runCordinateDiagnostics()
    {
        if (this.getContainerId(this.containerAtLeft) === 'containerA')
        {
            this.debugOutput('containerA('+ 'Left' +'): ' + this.getContainerPosition(this.containerAtLeft));
        }

        if (this.getContainerId(this.containerAtLeft) === 'containerB')
        {
            this.debugOutput('containerB('+ 'Left' +'): ' + this.getContainerPosition(this.containerAtLeft));
        }

        if (this.getContainerId(this.containerAtRight) === 'containerA')
        {
            this.debugOutput('containerA('+ 'Right' +'): ' + this.getContainerPosition(this.containerAtRight));
        }

        if (this.getContainerId(this.containerAtRight) === 'containerB')
        {
            this.debugOutput('containerB('+ 'Right' +'): ' + this.getContainerPosition(this.containerAtRight));
        }
    }

    //----------------------------------------------------------------------------------------------
    private debugOutput(sMessage: string): void
    {
        console.log(sMessage);
    }

    //----------------------------------------------------------------------------------------------
    private debugSingleOutput(sMessage: string): void
    {
        this.debugMessage = sMessage;
    }
}
