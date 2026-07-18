import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'cloudinaryImage',
})
export class CloudinaryImagePipe implements PipeTransform {
  transform(publicId: string, width: number = 800): string {
    if(!publicId) return '';

    const transformations = `f_auto,q_auto,w_${width}`;
    return `https://res.cloudinary.com/${environment.cloudinaryCloudName}/image/upload/${transformations}/${publicId}`;;
  }
}
