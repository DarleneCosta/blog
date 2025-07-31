import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  //mutations
  create(post: PostModel): Promise<PostModel>;
  deleteById(id: string): Promise<PostModel>;
  updateById(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt'>,
  ): Promise<PostModel>;
}
