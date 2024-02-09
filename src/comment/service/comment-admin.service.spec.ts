import { Test, TestingModule } from '@nestjs/testing';
import { CommentAdminService } from './comment-admin.service';

describe('CommentAdminService', () => {
  let service: CommentAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentAdminService],
    }).compile();

    service = module.get<CommentAdminService>(CommentAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
