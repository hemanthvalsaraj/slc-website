# Images Directory

This directory contains static images for the website.

In Next.js, files in the `public` folder are served from the root URL path. For example:
- `/images/logo.png` can be referenced as `/images/logo.png` in your components
- Use the `Image` component from `next/image` for optimized images

## Usage Example

```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.png" 
  alt="Logo" 
  width={200} 
  height={200} 
/>
```
