import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {GlobalPositionStrategy, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
  selector: '[appDraggableHelper]'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

  public overlayRef: OverlayRef;
  private positionStrategy: GlobalPositionStrategy = new GlobalPositionStrategy();
  private startPosition: { x: number; y: number };

  constructor(
    private draggable: DraggableDirective,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlayService: Overlay,
  ) {
  }

  public ngOnInit() {
    this.draggable.dragStart.subscribe((event: PointerEvent) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event: PointerEvent) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());

    // Create an overlay ...
    this.overlayRef = this.overlayService.create({
      positionStrategy: this.positionStrategy
    });
  }

  public ngOnDestroy() {
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent) {
    // Determine relative start position
    const clientRect = this.draggable.elementRef.nativeElement.getBoundingClientRect();

    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };
  }

  private onDragMove(event: PointerEvent) {
    if (!this.overlayRef.hasAttached()) {
      // Render the helper in the overlay
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    // Position the helper...
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd() {
    // Remove the helper
    this.overlayRef.detach();
  }

}
