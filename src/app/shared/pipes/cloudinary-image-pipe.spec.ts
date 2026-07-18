import { CloudinaryImagePipe } from './cloudinary-image-pipe';

describe('CloudinaryImagePipe', () => {
  it('create an instance', () => {
    const pipe = new CloudinaryImagePipe();
    expect(pipe).toBeTruthy();
  });
});
