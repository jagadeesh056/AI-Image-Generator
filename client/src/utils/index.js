import FileSaver from 'file-saver'
import surpriseMePrompts from '../constants';

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    if (randomPrompt === prompt){
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}

export async function downloadImage({ _id, photo }) {
  try {
    const response = await fetch(photo, {
      headers: {
        'Accept': 'image/jpeg, image/png, image/webp, image/*',
      },
      credentials: 'same-origin',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('image')) {
      console.error('The URL did not return valid image data:', contentType);
      throw new Error('Invalid image data');
    }
    
    const blob = await response.blob();
    
    if (blob.size === 0) {
      throw new Error('Image blob is empty');
    }
    
    const extension = contentType.includes('png') ? 'png' : 
                      contentType.includes('webp') ? 'webp' : 
                      contentType.includes('gif') ? 'gif' : 'jpg';
    
    FileSaver.saveAs(blob, `download-${_id}.${extension}`);
  } catch (error) {
    console.error("Error downloading image:", error);
    alert("Failed to download image. Please try again.");
  }
}
