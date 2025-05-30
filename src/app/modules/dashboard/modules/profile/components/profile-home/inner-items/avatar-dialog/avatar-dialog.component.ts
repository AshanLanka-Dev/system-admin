import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {NgIf} from '@angular/common';
import {AvatarService} from '../../../../../../../../services/avatar-service/avatar.service';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
enum ImageType {
  BEGINNING,
  PROCESSING,
  SAVED
}

@Component({
  selector: 'app-avatar-dialog',
  imports: [
    ImageCropperComponent,
    NgIf,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './avatar-dialog.component.html',
  standalone: true,
  styleUrl: './avatar-dialog.component.scss'
})
export class AvatarDialogComponent implements OnChanges{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() userId!:string;
  @Output() isClosed = new EventEmitter()

  isImageError = signal(false)

  isImageExists = signal(false)

  originalImageBase64: string | null = null;
  imageChangedEvent: string | null = null;
  croppedImage: string | null = null;
  imageUrl: string | null = null;

  uploadType = signal(ImageType.BEGINNING);

  isLoading = signal(false)

  constructor(
    private _AvatarService:AvatarService
  ) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.userId) {
      this.isLoading.set(true)
      console.log('User Id',this.userId)
      await this.loadAvatar().then()
    }
    console.log(this.imageUrl)
  }

  loadAvatar():Promise<void>{
    return new Promise((resolve, reject)=>{
      try{
        this._AvatarService.getAvatar(this.userId).subscribe({
          next:async res => {
            console.log(res)
            this.isLoading.set(false)
            this.imageUrl = res.data.resourceUrl
            this.uploadType.set(ImageType.SAVED)
            this.isImageExists.set(true)
            resolve()
          },
          error:err=>{
            this.isLoading.set(false)
            console.log(err)
            reject()
          }
        })
      }catch (e){
        this.isLoading.set(false)
        console.log(e)
        reject()
      }
    })
  }

  openFilePicker() {
    this.fileInput.nativeElement.click(); // Trigger file input
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedExtensions = ['png', 'jpeg', 'jpg', 'svg', 'pjp'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert('Invalid file type! Please upload a PNG, JPEG, JPG, SVG, or PJP file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Store the original image for later re-cropping
        this.originalImageBase64 = e.target.result;
        this.imageChangedEvent = e.target.result;
        this.uploadType.set(ImageType.PROCESSING);
      };
      reader.readAsDataURL(file);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    // Store the cropped image
    this.croppedImage = event.base64 || '';
    console.log('Cropped image base64:', this.croppedImage.substring(0, 50) + '...');

    // If base64 is empty but blob is available, convert blob to base64
    if (!this.croppedImage && event.blob) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.croppedImage = e.target.result;
        console.log('Converted from blob:', this.croppedImage?.substring(0, 50) + '...');
      };
      reader.readAsDataURL(event.blob);
    }
  }

  saveCroppedImage() {
    if (this.croppedImage) {
      this.imageUrl = this.croppedImage;
      this.uploadType.set(ImageType.SAVED);
      console.log('Image saved successfully!');

      this.uploadAvatar();
    } else {
      console.error('No cropped image available to save');
    }
  }

  // New method to handle re-cropping
  editSavedImage() {
    if (this.isImageError()){
      this.uploadType.set(ImageType.BEGINNING)
    }else {
      if (this.originalImageBase64) {
        this.imageChangedEvent = this.originalImageBase64;
        this.uploadType.set(ImageType.PROCESSING);
      } else if (this.imageUrl) {
        if (this.imageUrl.startsWith('data:image')) {
          // Already base64
          this.imageChangedEvent = this.imageUrl;
          this.uploadType.set(ImageType.PROCESSING);
        } else {
          // It is a URL → fetch and convert to base64
          this.isLoading.set(true);
          fetch(this.imageUrl)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                this.imageChangedEvent = reader.result as string;
                this.uploadType.set(ImageType.PROCESSING);
                this.isLoading.set(false);
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              console.error('Failed to fetch image and convert to base64:', error);
              this.isLoading.set(false);
            });
        }
      }
    }
  }


  // Convert base64 to File object
  base64ToFile(base64String: string, filename: string): File {
    // Extract content type and base64 data
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  uploadAvatar():Promise<void>{
    this.isLoading.set(true)
    return new Promise(async (resolve, reject) => {
      try {
        if (this.isImageExists()){
          await this._AvatarService.updateAvatar(this.base64ToFile(this.croppedImage!, 'avatar.png'),this.userId).subscribe({
            next:res=>{
              console.log(res)
              this.uploadType.set(ImageType.SAVED)
              this.isClosed.emit(true)
              this.isLoading.set(false)
            },
            error:err=>{
              console.log(err)
              this.uploadType.set(ImageType.PROCESSING)
              this.isLoading.set(false)
            }
          })
        }else{
          await this._AvatarService.createAvatar(this.base64ToFile(this.croppedImage!, 'avatar.png'), this.userId).subscribe({
            next: res => {
              console.log(res)
              this.uploadType.set(ImageType.SAVED)
              this.isClosed.emit(true)
              this.isLoading.set(false)
              resolve()
            },
            error: err => {
              this.isLoading.set(false)
              console.log(err)
              this.uploadType.set(ImageType.PROCESSING)
              reject()
            }
          })
        }
      } catch (e) {
        this.isLoading.set(false)
        this.uploadType.set(ImageType.BEGINNING)
        console.log(e)
        reject()
      }
    })
  }

  onHide(){
    this.originalImageBase64 = null;
    this.imageChangedEvent = null
    this.croppedImage = null
    this.imageUrl = null
    this.isImageError.set(false)
    this.isImageExists.set(false)
    this.uploadType.set(ImageType.BEGINNING)
  }

  protected readonly ImageType = ImageType;

  imageError() {
    this.uploadType.set(ImageType.SAVED);

    // Load default image, convert to base64
    const defaultImageUrl = '/images/dashboard/my-cources/img_d.png';

    fetch(defaultImageUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string; // now it is base64
          this.isImageError.set(true)
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Failed to load default image:', error);
      });
  }

}
