import { Test, TestingModule } from '@nestjs/testing';
import { CommentAdminController } from './comment-admin.controller';

describe('CommentAdminController', () => {
  let controller: CommentAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentAdminController],
    }).compile();

    controller = module.get<CommentAdminController>(CommentAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
