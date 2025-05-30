import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-access.component.html',
  styleUrl: './camera-access.component.scss',
})
export class CameraAccessComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;

  ngAfterViewInit(): void {
    // Request access to camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  capture(): void {
    const videoEl = this.video.nativeElement;
    const canvasEl = this.canvas.nativeElement;

    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;

    const context = canvasEl.getContext('2d');
    if (context) {
      context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      this.capturedImage = canvasEl.toDataURL('image/png');
    }
  }
}
