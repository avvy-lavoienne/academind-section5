
import PostForm from '@/components/post-form';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';


export default function NewPostPage() {
  

  async function createPost(prevState, formData) {
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if ( !title || title.trim() === 0 ) {
      errors.push("Title is Required")
    }

    if ( !content || content.trim() === 0 ) {
      errors.push("Content is Required")
    }

    if (!image || image.size === 0) {
      errors.push("Image is Required")
    }

    if (errors.length > 0) {
      return { errors };
    }

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect('/feed');
  }

  return <PostForm action={createPost} />
}
